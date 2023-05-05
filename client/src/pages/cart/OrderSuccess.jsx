import { Modal, CloseButton } from "@mantine/core";
import { useState } from "react";

function OrderSuccess(props) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal opened={isOpen} onClose={handleClose}>
      <div>
        <CloseButton onClick={handleClose} />
        <p>Order successful!</p>
        <p>Ticket number: {props.ticketNumber}</p>
        <p>Payment handler: {props.paymentHandler}</p>
      </div>
    </Modal>
  );
}
//the code

export default OrderSuccess;
