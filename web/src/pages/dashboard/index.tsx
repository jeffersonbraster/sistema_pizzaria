import { useState } from "react";
import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import Header from "../../components/Header";
import { FiRefreshCcw } from "react-icons/fi";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupApiClient } from "../../services/api";
import Modal from "react-modal";
import styles from "./styles.module.scss";
import ModalOrder from "../../components/ModalOrder";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  banner: string;
};

type Order = {
  id: string;
  table: string | number;
  status: boolean;
  name: string | null;
};

export type OrderTypeProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: Product;
  order: Order;
};

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

  const [modalItem, setModalItem] = useState<OrderTypeProps[]>();
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalOrder = async (id: string) => {
    const apiClient = setupApiClient();

    const response = await apiClient.get("/order/detail", {
      params: {
        order_id: id,
      },
    });

    setModalItem(response.data);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  Modal.setAppElement("#__next");

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

        {modalVisible && <ModalOrder />}
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
