import { createContext, useReducer, useEffect } from "react";

export const authContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return state;
  }
};
export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  //for initial load when refreshed
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  // console.log("authcontext state", state);
  return (
    <authContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </authContext.Provider>
  );
};
