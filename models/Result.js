const mongoose=require('mongoose');
const {Schema}=mongoose;

const Report=new Schema({
    UserID:String,
    Name:String,    
    Password:String,
    Semester:String,
    Subject_1:String,
    Subject_2:String,
    Subject_3:String,
    Subject_4:String,
    Subject_5:String,
    Sgpa:String
});

mongoose.model('Result',Report);
// Strick Rules
// the name that is given as model name as 'Result' in above so at the database it will
//create or look for collection(table) 'results' results is the automatically generated collection name by mongodb with lowercase and plural form 
//of the model name that we have given
//As in NO_query_result.js we have given model name as 'ErrorQuery' and in database it created collection name as 'errorqueries' 
//all case lower and plural form of given model name