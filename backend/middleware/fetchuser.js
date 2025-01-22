import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET ;

const fetchuser = (req, res, next) => {
    // Get the token from the header
    const token = req.header('Authorization');
    
  
    if (!token) {
      return res.status(401).json({ error: "Invalid token, please provide a valid one" });
    }
  
    try {
   
      const data =jwt.verify(token,JWT_SECRET,{ algorithm: 'HS384' });
      console.log("verify successful");
      const id=data.id;

      req.user = data.user;
     
      req.user = {
        id: data.user.id,
        role:data.user.role       // Extract the user ID from the payload
       
    };
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Token verification failed" });
    }
  };
  
 export default fetchuser;