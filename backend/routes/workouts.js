const router = require("express").Router();
const {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");

router.get("/", getAllWorkouts);

router.get("/:id", getWorkoutById);

router.post("/", createWorkout);

router.patch("/:id", updateWorkout);

router.delete("/:id", deleteWorkout);

module.exports = router;
