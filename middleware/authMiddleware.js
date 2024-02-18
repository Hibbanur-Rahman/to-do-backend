const jwt= require('jsonwebtoken');
const secretKey='Rahman@1234';
const httpStatusCode= require('../constant/httpStatusCode');

async function getToken(req,res){
    const user=req.body;
    const token= await jwt.sign({user},secretKey,{expiresIn: '1h'});
    console.log(token);
    return token;
}

async function verifyToken(req,res,next){

    try{
        const token= req.cookies.token;  // Assuming the token is stored in a cookie named 'token'

        if(!token){
            return res.status(httpStatusCode.UNAUTHORIZED).json({
                success:false,
                message:'Unauthorized: Token not provided',
            });
        }

        const decoded= await jwt.verify(token,secretKey);
        req.user= decoded.user // You can access the user data in your routes

        next();
    }catch(error){
        console.error('Error verifying token:',error);
        return res.status(httpStatusCode.BAD_REQUEST).json({
            success: false,
            message:" the Bad request"
        })
    }
}

module.exports={
    getToken,
    verifyToken
}