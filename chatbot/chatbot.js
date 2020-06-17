'use strict'

const dialogflow = require('dialogflow');
const config = require('../config/keys.js');
const structjson = require('./structjson.js');

const projectId = config.googleProjectID;
const sessionId=config.dialogFlowSessionID;
const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
};
 

//initialize session Client
const sessionClient = new dialogflow.SessionsClient({ projectId, credentials });

module.exports = {
    textQuery: async function(text,userID,parameters = {}) {

        let sessionPath=sessionClient.sessionPath(projectId,sessionId+userID);   //this is session path for each user where both sessionId  from config with userId from client cookie makes a unique ID for a session  

        let self = module.exports;
        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: text,
                    // The language used by the client (en-US)
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };

       
        //detectIntent endpoint call
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;

    },

    eventQuery: async function(event,userID,parameters = {}) {

        let self = module.exports;

        let sessionPath=sessionClient.sessionPath(projectId,sessionId+userID);    

        // The event query request.
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    // The query to send to the dialogflow agent
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters), //Dialogflow's v2 API uses gRPC. You'll need a jsonToStructProto method to convert your JavaScript object to a proto struct.languageCode: languageCode,
                    // The language used by the client (en-US)
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },

        };

        //detectIntent endpoint call
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;

    },

    handleAction: function(responses) {
        return responses;
    }


}