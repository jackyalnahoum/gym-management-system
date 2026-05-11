const express = require("express");
const app = express();

const path = require('path');



// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




const viewRoutes = require("./routes/view.routes");
app.use("/", viewRoutes);

const memberRoutes = require("./routes/member.routes");
app.use("/member", memberRoutes);

const trainerRoutes = require("./routes/trainer.routes");
app.use("/trainer", trainerRoutes);

const subscriptionRoutes = require("./routes/subscription.routes");
app.use("/subscription", subscriptionRoutes);

const workoutRoutes = require("./routes/workout.routes");
app.use("/workout_plan", workoutRoutes);

const progressRoutes = require("./routes/progress.routes");
app.use("/progress", progressRoutes);

const trainerRatingRoutes = require("./routes/trainerRating.routes");
app.use("/trainer_rating", trainerRatingRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

module.exports = app;
