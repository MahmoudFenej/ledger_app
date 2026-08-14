import { useState, useEffect } from 'react';

// In-memory global state
let globalState = {
  isAuthenticated: false,
};

// Simple subscriber registry
const subscribers = new Set();

export const setSharedState = (newState) => {
  globalState = { ...globalState, ...newState };
  subscribers.forEach((cb) => cb(globalState));
};

export const getSharedState = () => globalState;

export const useSharedState = () => {
  const [sharedState, setLocalState] = useState(globalState);

  useEffect(() => {
    subscribers.add(setLocalState);
    return () => {
      subscribers.delete(setLocalState);
    };
  }, []);

  return [sharedState, setSharedState];
};
