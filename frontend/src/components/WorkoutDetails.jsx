import { toast } from "react-toastify";
import axios from "axios";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      setError("You must be logged in");
      return;
    }
    const { data } = await axios.delete(
      `http://localhost:5000/api/workouts/${workout._id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    toast.success("Task deleted successfully!");
    dispatch({ type: "DELETE_WORKOUT", payload: data });
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workout.reps}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        Delete
      </span>

      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
    </div>
  );
};

export default WorkoutDetails;
