import { useState, useEffect } from 'react';
// import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useDeleteUser = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const { user } = useAuthContext();

  const deleteUser = async () => {
    setError(null);
    setIsPending(true);

    //delete the user out
    try {
      await user.delete();

      //dispatch logout action
      dispatch({ type: 'DELETE_USER' });

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

  return { deleteUser, error, isPending };
};
