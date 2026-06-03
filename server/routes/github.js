const express = require('express');
const router = express.Router();

// GET GitHub user stats
router.get('/stats', async (req, res) => {
  try {
    const username = process.env.GITHUB_USERNAME || 'duha';

    const [userData, reposData] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: { 'User-Agent': 'Portfolio-App' }
      }).then(r => r.json()),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
        headers: { 'User-Agent': 'Portfolio-App' }
      }).then(r => r.json())
    ]);

    const stats = {
      publicRepos: userData.public_repos || 0,
      followers: userData.followers || 0,
      following: userData.following || 0,
      avatarUrl: userData.avatar_url || '',
      bio: userData.bio || '',
      totalStars: Array.isArray(reposData)
        ? reposData.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)
        : 0,
      topLanguages: Array.isArray(reposData)
        ? [...new Set(reposData.filter(r => r.language).map(r => r.language))].slice(0, 6)
        : [],
      recentRepos: Array.isArray(reposData)
        ? reposData.slice(0, 5).map(r => ({
            name: r.name,
            description: r.description,
            language: r.language,
            stars: r.stargazers_count,
            url: r.html_url
          }))
        : []
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch GitHub stats' });
  }
});

module.exports = router;
