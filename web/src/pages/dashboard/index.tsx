import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Header from "../../components/Header";
import { FiRefreshCcw } from "react-icons/fi";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from "./styles.module.scss";
import { setupApiClient } from "../../services/api";
import { useState } from "react";

type OrderItem = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
};

type HomeProps = {
  orders: OrderItem[];
};

const Dashboard: NextPage = ({ orders }: HomeProps) => {
  const [orderList, setOrderList] = useState(orders || []);

  const handleModalOrder = (id: string) => {};

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
            {orderList.map((order) => (
              <section key={order.id} className={styles.orderItem}>
                <button onClick={() => handleModalOrder(order.id)}>
                  <div className={styles.tag}></div>
                  <span>{order.table}</span>
                </button>
              </section>
            ))}
          </article>
        </main>
      </div>
    </>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = canSSRAuth(
  async (ctx) => {
    const apiClient = setupApiClient(ctx);

    const response = await apiClient.get("/orders");

    return {
      props: {
        orders: response.data,
      },
    };
  }
);
