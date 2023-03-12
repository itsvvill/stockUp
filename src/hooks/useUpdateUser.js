import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';

export const useUpdateUser = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const { user } = useAuthContext();

  const updateUser = async (userName, userPassword) => {
    setError(null);
    setIsPending(true);

    try {
      await user.updateProfile({
        displayName: userName,
      });
      //dispatch update action
      dispatch({ type: 'UPDATE_USER' });
      // update state
      if (!isCancelled) {
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
