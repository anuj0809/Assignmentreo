const mongoose = require('mongoose');
const { config } = require('dotenv');
const Question = require('../db/db');
const staticQuestions = require('../db/dummydata');
config();

const homeController = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/question_paper', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Insert the dummydata array into the database
    await Question.insertMany(staticQuestions);

    // Retrieve all data from the database
    const allData = await Question.find({});
    
    // Send the response with the retrieved data
    res.json({ allData });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = homeController;
