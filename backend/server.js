import express from 'express';
import dotenv from 'dotenv';    

dotenv.config();
const PORT=process.env.PORT;
const app = express();

app.get('/', (req, res) => {
  res.send('Server responding!');
}); 

app.listen(PORT, () => {
  console.log('Server is running on port 5000');
} );    