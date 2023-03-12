import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { toast } from "react-toastify";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutDispatch } = useWorkoutsContext();

  const logout = () => {
    //clear localstorage
    localStorage.clear("user");

    //dispatch logout
    dispatch({ type: "LOGOUT" });

    workoutDispatch({ type: "SET_WORKOUTS", payload: null });

    //tostify
    toast.success("Logged out successfully!");
  };
  return { logout };
};
