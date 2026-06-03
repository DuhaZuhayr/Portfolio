const nodemailer = require('nodemailer');

// Simple HTML entity escaper
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Create transporter once at module load
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify transporter on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email transporter error:', error.message);
    console.error('   Check EMAIL_USER and EMAIL_PASS in .env');
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

const sendContactEmail = async ({ name, email, subject, message }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Message: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #e0e0e0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #6C63FF, #00D4FF); padding: 24px; text-align: center;">
            <h1 style="margin: 0; color: white; font-size: 24px;">📬 New Portfolio Message</h1>
          </div>
          <div style="padding: 24px;">
            <p><strong style="color: #6C63FF;">From:</strong> ${escapeHtml(name)}</p>
            <p><strong style="color: #6C63FF;">Email:</strong> ${escapeHtml(email)}</p>
            <p><strong style="color: #6C63FF;">Subject:</strong> ${escapeHtml(subject)}</p>
            <hr style="border: 1px solid #333;" />
            <p><strong style="color: #6C63FF;">Message:</strong></p>
            <p style="background: #16213e; padding: 16px; border-radius: 8px; line-height: 1.6;">${escapeHtml(message)}</p>
          </div>
          <div style="background: #16213e; padding: 16px; text-align: center; font-size: 12px; color: #888;">
            Sent from Duha's Portfolio Contact Form
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    console.error('   Full error:', error);
    return false;
  }
};

module.exports = { sendContactEmail };
