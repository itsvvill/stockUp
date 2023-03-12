import { useState, useEffect } from 'react';
import { projectAuth, googleAuth, facebookAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signUp = async (email, password, displayName, type) => {
    setError(null);
    setIsPending(true);
    // main signup button
    console.log(email, password, displayName, type);
    if (type === 'Signup') {
      try {
        //signup user
        const res = await projectAuth.createUserWithEmailAndPassword(
          email,
          password
        );

        if (!res) {
          throw new Error('Could not complete signup');
        }

        // add display name to user
        await res.user.updateProfile({ displayName });

        // dispatch login action
        dispatch({ type: 'LOGIN', payload: res.user });

        // update state
        if (!isCancelled) {
          setIsPending(false);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          console.log(err);
          setError(err);
          setIsPending(false);
        }
      }
      // Guest user login
    } else if (type === 'guest') {
      try {
        //log the user in
        const res = await projectAuth.signInAnonymously();
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
      // Google OAuth signup
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

  return { error, isPending, signUp };
};
