import app from './src/app.js';
import dotenv from 'dotenv';
import authRoute from './src/routes/authRoute.js';
import connectDB from './src/configs/dbConfig.js';
import productRouter from './src/routes/productRoute.js';
dotenv.config();
await connectDB();

app.use('/api',authRoute);
app.use('/api/product', productRouter);



const PORT=3000;
//listening the port.
app.listen(process.env.PORT ,()=>{
    console.log(`Server is listening on port:${PORT}`);
})