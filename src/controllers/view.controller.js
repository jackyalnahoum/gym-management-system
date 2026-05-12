const MemberService = require("../services/member.service");
const TrainerService = require("../services/trainer.service");
const WorkoutService = require("../services/workout.service");
const ProgressService = require("../services/progress.service");
const RatingService = require("../services/trainerRating.service");
const SubscriptionService = require("../services/subscription.service");

// 🔹 feedback helpers (KEEP THESE — very important for UI messages)
function buildFeedbackState(req) {
    return {
        message: req.query.message || null,
        messageType: req.query.type === "error" ? "error" : "success",
    };
}

function buildRedirectPath(basePath, message, type = "success") {
    const params = new URLSearchParams({ message, type });
    return `${basePath}?${params.toString()}`;
}

class ViewController {

    static async renderHome(req, res) {
    try {
        const members =
            await MemberService.getAllMembers();

        const trainers =
            await TrainerService.getAllTrainers();

        const workouts =
            await WorkoutService.getAllWorkouts();
            

        const ratings =
            await RatingService.getAllRatings();

        const subscriptions =
            await SubscriptionService.getAllSubscriptions();

        const progress =
            await ProgressService.getAllProgress();

        const avgRating =
            ratings.length
                ? (
                    ratings.reduce(
                        (sum, r) =>
                            sum + Number(r.id.rating || 0),
                        0
                    ) / ratings.length
                  ).toFixed(1)
                : 0;

        // API QUOTE
        
        const quoteRes =
            await fetch("https://zenquotes.io/api/random");

        const quoteData =
            await quoteRes.json();

        const quote =
            quoteData[0].q;

        return res.render("index", {

            title: "Elite Fitness Club Dashboard",

            summary: {
                members: members.length,
                trainers: trainers.length,
                workouts: workouts.length,
                subscriptions: subscriptions.length,
                ratings: ratings.length,
                progressRecords: progress.length,
                avgRating
            },

            quote,

            error: null,
        });

    } catch (err) {

        return res.render("index", {

            title: "Elite Fitness Club Dashboard",

            summary: {
                members: 0,
                trainers: 0,
                workouts: 0,
                subscriptions: 0,
                ratings: 0,
                progressRecords: 0,
                avgRating: 0
            },

            quote: "Discipline builds strength.",

            error: err.message,
        });
    }
   
}
    

