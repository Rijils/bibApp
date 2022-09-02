const mongoOs= require('mongoose')
mongoOs.connect('mongodb://localhost:27017/Library') // after27017/'liberary' - ucan add the db name

const registerBook = new mongoOs.Schema({

    bookname:String,
    bookdesc:String,
    language:String,
    email:String,
    country:{
        type:String,
        uppercase: true
    },
    price:Number,
    image:{
        data:Buffer,
        contentType:String
    }


})

const bookData = mongoOs.model("books",registerBook)
//module.exports. = {bookData}


const registerAuthor = mongoOs.Schema({

    firstname:String,
    lastname:String,
    Address:String,
    language:String,
    email:String,
    country:String,
    country:{
        type:String,
        uppercase: true
    },
    image:{
        data:Buffer,
        contentType:String
    }

})
const authorData = mongoOs.model("authors",registerAuthor)


const newUserRegister = mongoOs.Schema({

    firstname:String,
    lastname:String,
    email:String,
    password:String,
    gender:String
 
})
const newUserRegData = mongoOs.model("UserRegistration",newUserRegister)
module.exports = {authorData,bookData,newUserRegData}