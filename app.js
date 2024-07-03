const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./model/user');
const ejs = require('ejs')

const app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect('mongodb://localhost:27017/userDB').then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); 



app.get('/register', (req, res) => {
  res.render('register');
});


app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).send('User already exists');
    }
    user = new User({
      username,
      email,
      password
    });
    await user.save();
    res.render('registered');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${3000}`);
});
