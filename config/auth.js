module.exports={
    ensureAuthenticated: function(req,res,next){
          if(req.isAuthenticated()){
              return next();
          }
          else{
              req.flash('error_msg','Plese Login to view this resource')
              res.redirect('/users/login')
          }
    }
}