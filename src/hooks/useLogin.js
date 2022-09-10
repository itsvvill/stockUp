import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { AuthContext } from '../context/AuthContext';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async () => {
    setError(null);
    setIsPending(true);

    //log the user in
    try {
      await // dispatch login action
      dispatch({ type: 'LOGIN' });

      // update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };
  useEffect =
    (() => {
      return () => setIsCancelled(true);
    },
    []);
  return { login, error, isPending };
};
