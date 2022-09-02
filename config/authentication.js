const session = require('express-session')
const mongodbSession=require('connect-mongodb-session')(session)
const store = new mongodbSession({
    uri:"mongodb://localhost:27017/Library",
    collection:"mysession"
})
const isloggedin=(req,res,next)=>{
    if(req.session.auth){
        next()
    }else{
        res.redirect('/user/logout')
    }
}
module.exports={store,isloggedin}