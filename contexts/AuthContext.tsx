'use client'

import { createContext, type Dispatch, type SetStateAction } from "react";

export type AuthUser = { id?: string; name?: string; email?: string; avatarUrl?: string | null; role?: string; isAdmin?: boolean };
export type AuthContextValue = {
  user: AuthUser | null;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export default AuthContext;
