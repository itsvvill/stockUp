import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { AuthContext } from '../context/AuthContext';

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
};
