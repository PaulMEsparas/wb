import useAuthContext from "./useAuthContext";
import { useState } from "react";

import { apiUrl } from "../../config";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signUp = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${apiUrl}/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      //update the user
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };
  return { signUp, error, isloading };
};
