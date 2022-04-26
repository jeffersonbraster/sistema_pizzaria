/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Header from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { FiUpload } from "react-icons/fi";
import styles from "./styles.module.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import { setupApiClient } from "../../services/api";
import { toast } from "react-toastify";

type ItemProps = {
  id: string;
  name: string;
};

type CategoryProps = {
  categoryList: ItemProps[];
};

const Product: NextPage = ({ categoryList }: CategoryProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);

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

  const handleChangeCategory = (e) => {
    console.log(categories[categorySelected].id);
    setCategorySelected(e.target.value);
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();

      if (
        name === "" ||
        price === "" ||
        description === "" ||
        avatarFile === null
      ) {
        toast.error("Preencha todos os campos");
        return;
      }

      data.append("name", name);
      data.append("price", price);
      data.append("description", description);
      data.append("category_id", categories[categorySelected].id);
      data.append("file", avatarFile);

      const apiCliente = setupApiClient();

      await apiCliente.post("/product", data);

      toast.success("Produto cadastrado com sucesso.");
    } catch (err) {
      console.log(err);
      toast.error(
        "Erro ao cadastrar produto, contate o administrador do sistema."
      );
    }

    setName("");
    setPrice("");
    setDescription("");
    setAvatarFile(null);
    setAvatarUrl("");
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

          <form className={styles.form} onSubmit={handleRegister}>
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

            <select value={categorySelected} onChange={handleChangeCategory}>
              {categories.map((category, index) => {
                return (
                  <option key={category.id} value={index}>
                    {category.name}
                  </option>
                );
              })}
            </select>

            <input
              className={styles.input}
              type="text"
              placeholder="Digite o nome do produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className={styles.input}
              type="text"
              placeholder="Digite o preço do produto"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <textarea
              className={styles.input}
              name=""
              id=""
              placeholder="Descreva seu produto..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
    const apiClient = setupApiClient(ctx);

    const response = await apiClient.get("/category");

    return {
      props: {
        categoryList: response.data,
      },
    };
  }
);
