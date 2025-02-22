const { generateContent } = require("../Services/ai.service");


module.exports.getReview = async (req, res) => {
        const code = req.body.code;
        if(!code)
        {
            return res.status(400).send('code is required');
        }
        const response = await generateContent(code);
        res.send(response);
    };
   