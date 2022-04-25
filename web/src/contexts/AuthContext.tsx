import { createContext, ReactNode, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import Router from "next/router";
import { api } from "../services/apiClient";
import { toast } from "react-toastify";

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn(credentials: SignInProps): Promise<void>;
  signUp: (credentials: SignUpProps) => void;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
};

export const signOut = () => {
  try {
    destroyCookie(undefined, "@jejepizza.token");
    Router.push("/");
  } catch (error) {
    alert("Erro inesperado ao deslogar, contate um administrador do sistema.");
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "@jejepizza.token": token } = parseCookies();

    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { id, name, email } = response.data;
          setUser({
            id,
            name,
            email,
          });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  const signIn = async ({ email, password }: SignInProps) => {
    try {
      const response = await api.post("/session", { email, password });

      const { id, name, token } = response.data;

      setCookie(undefined, "@jejepizza.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setUser({ id, name, email });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      toast.success("Bem vindo ao Jejepizza!");

      Router.push("/dashboard");
    } catch (error) {
      toast.error("Ocorreu algum erro ao acessar.");
      console.log("Motivo do error: ", error);
    }
  };

  const signUp = async ({ name, email, password }: SignUpProps) => {
    try {
      await api.post("/users", { name, email, password });

      toast.success("Cadastro realizado com sucesso, faça seu login.");

      Router.push("/");
    } catch (error) {
      toast.error("Ocorreu algum erro ao cadastrar, verifique seus dados.");
      console.log(`Error ao cadastrar ${error}, procure um administrador.`);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
