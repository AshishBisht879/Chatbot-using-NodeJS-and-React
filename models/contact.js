const mongoose=require('mongoose');
const {Schema}=mongoose;

const contact=new Schema({
    Name:String,
    Email:String,
    Counter:{type:Number,default:1},
    Message:String,
});

mongoose.model('contact',contact);