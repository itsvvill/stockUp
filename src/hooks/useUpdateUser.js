import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
// import { projectAuth } from '../config';

export const useUpdateUser = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const { user } = useAuthContext();

  const updateUser = async (userName) => {
    setError(null);
    setIsPending(true);

    //delete the user
    try {
      await user.updateProfile({
        displayName: userName,
      });

      //dispatch update action
      dispatch({ type: 'UPDATE_USER' });

      // update state
      if (!isCancelled) {
        // const credential = projectAuth.EmailAuthProvider.credential(
        //   user.email,
        //   user.ProvidedPassword
        // );
        // // Now you can use that to reauthenticate
        // user.reauthenticateWithCredential(credential);
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { updateUser, error, isPending };
};
