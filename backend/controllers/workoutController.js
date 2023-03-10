const Workout = require("../models/workout");
const mongoose = require("mongoose");

const getAllWorkouts = async (req, res) => {
  try {
    const allWorkouts = await Workout.find({}).sort({ updatedAt: -1 });
    res.status(200).json(allWorkouts);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const getWorkoutById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Invalid userid" });
  }
  try {
    const getWorkout = await Workout.findById(id);
    if (!getWorkout) {
      return res.status(404).json({ msg: "No such workout" });
    }
    res.status(200).json(getWorkout);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(201).json(workout);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Invalid userid" });
  }
  try {
    const workout = await Workout.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!workout) {
      return res.status(404).json({ msg: "No such workout" });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Invalid userid" });
  }
  try {
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ msg: "No such workout" });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
