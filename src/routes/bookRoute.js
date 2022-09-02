const express = require('express')
const router = express.Router()
const {bookData,newUserRegData} = require('../../config/connection')
const{isloggedin} = require('../../config/authentication')

const multer=require('multer')
  const path=require('path')




const Storage=multer.diskStorage({
    destination:'./public/uploades',
    filename:function(req,file,callback){
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload=multer({
    storage:Storage
}).single('image')






router.get('/',(req,res) => {
    bookData.find().then((bookDetails)=>{
   //     console.log('books1',bookDetails)
     //res.render('books',{bookDetails})
     res.json(bookDetails)
   })

})

router.get('/singlebook/:id',isloggedin,(req,res) => {

    let id= req.params.id;
    bookData.findById(id).then((bookDetails)=>{
        //console.log('books1',bookDetails)
        res.render('SingleBook',{bookDetails})
    })
  
})



router.get('/register-book',isloggedin,(req,res) => {

    // let id= req.params.id;
    res.render('register') //mimum 1 parameter neeeded
})


router.post('/addbooks',isloggedin,(req,res) => { //http://localhost:8000/books/addbook

    console.log("Adding booking",req.body)
    upload(req,res,(error)=>{
        if(error){
        console.log("err",error)
    }else{
        console.log("multer booking",req.body)
    const regBook = new bookData({
        bookname:req.body.bookname,
        bookdesc:req.body.bookdesc,
        language:req.body.language,
        email:req.body.email,
        country:req.body.country,
        price:req.body.price,
        image:{
            data:req.file.filename,
            contentType:'image/png'
        }
    })
   // let bookinfo = bookData(regBook)
   regBook.save((error,result)=> {
        if(error) 
            throw error;
        else {
            //console.log(result)
           // res.json(result); 
           res.redirect('/books')
        }
   })
}
})
 
//    res.send(bookData); 
 
})


router.get('/updateBook/:id',isloggedin,(req,res) => {
    const id = req.params.id;
    //console.log("riji ID:",id)
    bookData.findById(id).then(bookDetails=>{
        //console.log("books",bookDetails)
        res.render('updateBook',{bookDetails})
    }).catch(error =>{
        console.log("error  happens")
    })
   

    // let id= req.params.id;
   //mimum 1 parameter neeeded
})

router.post('/singlebook/updatedNewbook/:id',isloggedin,(req,res) => {

    const updatedBook = {
        bookname:req.body.bookname,
        // bookdesc:req.body.bookdesc,
        // language:req.body.language,
        // email:req.body.email,
        // country:req.body.country,
        // price:req.body.price
    }
    //bookData.updateOne(updatedBook)
    const id = req.params.id;
    console.log('id',id)
    console.log('body bf color',req.body.bookname)
    //console.log('updated book',updatedBook)
    //console.log(req.body);

    bookData.findByIdAndUpdate((id),{$set:updatedBook}).then(result =>{
        //console.log('updatedri',result)
        res.redirect('/books')
    }).catch(error =>{
        console.log("error  happens")
    })
  
})


router.get('/deleteBook/:id',isloggedin,(req,res) => {

    
    const id = req.params.id;
    console.log('id',id)
    console.log('delete',id)

    bookData.findByIdAndDelete(id).then(result =>{
        //console.log('updatedri',result)
        console.log("deleted")
        res.redirect('/books')
    }).catch(error =>{
        console.log("error  happens")
    })
  
})

router.post('/login',(req,res) => {
    const id = req.params.id;
 
    })

module.exports=router