    // 🟢 MEMBERS PAGE
    static async renderMembers(req, res) {
    console.log("RENDER MEMBERS HIT");
    
    try {
        const members = await MemberService.getAllMembers();

        return res.render("members", {
            title: "Members View",
            members,
            error: null,
            ...buildFeedbackState(req),
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
}

    // 🟢 CREATE
    static async createMember(req, res) {
        try {
            await MemberService.createMember(req.body);

            return res.redirect(
                buildRedirectPath("/views/members", "Member created successfully.")
            );
        } catch (err) {
            return res.redirect(
                buildRedirectPath("/views/members", err.message, "error")
            );
        }
    }

    // 🟢 UPDATE
    static async updateMember(req, res) {
        try {
            await MemberService.updateMember({
                member_id: req.params.member_id,
                ...req.body,
            });

            return res.redirect(
                buildRedirectPath("/views/members", "Member updated successfully.")
            );
        } catch (err) {
            return res.redirect(
                buildRedirectPath("/views/members", err.message, "error")
            );
        }
    }

    // 🟢 DELETE
    static async deleteMember(req, res) {
        try {
            await MemberService.deleteMember(req.params.member_id);

            return res.redirect(
                buildRedirectPath("/views/members", "Member deleted successfully.")
            );
        } catch (err) {
            return res.redirect(
                buildRedirectPath("/views/members", err.message, "error")
            );
        }
    }

    // 🟢 TRAINERS PAGE
    static async renderTrainers(req, res) {

    try {
        const trainers = await TrainerService.getAllTrainers();; 

        return res.render("trainers", {
            title: "Trainers View",
            trainers,
            error: null,
            ...buildFeedbackState(req),
        });
    } catch (err) {
        return res.status(500).render("trainers", {
            title: "Trainers View",
            trainers: [],
            error: err.message,
        });
      }
    }  

    static async createTrainer(req, res) {
        try {
            await TrainerService.createTrainer(req.body);
            return res.redirect("/views/trainers");
        } catch (err) {
            return res.send(err.message);
        }
    }

    static async updateTrainer(req, res) {
        try {
            console.log("BODY:", req.body);
            console.log("PARAMS:", req.params);
            await TrainerService.updateTrainer({
                trainer_id: Number(req.params.trainer_id),
                ...req.body
            });
            return res.redirect("/views/trainers");
        } catch (err) {
            return res.send(err.message);
        }
    }

    static async deleteTrainer(req, res) {
        try {
            await TrainerService.deleteTrainer(Number(req.params.trainer_id));
            return res.redirect("/views/trainers");
        } catch (err) {
            return res.send(err.message);
        }
    }


    // 🟢 WORKOUTS PAGE
static async renderWorkouts(req, res) {
    try {
        const workouts = await WorkoutService.getAllWorkouts();

        console.log(workouts);
        

        return res.render("workouts", {
            title: "Workouts View",
            workouts,
            error: null,
            ...buildFeedbackState(req),
        });

    } catch (err) {

        return res.render("workouts", {
            title: "Workouts View",
            workouts: [],
            error: err.message,
            ...buildFeedbackState(req),
        });
    }
}


static async createWorkout(req, res) {
    try {
        
        await WorkoutService.createWorkout(req.body);

        return res.redirect(
            buildRedirectPath("/views/workouts", "Workout created successfully.")
        );

    } catch (err) {

        return res.redirect(
            buildRedirectPath("/views/workouts", err.message, "error")
        );
    }
}


static async updateWorkout(req, res) {
    try {

        await WorkoutService.updateWorkout({
            workout_id: req.params.workout_id,
            ...req.body
        });

        return res.redirect(
            buildRedirectPath("/views/workouts", "Workout updated successfully.")
        );

    } catch (err) {

        return res.redirect(
            buildRedirectPath("/views/workouts", err.message, "error")
        );
    }
}

// 🟢 DELETE
static async deleteWorkout(req, res) {
    try {

        await WorkoutService.deleteWorkout(req.params.workout_id);

        return res.redirect(
            buildRedirectPath("/views/workouts", "Workout deleted successfully.")
        );

    } catch (err) {

        return res.redirect(
            buildRedirectPath("/views/workouts", err.message, "error")
        );
    }
}


    //🔹 PROGRESS
  static async renderProgress(req, res) {

    try {

        const progress = await ProgressService.getAllProgress();

        return res.render("progress", {
            title: "Progress View",
            progress,
            error: null,
            ...buildFeedbackState(req),
        });

    } catch (err) {

        return res.render("progress", {
            title: "Progress View",
            progress: [],
            error: err.message,
            ...buildFeedbackState(req),
        });
    }
   }

   static async createProgress(req, res) {

    try {

        await ProgressService.createProgress(req.body);

        return res.redirect(
            buildRedirectPath(
                "/views/progress",
                "Progress created successfully."
            )
        );

    } catch (err) {

        return res.redirect(
            buildRedirectPath(
                "/views/progress",
                err.message,
                "error"
            )
        );
    }
   }

   static async updateProgress(req, res) {

    try {

        await ProgressService.updateProgress({
            progress_id: req.params.progress_id,
            ...req.body
        });

        return res.redirect(
            buildRedirectPath(
                "/views/progress",
                "Progress updated successfully."
            )
        );

    } catch (err) {

        return res.redirect(
            buildRedirectPath(
                "/views/progress",
                err.message,
                "error"
            )
        );
    }
   }

   static async deleteProgress(req, res) {

    try {

        await ProgressService.deleteProgress(
            req.params.progress_id
        );

        return res.redirect(
            buildRedirectPath(
                "/views/progress",
                "Progress deleted successfully."
            )
        );

    } catch (err) {

        return res.redirect(
            buildRedirectPath(
                "/views/progress",
                err.message,
                "error"
            )
        );
    }
  }


//🔹 RATINGS
static async renderRatings(req, res) {

    try {

        const ratings = await RatingService.getAllRatings();

        return res.render("ratings", {
            title: "Ratings View",
            ratings,
            error: null,
            ...buildFeedbackState(req),
        });

    } catch (err) {

        return res.render("ratings", {
            title: "Ratings View",
            ratings: [],
            error: err.message,
            ...buildFeedbackState(req),
        });
    }
}

static async createRating(req, res) {

    try {
        console.log(req.body);


        await RatingService.createRating(req.body);

        return res.redirect(
            buildRedirectPath(
                "/views/ratings",
                "Rating created successfully."
            )
        );

    } catch (err) {

        return res.redirect(
            buildRedirectPath(
                "/views/ratings",
                err.message,
                "error"
            )
        );
    }
}

static async updateRating(req, res) {

    try {

        await RatingService.updateRating({
            id: req.params.id,
            ...req.body
        });

        return res.redirect(
            buildRedirectPath(
                "/views/ratings",
                "Rating updated successfully."
            )
        );

    } catch (err) {

        return res.redirect(
            buildRedirectPath(
                "/views/ratings",
                err.message,
                "error"
            )
        );
    }
}

static async deleteRating(req, res) {

    try {

        await RatingService.deleteRating(req.params.id);

        return res.redirect(
            buildRedirectPath(
                "/views/ratings",
                "Rating deleted successfully."
            )
        );

    } catch (err) {

        return res.redirect(
            buildRedirectPath(
                "/views/ratings",
                err.message,
                "error"
            )
        );
    }
}

//🔹 SUBSCRIPTIONS
static async renderSubscriptions(req, res) {

    try {

        const subscriptions = await SubscriptionService.getAllSubscriptions();

        return res.render("subscriptions", {
            title: "Subscriptions View",
            subscriptions,
            error: null,
            ...buildFeedbackState(req),
        });

    } catch (err) {

        return res.render("subscriptions", {
            title: "Subscriptions View",
            subscriptions: [],
            error: err.message,
            ...buildFeedbackState(req),
        });
    }
}

    static async createSubscription(req, res) {

    try {

        await SubscriptionService.createSubscription(req.body);

        return res.redirect("/views/subscriptions");

    } catch (err) {

        return res.send(err.message);
    }
}


    static async deleteSubscription(req, res) {

    try {

        await SubscriptionService.deleteSubscription(
            req.params.subscription_id
        );

        return res.redirect("/views/subscriptions");

    } catch (err) {

        return res.send(err.message);
    }
}

}



module.exports = ViewController;