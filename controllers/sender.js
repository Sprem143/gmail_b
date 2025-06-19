const Sender = require('../models/Sender');
const nodemailer = require('nodemailer');
const xlsx = require('xlsx');

exports.saveSender = async (req, res) => {
    const { email, appPassword } = req.body;
    try {
        const existingSender = await Sender.findOne({ email });

        if (existingSender) {
            return res.status(200).json({ status: false, msg: 'Sender already exists' });
        }

        const sender = new Sender({ email, appPassword });
        await sender.save();

        res.status(201).json({ status: true, msg: 'Sender saved successfully' });
    } catch (err) {
        console.error('Error saving sender:', err);
        res.status(500).json({ status: false, msg: 'Failed to save sender' });
    }
};

exports.getSenders = async (req, res) => {
    try {
        const senders = await Sender.find({}, 'email Date');
        res.json(senders);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch senders' });
    }
};

exports.deletesenderemail = async (req, res) => {
    try {
        const { id } = req.body;
        await Sender.findByIdAndDelete(id);
        const updatedSenders = await Sender.find({}, 'email Date');
        res.status(200).json({
            status: true,
            msg: 'Sender deleted successfully',
            emails: updatedSenders,
        });

    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch senders' });
    }
}

exports.editsenderemail = async (req, res) => {
    try {
        const {editid, email, appPassword } = req.body;
        await Sender.findOneAndUpdate(
            { _id: editid },
            {$set:{email:email, appPassword:appPassword}}
        )
        const updatedSenders = await Sender.find({}, 'email Date');
        console.log(updatedSenders)
        res.status(200).json({
            status: true,
            msg: 'Sender deleted successfully',
            emails: updatedSenders,
        });

    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch senders' });
    }
}


