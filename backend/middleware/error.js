export const errorMiddleware =(err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const errorMessage = err.message || "SOMETHING WENT WRONG IN SERVER!"
    res.status(statusCode).json({
        success:false,
        statusCode,
        errorMessage
    });
    next(); 
}