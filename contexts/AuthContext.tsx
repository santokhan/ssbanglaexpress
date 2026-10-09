'use client'

import { createContext, type Dispatch, type SetStateAction } from "react";

export type AuthUser = { name?: string; email?: string; image?: string | null; picture?: string | null };
export type AuthContextValue = {
  user: AuthUser | null;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export default AuthContext;
