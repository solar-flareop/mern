const router = require("express").Router();
const {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

router.get("/", getAllWorkouts);

router.get("/:id", getWorkoutById);

router.post("/", createWorkout);

router.patch("/:id", updateWorkout);

router.delete("/:id", deleteWorkout);

module.exports = router;
