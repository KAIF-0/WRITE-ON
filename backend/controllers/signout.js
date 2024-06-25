export const signout = (req, res, next) => {
    try {
        res.clearCookie('access_tkn').status(200).json('USER HAS BEEN SIGNOUT...')
    } catch (error) {
        next(error)
    }


}  