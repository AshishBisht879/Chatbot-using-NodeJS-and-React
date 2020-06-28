const mongoose=require('mongoose');
const {Schema}=mongoose;

const UnansweredQuery=new Schema({
    Query_Asked:String, 
    counter:{type:Number,default:1}
});

mongoose.model('ErrorQuery',UnansweredQuery);

//Data in MongoDB has a flexible schema. 
//we have given model name as 'ErrorQuery' and in database it created collection name as 'errorqueries' 
//all case lower and plural form of given model name