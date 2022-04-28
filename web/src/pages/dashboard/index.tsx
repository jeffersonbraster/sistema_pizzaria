import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Header from "../../components/Header";
import { FiRefreshCcw } from "react-icons/fi";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from "./styles.module.scss";

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Painel - JejePizza</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Últimos pedidos</h1>
            <button>
              <FiRefreshCcw color="#3fffa3" size={25} />
            </button>
          </div>

          <article className={styles.listOrder}>
            <section className={styles.orderItem}>
              <button>
                <div className={styles.tag}></div>
                <span>Mesa 30</span>
              </button>
            </section>
          </article>
        </main>
      </div>
    </>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = canSSRAuth(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
