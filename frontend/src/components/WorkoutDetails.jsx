import axios from "axios";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// date fns
// import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    const { data } = await axios.delete(
      `http://localhost:5000/api/workouts/${workout._id}`
    );
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
      <p>{workout.createdAt}</p>
      <p>{workout._id}</p>
      <span onClick={handleClick}>Delete</span>
      {/* <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p> */}
      {/* <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span> */}
    </div>
  );
};

export default WorkoutDetails;
