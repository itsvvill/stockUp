import { useState } from 'react';
import { projectAuth } from '../firebase/config';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const signUp = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      //signup user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(res.user);

      if (!res) {
        throw new Error('Could not complete signup');
      }

      // add display name to user
      await res.user.updateProfile({ displayName });

      setIsPending(false);
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err.message);
      setIsPending(false);
    }
  };

  return { error, isPending, signUp };
};
