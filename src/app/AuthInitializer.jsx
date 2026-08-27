import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getCurrentUser } from "../services/authService";

import {
  initializeAuth,
  setCurrentUser,
  authInitializationComplete,
} from "../redux/store/authSlice";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuthentication = async () => {
      dispatch(initializeAuth());

      try {
        const response = await getCurrentUser();

        dispatch(
          setCurrentUser(response.data.user)
        );
      } catch (error) {
        dispatch(authInitializationComplete());
      }
    };

    initializeAuthentication();
  }, [dispatch]);

  return children;
};

export default AuthInitializer;