const Order = require('../models/Order');

exports.placeOrderRender = async (req, res) => {
    const order = await Order.findOne({ user: req.user._id }).sort({ createdAt: -1 }).limit(1);
    res.render('placeOrder', { order });
  };
  

exports.placeOrder = async (req, res) => {
    const { items, total } = req.body;

    const newOrder = new Order({
        user: req.user._id,
        items: JSON.parse(items),
        total
    });

    await newOrder.save();
    res.redirect('/order');
};
