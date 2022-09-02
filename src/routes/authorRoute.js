const express = require('express')
const router = express.Router()
const {authorData} = require('../../config/connection')


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
    authorData.find().then((data)=>{
       let authorslist = data.sort()
   //     console.log('books1',bookDetails)
    res.render('authorslist',{authorslist})
   // res.json(authorslist)
    })

})

http://localhost:8000/authorlist

router.get('/author-register',(req,res) => { 

    // let id= req.params.id;
    res.render('author-register') 
})
router.post('/addAuthor',(req,res) => {  
    upload(req,res,(error)=>{
        if(error){
        console.log("err",error)
    }else{
        const authorReg = new authorData({
            firstname:req.body.fname,
            lastname:req.body.Lname,
            Address:req.body.address,
            language:req.body.language,
            email:req.body.email,
            country:req.body.country,
            city:req.body.city,

            image:{
                data:req.file.filename,
                contentType:'image/png'
            }
        })
        console.log("first name",req.body.fname)
        console.log("image",authorReg.image)
       console.log("city",req.body.city)
    //    res.send(bookData);
    
    authorReg.save((error,result)=>{
    
        if(error)
        throw error
        else {
            console.log("results ",result)
           res.redirect('/authorlist') //can we add rendder instead of redirect
           // res.render('authorlist')
        }
    })
    console.log("image2",req.body.image)
}
    })

// res.json(req.body.image)

   
})



module.exports=router
