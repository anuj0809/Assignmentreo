const { config } = require('dotenv');
const Question = require('../db/db');
config();

const paperController = async (req, res) => {
    try {
        // Check if totalMarks, Easy, Medium, and Hard are present in the request body
        const { totalMarks, Easy, Medium, Hard } = req.body;
        if (totalMarks === undefined || Easy === undefined || Medium === undefined || Hard === undefined) {
            return res.status(400).json({
                status: false,
                message: "Bad Request: Please provide valid values for totalMarks, Easy, Medium, and Hard.",
            });
        }

        // Check if Easy, Medium, and Hard sum up to 100
        if (Easy + Medium + Hard !== 100) {
            return res.status(400).json({
                status: false,
                message: "Bad Request: The sum of Easy, Medium, and Hard should be 100.",
            });
        }

        // Check if Easy, Medium, and Hard are non-negative
        if (Easy < 0 || Medium < 0 || Hard < 0) {
            return res.status(400).json({
                status: false,
                message: "Bad Request: Easy, Medium, and Hard should be non-negative values.",
            });
        }

        // Round percentages to the nearest integer
        const roundedEasy = Math.round(Easy);
        const roundedMedium = Math.round(Medium);
        const roundedHard = Math.round(Hard);

        // Adjust total marks based on rounded percentages
        const adjustedTotalMarks = totalMarks * (roundedEasy + roundedMedium + roundedHard) / 100;

        const distribution = { easy: roundedEasy / 100, medium: roundedMedium / 100, hard: roundedHard / 100 };

        // Calculate the marks for each difficulty level
        const easyMarks = adjustedTotalMarks * distribution.easy;
        const mediumMarks = adjustedTotalMarks * distribution.medium;
        const hardMarks = adjustedTotalMarks * distribution.hard;

        // Fetch questions for each difficulty level
        let easyQuestions = await Question.find({ difficulty: 'Easy' }).select('-_id -__v');
        let mediumQuestions = await Question.find({ difficulty: 'Medium' }).select('-_id -__v');
        let hardQuestions = await Question.find({ difficulty: 'Hard' }).select('-_id -__v');

        // Shuffle the questions within each difficulty level
        shuffleArray(easyQuestions);
        shuffleArray(mediumQuestions);
        shuffleArray(hardQuestions);

        // Select questions for each difficulty level until the required marks are reached
        const selectedEasyQuestions = selectQuestions(easyQuestions, easyMarks);
        const selectedMediumQuestions = selectQuestions(mediumQuestions, mediumMarks);
        const selectedHardQuestions = selectQuestions(hardQuestions, hardMarks);

        // Combine all selected questions
        const questionPaper = [...selectedEasyQuestions, ...selectedMediumQuestions, ...selectedHardQuestions];

        return res.status(200).json({
            status: true,
            questionPaper
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};
//To Randomize the questions getting selected
   function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
//selecting the amount of questions needed.
function selectQuestions(questions, requiredMarks) {
    let selectedQuestions = [];
    let totalMarks = 0;

    for (let question of questions) {
        if (totalMarks + question.marks > requiredMarks) {
            break;
        }

        selectedQuestions.push(question);
        totalMarks += question.marks;
    }

    return selectedQuestions;
}


module.exports =  paperController ;

