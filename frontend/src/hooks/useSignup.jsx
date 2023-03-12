import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { toast } from "react-toastify";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setError(null);
    setisLoading(true);

    const response = await fetch("http://localhost:5000/api/user/signup", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.errorMsg);
      setisLoading(false);
    }
    if (response.ok) {
      //save user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      //updateing authContext
      dispatch({ type: "LOGIN", payload: json });
      setisLoading(false);

      //tostify
      toast.success("Signed-Up successfully!");
    }
  };
  return { signup, error, isLoading };
};
