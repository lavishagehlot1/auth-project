import app from './src/app.js';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import authRoute from './src/routes/authRoute.js';
dotenv.config();
await connectDB();

app.use('/api',authRoute);


const PORT=3000;
//listening the port.
app.listen(process.env.PORT ,()=>{
    console.log(`Server is listening on port:${PORT}`);
})