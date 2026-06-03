const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');
const authMiddleware = require('../middleware/auth');
const checkDbConnection = require('../middleware/dbHealth');

// ─── Parse User Agent ───
function parseUserAgent(ua) {
  const result = { browser: 'Unknown', os: 'Unknown', device: 'Unknown' };
  if (!ua) return result;

  // Browser detection
  if (ua.includes('Edg/')) result.browser = 'Edge';
  else if (ua.includes('OPR/') || ua.includes('Opera')) result.browser = 'Opera';
  else if (ua.includes('Chrome/') && !ua.includes('Chromium')) result.browser = 'Chrome';
  else if (ua.includes('Safari/') && !ua.includes('Chrome')) result.browser = 'Safari';
  else if (ua.includes('Firefox/')) result.browser = 'Firefox';
  else if (ua.includes('MSIE') || ua.includes('Trident/')) result.browser = 'IE';

  // OS detection
  if (ua.includes('Windows NT 10')) result.os = 'Windows 10/11';
  else if (ua.includes('Windows')) result.os = 'Windows';
  else if (ua.includes('Mac OS X')) result.os = 'macOS';
  else if (ua.includes('Android')) result.os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) result.os = 'iOS';
  else if (ua.includes('Linux')) result.os = 'Linux';

  // Device detection
  if (ua.includes('Mobile') || ua.includes('Android') && !ua.includes('Tablet')) result.device = 'Mobile';
  else if (ua.includes('iPad') || ua.includes('Tablet')) result.device = 'Tablet';
  else result.device = 'Desktop';

  return result;
}

// ─── POST: Track a visit (public) ───
router.post('/track', async (req, res) => {
  try {
    const ua = req.headers['user-agent'] || '';
    const { browser, os, device } = parseUserAgent(ua);

    // Get real IP (supports proxies)
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() 
      || req.headers['x-real-ip'] 
      || req.connection?.remoteAddress 
      || req.socket?.remoteAddress 
      || 'unknown';

    const visitor = new Visitor({
      ip: ip === '::1' || ip === '127.0.0.1' ? 'localhost' : ip,
      userAgent: ua.substring(0, 500), // limit length
      browser,
      os,
      device,
      page: req.body.page || '/',
      referrer: req.body.referrer || req.headers['referer'] || 'Direct',
      screenResolution: req.body.screenResolution || '',
      language: req.body.language || req.headers['accept-language']?.split(',')[0] || '',
    });

    await visitor.save();
    res.status(201).json({ message: 'Visit tracked', id: visitor._id });
  } catch (error) {
    console.error('Visitor tracking error:', error);
    // Don't fail silently - still return success to not break the frontend
    res.status(201).json({ message: 'noted' });
  }
});

// ─── PUT: Update session duration ───
router.put('/track/:id', async (req, res) => {
  try {
    const { sessionDuration } = req.body;
    if (sessionDuration && req.params.id) {
      await Visitor.findByIdAndUpdate(req.params.id, { sessionDuration });
    }
    res.json({ message: 'Updated' });
  } catch (error) {
    res.json({ message: 'ok' });
  }
});

// ─── GET: Analytics summary (admin only) ───
router.get('/analytics', authMiddleware, checkDbConnection, async (req, res) => {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Total counts
    const [totalVisits, todayVisits, weekVisits, monthVisits] = await Promise.all([
      Visitor.countDocuments(),
      Visitor.countDocuments({ visitedAt: { $gte: today } }),
      Visitor.countDocuments({ visitedAt: { $gte: thisWeek } }),
      Visitor.countDocuments({ visitedAt: { $gte: thisMonth } }),
    ]);

    // Unique visitors (by IP)
    const uniqueVisitors = await Visitor.distinct('ip');

    // Browser stats
    const browserStats = await Visitor.aggregate([
      { $group: { _id: '$browser', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 }
    ]);

    // Device stats
    const deviceStats = await Visitor.aggregate([
      { $group: { _id: '$device', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // OS stats
    const osStats = await Visitor.aggregate([
      { $group: { _id: '$os', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 }
    ]);

    // Page stats 
    const pageStats = await Visitor.aggregate([
      { $group: { _id: '$page', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Referrer stats
    const referrerStats = await Visitor.aggregate([
      { $group: { _id: '$referrer', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Visitors per day (last 30 days)
    const dailyVisits = await Visitor.aggregate([
      { $match: { visitedAt: { $gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$visitedAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Average session duration
    const avgSession = await Visitor.aggregate([
      { $match: { sessionDuration: { $gt: 0 } } },
      { $group: { _id: null, avg: { $avg: '$sessionDuration' } } }
    ]);

    res.json({
      totalVisits,
      todayVisits,
      weekVisits,
      monthVisits,
      uniqueVisitors: uniqueVisitors.length,
      browserStats,
      deviceStats,
      osStats,
      pageStats,
      referrerStats,
      dailyVisits,
      avgSessionDuration: avgSession[0]?.avg || 0
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ─── GET: Recent visitors (admin only) ───
router.get('/recent', authMiddleware, checkDbConnection, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const visitors = await Visitor.find()
      .sort({ visitedAt: -1 })
      .limit(limit)
      .select('-userAgent -__v');
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
