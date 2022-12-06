module.exports = {
    ensureAuthenticated : function(req,res,next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg' , 'Efetue login para poder acessar o sistema');
        res.redirect('/login');
    }
}