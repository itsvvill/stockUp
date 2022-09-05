import { useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    //sign the user out
    try {
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };
};
