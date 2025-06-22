const express = require('express');
const router = express.Router();
const { placeOrder , placeOrderRender } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');


router.get('/order', protect, placeOrderRender);
router.post('/menu', protect, placeOrder);

module.exports = router;
