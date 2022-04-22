import Head from "next/head";
import styles from "../styles/home.module.scss";
import logoImg from "../../public/logo.svg";
import Image from "next/image";
import { Input } from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Home() {
  return (
    <>
      <Head>
        <title>JejePizza - Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo jeje-pizza" />

        <div className={styles.login}>
          <form>
            <Input placeholder="Digite seu E-mail" type="text" />

            <Input placeholder="Digite sua senha" type="password" />

            <Button type="submit" loading={true}>
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
