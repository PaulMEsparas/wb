require("dotenv").config();
const express = require("express");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");

const cors = require("cors");

//express app
const app = express();

//variables
const port = process.env.PORT;

//middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Middleware to set CORS headers
// app.use(function (req, res, next) {
//   // Allow requests from any origin
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   // Allow specific methods
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE"
//   );

//   // Allow specific headers
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

//   // Allow credentials (if needed)
//   // res.setHeader('Access-Control-Allow-Credentials', 'true');

//   // Handle preflight requests
//   if (req.method === "OPTIONS") {
//     res.sendStatus(200); // Respond to preflight request
//   } else {
//     next(); // Pass control to the next middleware
//   }
// });

app.use(express.json());

// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

//route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the app" });
});

// app.use("/api/workouts", workoutRoutes);
// app.use("/api/user", userRoutes);

app.use("/workouts", workoutRoutes);
app.use("/user", userRoutes);

//connect to database (async)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen
    app.listen(port, () =>
      console.log(`Connected to DB and Listening to port ${port}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
