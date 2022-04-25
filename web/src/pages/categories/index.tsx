import { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useState } from "react";
import Header from "../../components/Header";
import styles from "./styles.module.scss";

const Categories: NextPage = () => {
  const [name, setName] = useState("");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Head>
        <title>Nova Categoria - Jejepizza</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Cadastrar nova categoria</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Nome da categoria"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
};

export default Categories;
