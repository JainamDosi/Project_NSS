import express from 'express';
import dotenv from 'dotenv';    

import connectMongoDB from './config/connectMongoDB.js';
import authRoutes from './routes/auth.js';
import bookmarksRoutes from './routes/bookmarks_route.js';
import testRoutes from './routes/test.routes.js';
import performanceRoutes from './routes/performance.routes.js';
import cookieParser from 'cookie-parser'; 

dotenv.config();
const PORT=process.env.PORT;
const app = express();
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('Server responding!');
}); 

app.use('/api/users', authRoutes); // Routes for user authentication and management
app.use('/api/tests', testRoutes); // Routes for test management
app.use('/api/performance', performanceRoutes); // Routes for performance tracking
app.use('/api/bookmarks', bookmarksRoutes); // Routes for bookmarking tests



app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  connectMongoDB();
});    