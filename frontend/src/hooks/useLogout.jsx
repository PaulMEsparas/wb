import useAuthContext from "./useAuthContext";
import useWorkoutsContext from "./useWorkoutsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { workouts, dispatch: workoutsDispatch } = useWorkoutsContext();
  //remove from localstorage
  const logout = () => {
    localStorage.removeItem("user");

    //dispatch action to log out user
    dispatch({ type: "LOGOUT" });

    //dispatch action to clear the workout state
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };
  return { logout };
};
