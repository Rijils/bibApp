const express = require('express')
const router = express.Router()
const {newUserRegData} = require('../../config/connection')
const{isloggedin}= require('../../config/authentication')
const bycrypt= require('bcrypt')

router.get('/RegisterForm',(req,res) => {
    res.render('NewUserRegForm')
    })

    router.post('/newUser',async(req,res) => { //http://localhost:8000/books/addbook
        const hashpassword = await bycrypt.hash(req.body.password,10)
        const newUserReg = new newUserRegData({
           
            firstname:req.body.Fname,
            lastname:req.body.Lname,
            email:req.body.email,
            password:hashpassword,
            gender:req.body.gender
            //newUserRegData.findOne()
        })
   console.log('new user reg: ',newUserReg.password);
       newUserReg.save((error,result)=> {
        if(error) 
        throw error;
    else {
        //console.log(result)
       // res.json(result); 
       res.redirect('/')
    }
            
       })
   
     
    })

    router.post('/loginUser',(req,res)=> {
       const email = req.body.email
       const password =  req.body.password
       newUserRegData.findOne({email:email}).then(value => {
        console.log(value)
        if(value == null) {
            console.log('invalid')
            res.redirect('/')
        }else{
            bycrypt.compare(password,value.password,(error,result)=>{
                if(error)
                throw error
                else{
                    console.log(result)
                    if(result) {
                        req.session.auth=true
                        res.redirect('/books')
                    }else{
                        res.redirect('/')  
                    }
                  
                }
            })

        }

       }) 
    })

    router.get('/logout',(req,res) => {

        req.session.destroy((error)=>{
            if(error)
            throw error
            else {
                res.redirect("/")
            }
        })
  
        })

module.exports=router



