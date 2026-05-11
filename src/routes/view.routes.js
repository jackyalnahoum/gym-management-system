const express = require("express");
const ViewController = require("../controllers/view.controller");

const router = express.Router();

// Home
router.get("/", ViewController.renderHome);

// Members
router.get("/views/members", ViewController.renderMembers);
router.post("/views/members", ViewController.createMember);
router.post("/views/members/:member_id/update", ViewController.updateMember);
router.post("/views/members/:member_id/delete", ViewController.deleteMember);

// Trainers
router.get("/views/trainers", ViewController.renderTrainers);
router.post("/views/trainers", ViewController.createTrainer);
router.post("/views/trainers/:trainer_id/update", ViewController.updateTrainer);
router.post("/views/trainers/:trainer_id/delete", ViewController.deleteTrainer);

// Workouts

router.get("/views/workouts", ViewController.renderWorkouts);
router.post("/views/workouts", ViewController.createWorkout);
router.post("/views/workouts/:workout_id/update", ViewController.updateWorkout);
router.post("/views/workouts/:workout_id/delete", ViewController.deleteWorkout);

// Progress
router.get("/views/progress", ViewController.renderProgress);
router.post("/views/progress", ViewController.createProgress);
router.post("/views/progress/:progress_id/update",ViewController.updateProgress);
router.post("/views/progress/:progress_id/delete",ViewController.deleteProgress);

// Ratings
router.get("/views/ratings", ViewController.renderRatings);
router.post("/views/ratings", ViewController.createRating);
router.post("/views/ratings/:id/update",ViewController.updateRating);
router.post("/views/ratings/:id/delete",ViewController.deleteRating);

// Subscriptions
router.get("/views/subscriptions", ViewController.renderSubscriptions);
router.post("/views/subscriptions",ViewController.createSubscription);
router.post("/views/subscriptions/:subscription_id/delete",ViewController.deleteSubscription);

router.get("/views/test", (req, res) => {
    res.send("VIEW ROUTE WORKING");
});

router.get("/hello-test", (req, res) => {
    res.send("HELLO WORKS");
});

module.exports = router;