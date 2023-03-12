const Workout = require("../models/workout");
const mongoose = require("mongoose");

const getAllWorkouts = async (req, res) => {
  try {
    const user_id = req.user._id;
    const allWorkouts = await Workout.find({ user_id }).sort({ updatedAt: -1 });
    res.status(200).json(allWorkouts);
  } catch (error) {
    res.status(404).json({ errorMsg: error.message });
  }
};

const getWorkoutById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ errorMsg: "Invalid userid" });
  }
  try {
    const getWorkout = await Workout.findById(id);
    if (!getWorkout) {
      return res.status(404).json({ errorMsg: "No such workout" });
    }
    res.status(200).json(getWorkout);
  } catch (error) {
    res.status(404).json({ errorMsg: error.message });
  }
};

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  //error handling for frontend
  let emptyFields = [];
  if (!title) emptyFields.push("title");
  if (!reps) emptyFields.push("reps");
  if (!load) emptyFields.push("load");
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ errorMsg: "All fields are required", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, reps, load, user_id });
    res.status(201).json(workout);
  } catch (error) {
    res.status(404).json({ errorMsg: error.message });
  }
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ errorMsg: "Invalid userid" });
  }
  try {
    const workout = await Workout.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!workout) {
      return res.status(404).json({ errorMsg: "No such workout" });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(404).json({ errorMsg: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ errorMsg: "Invalid userid" });
  }
  try {
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ errorMsg: "No such workout" });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(404).json({ errorMsg: error.message });
  }
};

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
