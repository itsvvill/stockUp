import { useState, useEffect } from 'react';
import { projectAuth, googleAuth, facebookAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = (type) => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email = '', password = '', type) => {
    setError(null);
    setIsPending(true);
    // main login button
    if (type === 'Login') {
      try {
        //log the user in
        const res = await projectAuth.signInWithEmailAndPassword(
          email,
          password
        );
        // dispatch login action
        dispatch({ type: 'LOGIN', payload: res.user });

        // update state
        if (!isCancelled) {
          setIsPending(false);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err);
          setIsPending(false);
        }
      }
      // Google OAuth login
    } else if (type === 'Google') {
      try {
        setError(null);
        setIsPending(true);
        //log the user in
        const res = await projectAuth.signInWithPopup(googleAuth);
        // dispatch login action
        dispatch({ type: 'LOGIN', payload: res.user });
        // update state
        if (!isCancelled) {
          setIsPending(false);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          console.log(err.message);
          setError(err);
          setIsPending(false);
        }
      }
      // Facebook OAuth login
    } else if (type === 'Facebook') {
      try {
        setError(null);
        setIsPending(true);
        //log the user in
        const res = await projectAuth.signInWithPopup(facebookAuth);
        // dispatch login action
        dispatch({ type: 'LOGIN', payload: res.user });
        // update state
        if (!isCancelled) {
          setIsPending(false);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          console.log(err.message);
          setError(err);
          setIsPending(false);
        }
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { login, error, isPending };
};
