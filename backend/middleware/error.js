export const errorMiddleware =(err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const errorMessage = err.message || "Something went wrong in server"
    res.status(statusCode).json({
        success:false,
        statusCode,
        errorMessage
    });
    next(); 
}