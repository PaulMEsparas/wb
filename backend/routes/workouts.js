const express = require("express");
const requireAuth = require("../middleware/requireAuth");

// const Workout = require("../models/workoutModel");
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  updateworkout,
  deleteworkout,
} = require("../controllers/workoutController");

const router = express.Router();

//register the requireAuthMiddleware, require auth for all routes
router.use(requireAuth);

//Get all workouts
router.get("/", getWorkouts);

//Get a single workout
router.get("/:id", getWorkout);

//Post a new workout
router.post("/", createWorkout);

//Delete a new workout
router.delete("/:id", deleteworkout);

//Update a new workout
router.patch("/:id", updateworkout);

module.exports = router;
