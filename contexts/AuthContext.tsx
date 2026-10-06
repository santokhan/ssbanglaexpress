'use client'

import { createContext, type Dispatch, type SetStateAction } from "react";

export type AuthUser = { name?: string; username?: string; email?: string };
export type AuthContextValue = {
  user: AuthUser | null;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export default AuthContext;
