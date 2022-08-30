import { useState } from 'react';
import { projectAuth } from '../firebase/config';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const signup = (async = (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      //signup user
      await projectAuth.createUserWithEmailAndPassword(email, password)
      console.log(res.user)
    } catch (err) {
      console.log(err);
      setError(err.message);
      setIsPending(false);
    }
  });

  return { error, isPending, signup };
};
