import { FormEvent, useContext, useState } from "react";
import Head from "next/head";
import styles from "../styles/home.module.scss";
import logoImg from "../../public/logo.svg";
import Image from "next/image";
import { Input } from "../components/ui/Input";
import Button from "../components/ui/Button";
import Link from "next/link";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    let data = {
      email,
      password,
    };

    await signIn(data);
  };

  return (
    <>
      <Head>
        <title>JejePizza - Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo jeje-pizza" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu E-mail"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" loading={false}>
              Entrar
            </Button>
          </form>

          <Link href="/signup">
            <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
          </Link>
        </div>
      </div>
    </>
  );
}
