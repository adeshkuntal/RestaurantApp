const User = require('../models/User')
const Dish = require('../models/Dish');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.loginRender = (req,res) => res.render('login')
exports.registerRender = (req,res) => res.render('register')

exports.register = async (req,res) => {
    const {username , email , password , role } = req.body;
    const hash = await bcrypt.hash(password,10);
    const user = new User({username,email,password: hash,role});
    await user.save();
    res.redirect('/login');
}

exports.login = async (req,res) => {
   const {username , email , password} = req.body;
   const user = await User.findOne({username});
   if (!user) return res.send("Invalid credentials");

   const match = await bcrypt.compare(password,user.password);
   if (!match) return res.send("Invalid credentials");

   const token = jwt.sign({ id: user._id, role: user.role, username: user.username ,email: user.email}, process.env.JWT_SECRET);
   res.cookie('token',token)
   res.redirect(user.role==='user' ? '/menu' : '/admin')

}

exports.adminPage = async (req, res) => {
    const dishes = await Dish.find();
    res.render('admin', { username: req.user.username, dishes });
}

exports.add_Dish = async (req,res) => {
    const { name, price, description, image, available } = req.body;
    const AddDish = new Dish({name, price, description, image, available});
    await AddDish.save();
    res.send("Dish Added Successfully")
}

exports.menuPage = async (req, res) => {
    const dishes = await Dish.find();
    res.render('menu', { username: req.user.username, dishes });
};


