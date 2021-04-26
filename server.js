import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import poiRoutes from './routes/pois.js';
// const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.static('public'));
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

mongoose.connect(
  'mongodb+srv://admin-luke:ForksUp11@cluster0.x9qqa.mongodb.net/boeingDB',
  { useNewUrlParser: true }
);

app.use('/', poiRoutes);

if (process.env.NODE_ENV === 'production') {
  // Set static (public) folder using express -> index.html in client/build
  app.use(express.static('client/build'));

  // Serve that index.html file within our public folder
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Port is dynamically accessible by Heroku as well as (or) locally on port 3000
app.listen(PORT, function () {
  console.log('Successfully started server on port 5000!');
});
