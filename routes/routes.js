const chatBot = require('../chatbot/chatbot.js');
const mongoose = require('mongoose');
const Result = mongoose.model('Result');//Importing the Result mongoose model that we created in Result.js
const contact = mongoose.model('contact');
module.exports = app => {

    // app.get('/', (req, res) => {
    //     res.send({ 'hello': 'Budddy' });
    // });

    app.post('/api/df_text_query', async (req, res) => {
        let responses = await chatBot.textQuery(req.body.text, req.body.userID, req.body.parameters);
        res.send(responses[0].queryResult);
    });


    app.post('/api/df_event_query', async (req, res) => {
        let responses = await chatBot.eventQuery(req.body.event, req.body.userID, req.body.parameters);
        res.send(responses[0].queryResult);
    });

    app.post('/api/result', async (req, res) => {
       
        let found = await Result.findOne({ 'UserID': req.body.user.name, 'Password': req.body.user.password });

        if (found !== null) {
            if (found.Semester == req.body.user.semester) {
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
                            UserID: `${req.body.user.name}`,
                            Name: `${found.Name}`
                        }
                    ]
                };
                res.send(payload);
            }

            else
                res.send(`No Record for Semester ${req.body.user.semester}`);

        }
        else
            res.send("Wrong ID or Password");
    });

    app.post("/api/contact_admin", async (req, res) => {
        let message = {
            response: "",
             email: ""
        };

        let found = await contact.findOne({ 'Email': req.body.user.email }, function (err, found)              //checking if some msg came before from same email
        {
            if (err) {
                message = {
                    response: "Server Error",
                    email: null
                };
                
                console.log("\nEror occured ");
            }
            else {
                if (found != null) {
                    found.Counter++;
                    found.Message += " , "+ req.body.user.message;                              //adding the new message to previous message 
                    found.Name += " , " + req.body.user.name;
                    found.save();
                }
                else {
                    const new_query = new contact({ Name: req.body.user.name, Email: req.body.user.email , Message: req.body.user.message });
                    new_query.save();
                }

                message = {
                    response: "Submitted_success",
                    email: req.body.user.email
                }
                console.log("No error"+message.response);
            }
        }
        );

        res.send(message);

    });
}