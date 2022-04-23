import { createContext, ReactNode, useState } from "react";
import { destroyCookie } from "nookies";
import Router from "next/router";

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn(credentials: SignInProps): Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
};

export const signOut = () => {
  try {
    destroyCookie(undefined, "@jejepizza");
    Router.push("/");
  } catch (error) {
    alert("Erro inesperado ao deslogar, contate um administrador do sistema.");
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  const signIn = async ({ email, password }: SignInProps) => {};

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
