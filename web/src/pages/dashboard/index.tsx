import { GetServerSideProps } from "next";
import Head from "next/head";
import Header from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Dashboard() {
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
}

export const getServerSideProps: GetServerSideProps = canSSRAuth(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
