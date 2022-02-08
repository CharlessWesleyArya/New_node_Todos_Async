function errorHandler(err,req,res,next)
{
    res.status(err.status).json({
        msg:err.msg
    })
}
module.exports=errorHandler;