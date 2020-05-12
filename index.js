const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose=require('mongoose');  //for database
const config=require('./config/keys');
mongoose.connect(config.mongoURI,{useUnifiedTopology: true, useNewUrlParser: true});//it will connect to database create an instance for once and further use that instance 

require('./models/No_query_result.js');
require('./models/Result');
require('./models/Syllabus');
require('./models/Notice');

app.use(bodyParser.json());

require('./routes/routes.js')(app);
require('./routes/fulfillmentRoutes.js')(app);

if(process.env.NODE_ENV==='production'){            //tell the server to render the frontend files
    app.use(express.static('client/build'));        //all css and javascript files are here
}

const path=require('path');
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));  //every files that is inside the build and client folder will server to index.html
});



const PORT = process.env.PORT || 5000;
app.listen(PORT);