import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCurrentUser } from "../services/authService";

import {
  initializeAuth,
  setCurrentUser,
  authInitializationComplete,
} from "../redux/store/authSlice";

import Loader from "../components/common/Loader";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  const { isInitialized } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isInitialized) {
      return;
    }

    const initializeAuthentication = async () => {
      dispatch(initializeAuth());

      try {
        const response = await getCurrentUser();

        console.log("ME RESPONSE:", response);

        const currentUser = response.data?.user;

        console.log("CURRENT USER FROM ME:", currentUser);

        if (currentUser) {
          dispatch(setCurrentUser(currentUser));
        } else {
          dispatch(authInitializationComplete());
        }
      } catch (error) {
        console.error(
          "Auth initialization failed:",
          error.response?.data || error,
        );

        dispatch(authInitializationComplete());
      }
    };

    initializeAuthentication();
  }, [dispatch, isInitialized]);

  if (!isInitialized) {
    return <Loader fullScreen/>;
  }

  return children;
};

export default AuthInitializer;
