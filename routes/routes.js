const chatBot = require('../chatbot/chatbot.js');
const mongoose = require('mongoose');
const Result = mongoose.model('Result');//Importing the Result mongoose model that we created in Result.js
module.exports = app => {

    // app.get('/', (req, res) => {
    //     res.send({ 'hello': 'Budddy' });
    // });

    app.post('/api/df_text_query', async(req, res) => {
        let responses = await chatBot.textQuery(req.body.text,req.body.userID,req.body.parameters);
        res.send(responses[0].queryResult);
    });


    app.post('/api/df_event_query', async(req, res) => {
        let responses = await chatBot.eventQuery(req.body.event, req.body.userID, req.body.parameters);
        res.send(responses[0].queryResult);
    });

    app.post('/api/result',async(req,res)=>{
        console.log(req.body.user.name,req.body.user.password,req.body.user.semester);
        let found= await Result.findOne({ 'UserID': req.body.user.name, 'Password': req.body.user.password });

                if (found !== null) {
                    if (found.Semester==req.body.user.semester){
                        const payload = {                                               //custom payload implementation
                            cards: [
                                {
                                    Subject_1: `${found.Subject_1}`,
                                    Semester: `${req.body.user.semester}`,
                                    SGPA: `${found.Sgpa}`,
                                    Subject_4: `${found.Subject_4}`,
                                    Subject_2: `${found.Subject_2}`,
                                    Subject_3: `${found.Subject_3}`,
                                    Subject_5: `${found.Subject_5}`,
                                    UserID: `${ req.body.user.name}`,
                                    Name: `${found.Name}`
                                }
                            ]
                        };
    
                       console.log(payload);
                       res.send(payload);
                    }
    
                    else
                       console.log(`No Record for Semester ${req.body.user.semester}`);
                       res.send(`No Record for Semester ${req.body.user.semester}`);
                    
                }
                else
                    console.log("Wrong ID or Password");
                    res.send("Wrong ID or Password");
    })
}