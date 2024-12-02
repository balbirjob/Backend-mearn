require("dotenv").config();
const express = require("express")
const app = express();
const cors = require("cors");
const authRoute = require("./router/auth-router");
const connectDb = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');




//.......................................
//connecting our frontend
const corseOption ={
    origin: 'https://food-web-app-smoky.vercel.app',
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}

//access to front end 
app.use(cors(corseOption));

//...........*******.................


//.......................
app.use(express.json());
//...........*******.................



//.......................................
//only page route


//this is root folder/ file
app.use("/api/auth",authRoute)

//...........*******.................










//.......................................
//this for error middilware
app.use(errorMiddleware);
//...........*******.................




//.......................................
//backkend server port
const PORT = process.env.PORT || 8000 ;


connectDb().then(() => {

    app.listen(PORT, () => {
        console.log(`server is runing on PORT: ${PORT}`);

    });

});
//...........*******.................