require('dotenv').config()
const express = require('express')
const app = new express()


const {bookData,authorData} = require('./config/connection')
const bookRouter = require('./src/routes/bookRoute')
const authorRouter = require('./src/routes/authorRoute')
const newUserRouter = require('./src/routes/userRegisterRoute')
const {store} = require('./config/authentication.js')
const jwt =  require('./src/routes/jwt')

const cors= require('cors')
const session = require('express-session')
let port = process.env.PORT || 8000;
//   const multer=require('multer')
//   const path=require('path')



//fileupload
//   const Storage=multer.diskStorage({
//     destination:'./public/uploades',
//     filename:function(req,file,callback){
//         callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })
// const upload=multer({
//     storage:Storage
// }).single('image')

app.set('view engine','ejs')
app.set('views','./src/views')

app.use(express.static('./public')) //cs and js loading 

app.use(express.urlencoded({extended:true})) // post method middileware
app.use(express.json()) //
app.use(cors())
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    store:store
}))


// const bookDetails = [
// {

// BookName: "Wings of Fire",
// Author:"Tuit ,sutherland",
// Year : 2004,
// Price: 23,
// image:'images1.jpg'


// },
// {

//     BookName: "One Indian Girl",
//     Author:"Chetan Bagath",
//     Year : 2007,
//     Price: 30,
//     image:'img2.jpg'
    
    
//     },
//     {

//         BookName: "This is not your Story",
//         Author:"Savi sharma",
//         Year : 2000,
//         Price: 27,
//         image:'img3.jpg'
        
        
//         },
//         {

//             BookName: "Emma",
//             Author:"Jane Austen",
//             Year : 1948,
//             Price: 20,
//             image:'img4.jpg'
            
            
//             },
//             {

//                 BookName: "Gitanjali",
//                 Author:"Ravindranath Tagore",
//                 Year : 1999,
//                 Price: 53,
//                 image:'img2.jpg'
                
                
//                 }


// ]
// console.log(bookDetails[1])

app.use('/books',bookRouter)
app.use('/authorlist',authorRouter)
app.use('/user',newUserRouter)
app.use('/jwt',jwt)
app.get('/',(req,res) => {
    res.render('home')
})
http://localhost:8000




// app.get('/login',(req,res) => {

//     res.send("happy to see you")
// })

// app.get('/name',(req,res) => {
//     var fruit = ['apple','grape','orange','berry']
//     res.render('demo',{fruit})
// })




// app.get('/books/addbooks',(req,res) => {

//     const bookData = {
//         bookname:req.query.BookName,
//         bookdesc:req.query.bookdesc,
//         optradio:req.query.optradio,
//         email:req.query.email,
//         country:req.query.country
//     }
//    console.log(bookData.country)
//    console.log(req.query.bookdesc)
//    res.send(bookData);
    
// })










app.listen(port,()=> {
    console.log('http://localhost:8000');
})