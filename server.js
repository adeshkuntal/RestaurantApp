const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoutes");
const cookieParser = require('cookie-parser');
const orderRoutes = require('./routes/orderRoutes');


dotenv.config();
connectDB();


const app = express();
app.set('view engine', "ejs")
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(authRoutes);
app.use(orderRoutes)
app.use(express.static('public'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

