const express = require('express')
const jwttocken = require('jsonwebtoken')
const router = express.Router()
const authenticateToken=(req,res,next)=>{
    const authHeader=req.headers['authorization']
    console.log("authHeader",authHeader)
    const token= authHeader && authHeader.split(' ')[1]
    console.log("tocken",token)
    if(token==null) return res.sendStatus(401) 
    
    jwttocken.verify(token,process.env.JWT_KEY,(err,user)=>{
        if(err) return res.sendStatus(403)
        req.user=user
        console.log("user:",user)
        next()
    })
}
const tockenArray=[]
router.post('/logineduser',(req,res)=> {
 
   const data = {
     email : req.body.email,
     password :  req.body.password
   }
   const tocken =jwttocken.sign(data,process.env.JWT_KEY,{expiresIn:"1m"}) 
   tockenArray.push(tocken)
   res.json(tocken)
 })

 router.get('/getuser',authenticateToken,(req,res)=> {

    let user = req.user;
    res.json(user);
 })


module.exports = router;