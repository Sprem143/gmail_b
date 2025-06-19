
const Sender = require('../models/Sender');
const nodemailer = require('nodemailer');

exports.sendEmails = async (req, res) => {
  const { senderEmail, subject, message, receivers } = req.body;

  const sender = await Sender.findOne({ email: senderEmail });
  if (!sender) return res.status(404).json({ error: 'Sender not found' });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: sender.email,
      pass: sender.appPassword,
    },
  });

  let sent = 0;
  let failed = 0;

  for (const to of receivers) {
    try {
      await transporter.sendMail({
        from: sender.email,
        to,
        subject,
        html: message,
      });
      sent++;
    } catch {
      failed++;
    }
  }

  res.json({ sent, failed });
};
