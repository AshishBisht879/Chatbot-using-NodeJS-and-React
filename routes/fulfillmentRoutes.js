const { WebhookClient, Payload } = require('dialogflow-fulfillment');
const mongoose = require('mongoose');
const ErrorQuery = mongoose.model('ErrorQuery');  //Importing the ErrorQuery mongoose model that we created in No_answer_query.js
const Result = mongoose.model('Result');//Importing the Result mongoose model that we created in Result.js
const syll = mongoose.model('syllabus');
const Notice=mongoose.model('Notice');


module.exports = app => {
    app.post('/', async (req, res) => {
        const agent = new WebhookClient({ request: req, response: res });
        function fallback(agent) {
            agent.add("I didn't Understand");         //Reply that is to be respond with agent.add method
            agent.add("I'm sorry,can you try again !?");
        }

        function calendar(agent) {
            console.log("its calendar");
            agent.add('Getting you to the calendar');

        }

        function No_answered_query(agent) {
            agent.add("Thank you. I hope next time i wl learn about that Query");

            ErrorQuery.findOne({ 'Query_Asked': agent.parameters.Query }, function (err, found) {          //findOne  method to search if the unanswered query already exist in the mode ErrorQuery
                if (found !== null) {              //Query_Asked is the name of field(column) , agent.parameters.Query is the variable name that i use to take input from user in dialogflow 
                    found.counter++;        //then a call back function that if document is not found then 'found' will be NULL
                    found.save();
                }
                else {
                    const new_query = new ErrorQuery({ Query_Asked: agent.parameters.Query });
                    new_query.save();
                }
            });

        }

      async  function syllabus(agent) {
          let found= await   syll.findOne({ 'Course': agent.parameters.course, 'Semester': agent.parameters.semester });
                if (found !== null) {
                    const payload = {                                               //custom payload implementation
                        syllabus_card: [
                            {
                                Subject_1: `${found.Subject_1}`,
                                Semester: `${agent.parameters.semester}`,
                                Course: `${found.Course}`,
                                Subject_4: `${found.Subject_4}`,
                                Subject_2: `${found.Subject_2}`,
                                Subject_3: `${found.Subject_3}`,
                                Subject_5: `${found.Subject_5}`,
                                link:`${found.link}`
                            }
                        ]
                    };
    
                    agent.add(new Payload(agent.UNSPECIFIED, payload, { rawPayload: true, sendAsMessage: true }));
                }
                else
                    agent.add("No Record Found");

        }


       async function show_result(agent) {
           let found= await Result.findOne({ 'UserID': agent.parameters.UserID, 'Password': agent.parameters.Password });

                if (found !== null) {
                    if (found.Semester==agent.parameters.Semester){
                        const payload = {                                               //custom payload implementation
                            cards: [
                                {
                                    Subject_1: `${found.Subject_1}`,
                                    Semester: `${agent.parameters.Semester}`,
                                    SGPA: `${found.Sgpa}`,
                                    Subject_4: `${found.Subject_4}`,
                                    Subject_2: `${found.Subject_2}`,
                                    Subject_3: `${found.Subject_3}`,
                                    Subject_5: `${found.Subject_5}`,
                                    UserID: `${agent.parameters.UserID}`,
                                    Name: `${found.Name}`
                                }
                            ]
                        };
    
                        agent.add(new Payload(agent.UNSPECIFIED, payload, { rawPayload: true, sendAsMessage: true }));
                    }
    
                    else
                        agent.add(`No Record for Semester ${agent.parameters.Semester}`);
                    
                }
                else
                    agent.add("Wrong ID or Password");
        }

      async function notice(agent){
           let found=await Notice.find({});
           console.log(found);
           agent.add(found);
            if(found!==null){
                const payload = {                                               //custom payload implementation
                    notice: [
                        {
                            Notice_1:{
                                Name:`${found[0].Notice_1.Name}`,
                                link:`${found[0].Notice_1.link}`
                            },
                            Notice_2:{
                                Name:`${found[0].Notice_2.Name}`,
                                link:`${found[0].Notice_2.link}`
                            },
                            
                            Notice_3:{
                                Name:`${found[0].Notice_3.Name}`,
                                link:`${found[0].Notice_3.link}`
                            },
                            
                            Notice_4:{
                                Name:`${found[0].Notice_4.Name}`,
                                link:`${found[0].Notice_4.link}`
                            },
                            
                            Notice_5:{
                                Name:`${found[0].Notice_5.Name}`,  
                                link:`${found[0].Notice_5.link}`
                            }
                        }
                    ]
                };
                agent.add('done');

                agent.add(new Payload(agent.UNSPECIFIED, payload, { rawPayload: true, sendAsMessage: true }));
            }
            else
            agent.add("No record");

           

        }

        let intentMap = new Map();                           //creating a object 
        intentMap.set('Query(Calendar)', calendar);         //TO intentMap we add intents that have fulfillment enabled in Dialogflow and provide the method that will run the code for that intent

        intentMap.set('Default Fallback Intent', fallback);

        intentMap.set('No_answer_query', No_answered_query);

        intentMap.set('Result',show_result);

        intentMap.set('syllabus', syllabus);

        intentMap.set('Notice', notice);
        agent.handleRequest(intentMap);
    });
}