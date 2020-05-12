const mongoose=require('mongoose');
const {Schema}=mongoose;

const Report1=new Schema({
    Notice_1:{
        Name:String,
        link:String
    },
    Notice_2:{
        Name:String,
        link:String
    },
    Notice_3:{
        Name:String,
        link:String
    },
    Notice_4:{
        Name:String,
        link:String
    },
    Notice_5:{
        Name:String,
        link:String
    },
});

mongoose.model('Notice',Report1);