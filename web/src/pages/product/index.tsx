/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Header from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { FiUpload } from "react-icons/fi";
import styles from "./styles.module.scss";
import { ChangeEvent, useState } from "react";

const Product: NextPage = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === "image/jpeg" || image.type === "image/png") {
      setAvatarFile(image);
      setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <>
      <Head>
        <title>Novo produto - JejePizza</title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>
          <h1>Novo produto</h1>

          <form className={styles.form}>
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={25} color="#fff" />
              </span>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFile}
              />

              {avatarUrl && (
                <img
                  className={styles.preview}
                  src={avatarUrl}
                  alt="produto"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <select name="" id="">
              <option value="">Bebida</option>
            </select>

            <input
              className={styles.input}
              type="text"
              placeholder="Digite o nome do produto"
            />

            <input
              className={styles.input}
              type="text"
              placeholder="Digite o preço do produto"
            />

            <textarea
              className={styles.input}
              name=""
              id=""
              placeholder="Descreva seu produto..."
            />

            <button className={styles.button} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
};

export default Product;

export const getServerSideProps: GetServerSideProps = canSSRAuth(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
