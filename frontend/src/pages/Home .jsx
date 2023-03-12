import axios from "axios";
import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  //for sending token
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const { data } = await axios.get("http://localhost:5000/api/workouts/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch({ type: "SET_WORKOUTS", payload: data });
    };
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
