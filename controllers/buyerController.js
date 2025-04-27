const Buyer = require('../models/Buyer');



exports.getBuyerNotificationPreferences = async (req, res) => {
    const { buyer_email } = req.params;

    try {
        const buyer = await Buyer.findOne({ where: { buyer_email } });

        if (!buyer) {
            return res.status(404).json({ message: 'Buyer not found' });
        }

        res.status(200).json({
            buyer_email: buyer.buyer_email,
            notification_preferences: buyer.notification_preferences
        });
    } catch (error) {
        console.error('Error fetching notification preferences:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}



exports.updateBuyerNotificationPreferences = async (req, res) => {

    const { buyer_email } = req.params;
    const { notification_preferences } = req.body;

    try {
        const updatedBuyer = await Buyer.update(
            { notification_preferences },
            { where: { buyer_email } }
        );

        if (updatedBuyer[0] === 0) {
            return res.status(404).json({ message: 'Buyer not found' });
        }

        res.status(200).json({ message: 'Notification preferences updated successfully' });
    } catch (error) {
        console.error('Error updating notification preferences:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}