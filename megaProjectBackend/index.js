const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
// console.log("userRoutes:", userRoutes);
// console.log("profileRoutes:", profileRoutes);
// console.log("courseRoutes:", courseRoutes);
// console.log("paymentRoutes:", paymentRoutes);


const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const cookieParser = require("cookie-parser")  ;
const cors = require("cors");



const fileUpload = require("express-fileupload");   
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT|| 4000;

// database connect 
database();

// cloudinary connect
cloudinaryConnect();

// middleware 
app.use(express.json()) ;
app.use(cookieParser());
app.use(cors(
    {
        origin:["http://localhost:3000","http://localhost:5173"],
        credential:true,
    }
));

app.use(fileUpload({
    useTempFiles:true,

    tempFileDir:"/tmp"
}))

// routes 
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

// default of route;

app.get("/", (req , res )=>{
    console.log("your server is running successfully")

})

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
