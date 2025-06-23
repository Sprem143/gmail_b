
const Sender = require('../models/Sender');
const nodemailer = require('nodemailer');

const delay = (ms)=> new Promise(resolve => setTimeout(resolve, ms));

exports.sendEmails = async (req, res) => {
  const { senderEmail, subject, newmessage, receivers } = req.body;

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
        html: newmessage,
      });
      sent++;
    } catch {
      failed++;
    }
    console.log('delay start')
    await delay(5000)
        console.log('delay end')

  }

  res.json({ sent, failed });
};
