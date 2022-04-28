import { FiX } from "react-icons/fi";
import Modal from "react-modal";
import styles from "./styles.module.scss";

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

type OrderTypeProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: Product;
  order: Order;
};

type ModalOrderProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  order: OrderTypeProps[];
};

const ModalOrder = ({ isOpen, onRequestClose, order }: ModalOrderProps) => {
  const customStyles = {
    content: {
      top: "50%",
      bottom: "auto",
      left: "50%",
      right: "auto",
      padding: "30px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#1d1d2e",
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
        style={{ background: "transparent", border: 0 }}
      >
        <FiX size={40} color="#f34748" />
      </button>

      <div className={styles.container}>
        <h2>Detalhes do pedido</h2>
        <span className={styles.table}>
          Mesa: <strong>{order[0].order.table}</strong>
        </span>

        {order.map((item) => (
          <section key={item.id} className={styles.containerItem}>
            <span>
              {item.amount} - <strong>{item.product.name}</strong>
            </span>
            <span className={styles.description}>
              {item.product.description}
            </span>
          </section>
        ))}
      </div>
    </Modal>
  );
};

export default ModalOrder;
