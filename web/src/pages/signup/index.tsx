import Head from "next/head";
import styles from "../../styles/home.module.scss";
import logoImg from "../../../public/logo.svg";
import Image from "next/image";
import { Input } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Signup() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    if (name === "" || email === "" || password === "") {
      alert("Preencha todos os campos.");
      return;
    }
    setLoading(true);

    let data = {
      name,
      email,
      password,
    };

    await signUp(data);

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>JejePizza - Cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo jeje-pizza" />

        <div className={styles.login}>
          <h1>Criando sua conta</h1>

          <form onSubmit={handleSignUp}>
            <Input
              placeholder="Digite seu nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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

            <Button type="submit" loading={loading}>
              Cadastrar
            </Button>
          </form>

          <Link href="/">
            <a className={styles.text}>Já possui uma conta? Faça o login!</a>
          </Link>
        </div>
      </div>
    </>
  );
}
