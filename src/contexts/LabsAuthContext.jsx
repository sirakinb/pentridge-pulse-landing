import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { labsInsforge } from '../lib/labsInsforge';

const LabsAuthContext = createContext({ user: null, loading: true, refresh: async () => {}, signOut: async () => {} });

export function LabsAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const { data, error } = await labsInsforge.auth.getCurrentUser();
    setUser(error ? null : (data?.user ?? null));
    setLoading(false);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await labsInsforge.auth.getCurrentUser();
      if (cancelled) return;
      setUser(error ? null : (data?.user ?? null));
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  const signOut = useCallback(async () => {
    await labsInsforge.auth.signOut();
    setUser(null);
  }, []);

  return (
    <LabsAuthContext.Provider value={{ user, loading, refresh, signOut }}>
      {children}
    </LabsAuthContext.Provider>
  );
}

export function useLabsAuth() {
  return useContext(LabsAuthContext);
}
