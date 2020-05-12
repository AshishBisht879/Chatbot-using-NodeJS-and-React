const mongoose=require('mongoose');
const {Schema}=mongoose;

const Report1=new Schema({
    Course:String,
    Semester:String,
    Subject_1:String,
    Subject_2:String,
    Subject_3:String,
    Subject_4:String,
    Subject_5:String,
    link:String
});

mongoose.model('syllabus',Report1);