import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./src/configs/dbConfig.js";
dotenv.config();


const PORT = process.env.PORT;


// Connect Database 
connectDB();

app.listen(PORT, () => {

  console.log(`Server running on PORT ${PORT}`);
});