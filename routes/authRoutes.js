const express = require("express");
const router = express.Router();
const {
    loginRender,
    registerRender,
    login,
    register,
    adminPage,
    menuPage,
    add_Dish
  } = require('../controllers/authController');  
const { protect, adminOnly } = require('../middleware/auth');

router.get("/login", loginRender);
router.get("/register", registerRender);
router.post("/register", register);
router.post("/login", login);
router.get('/admin', protect, adminOnly, adminPage);
router.get('/menu', protect, menuPage);   
router.post('/admin/add-dish',protect,add_Dish);  


module.exports = router;
