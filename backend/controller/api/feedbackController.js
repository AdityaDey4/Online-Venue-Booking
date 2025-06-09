const Feedback = require('../../model/Feedback');

const getAllFeedback = async (req, res)=> {

    const feedback = await Feedback.find();

    res.json(feedback);
}

const getFeedback = async (req, res) => {

    const email = req?.params?.email;
    if(!email) {
        res.status(400).json({ "message": 'Email is required' });
    }
    const feedback = await Feedback.find({email:email}).exec();
    res.json(feedback);
}

const postFeedback = async (req, res)=> {

    const name = req.body.name;
    const email = req.body.email;
    const feedback = req.body.feedback;
    const date = req.body.date;
    const time = req.body.time;

    if(!name || !email || ! feedback || !date || !time) {
        return res.status(400).json({"message" : "Email, name, feedback, date & time is required"});
    }

    try {
        const result = await Feedback.create({
            "name" : name,
            "email" : email,
            "feedback" : feedback,
            "date" : date,
            "time" : time
         })

         res.status(201).json({"message" : `Thank you for your feedback, ${name}`});
    }catch(err) {
        res.status(500).json(err.message);
    }

}

module.exports = {getAllFeedback, getFeedback, postFeedback}