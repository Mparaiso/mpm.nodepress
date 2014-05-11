module.exports={
    // Expose flash messages
    flash_messages:function(req,res,next){
        res.locals.flash_messages ={
            info:req.flash('info')||[],
            success:req.flash('success')||[],
            error:req.flash('error')||[]
        };
        next();
    },
    //set response locals
    res_locals:function(req,res,next){
        res.locals(req.app.container.locals);
        next();
    }
};