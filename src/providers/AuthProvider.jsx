/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const userRegister = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userLogout = () => {
    setLoading(true);
    return signOut(auth);
  };
  const updateUserProfile = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      console.log("CurrentUser-->", currentUser);
      if (currentUser?.email) {
        // get token and store at local storage of client
        const userInfo = { email: currentUser.email };
        const res = await axiosPublic.post("/jwt", userInfo);
        // console.log(res);
        if (res.data.token) {
          localStorage.setItem("access-token", res.data.token);
          setLoading(false);
        }
      } else {
        // remove token from local storage
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);

  const userInfo = {
    user,
    setUser,
    loading,
    userRegister,
    userLogin,
    userLogout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

// Custom Hook to Use AuthContext
export const useAuthContext = () => useContext(AuthContext);
