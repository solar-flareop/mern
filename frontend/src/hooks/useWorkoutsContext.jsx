import { WorkoutContext } from "../context/workoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw Error("useWorkoutsContext should be used in WorkoutContextProvier");
  }
  return context;
};
