import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./styles.module.scss";

const Header = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href="/dashboard" passHref>
          <Image
            src="/logo.svg"
            alt="logo com o nome jejepizza"
            width={190}
            height={60}
          />
        </Link>

        <nav>
          <Link href="/category">
            <a>Categoria</a>
          </Link>

          <Link href="/products">
            <a>Cardapio</a>
          </Link>

          <button onClick={signOut}>
            <FiLogOut color="#fff" size={22} />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
