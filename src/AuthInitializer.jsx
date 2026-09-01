import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  initializeAuth,
  setCurrentUser,
  authInitializationComplete,
} from "../../redux/store/authSlice";

import { getCurrentUser } from "../../services/authService";
import Loader from "./components/common/Loader";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  const { isInitialized } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isInitialized) {
      return;
    }

    const initialize = async () => {
      dispatch(initializeAuth());

      try {
        const response = await getCurrentUser();

        const user = response.data?.user;

        if (user) {
          dispatch(setCurrentUser(user));
        } else {
          dispatch(authInitializationComplete());
        }
      } catch (error) {
        dispatch(authInitializationComplete());
      }
    };

    initialize();
  }, [dispatch, isInitialized]);

  /*
   * VERY IMPORTANT:
   *
   * Do not render the application until
   * authentication initialization is complete.
   */
  if (!isInitialized) {
    return (
      <Loader fullScreen/>
    );
  }

  return children;
};

export default AuthInitializer;