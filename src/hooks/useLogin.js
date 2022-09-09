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
  };
};
