module.exports={
    /**
     * Expose flash messages
     * @param req
     * @param res
     * @param next
     */
    flash_messages:function(req,res,next){
        console.log('flash middleware executed');
        res.locals.flash_messages ={
            info:req.flash('info')||[],
            success:req.flash('success')||[],
            error:req.flash('error')||[]
        };
        next();
    },
    res_locals:function(req,res,next){
        console.log(this);
        res.locals(app.container.locals);
        next();
    }
};