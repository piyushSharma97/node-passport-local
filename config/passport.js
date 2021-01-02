const LocalStrategy =require('passport-local').Strategy

const bcrypt = require('bcryptjs')

const User = require('../models/User')


module.exports = function(passport){
  passport.use(
      new LocalStrategy({usernameField:'email'},(email,password,done)=>{
             //match use
             User.findOne({email:email})
             .then(user=>{
                 if(!user){
                     return done(null,false,{message:' UserEmail is not registered'})
                 }
            
                 bcrypt.compare(password,user.password,(err,isMatch)=>{
                     console.log({isMatch})
                     if(isMatch){
                      return   done(null,user)
                     }else{
                       return  done(null,false,{message:'Incorrect password.'})
                     }
                 })
             })
             .catch((err=>{
               console.error(err)
             }))
      })
  )
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}