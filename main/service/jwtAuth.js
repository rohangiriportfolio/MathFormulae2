import jsonWebToken from 'jsonwebtoken';

const secretKey = "JaiShreeRam.Ayodhya@108";
function createToken(user){
    const payLoad = {
        _id: user._id,
        name: user.name,
        email: user.email      
    };
    const token = jsonWebToken.sign(payLoad, secretKey, {
        expiresIn: '24h' // Token will expire in 24 hours
      });
    return token;
} 

function validateToken(token){
    const payLoad = jsonWebToken.verify(token, secretKey);
    return payLoad;
}

export const jwtAuthFunc = {createToken, validateToken, secretKey};