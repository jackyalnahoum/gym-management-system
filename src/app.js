const express = require("express");
const app = express();

app.use(express.json());

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
