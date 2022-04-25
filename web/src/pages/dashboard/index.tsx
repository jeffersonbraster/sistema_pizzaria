import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Header from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Painel - JejePizza</title>
      </Head>
      <div>
        <Header />
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
