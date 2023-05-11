import React, { useState, useEffect } from "react";
import { Modal } from "@mantine/core";
import axiosConfig from "../../axiosConfig";

const SubscriptionModal = ({ isOpen, onClose }) => {
  const [days, setDays] = useState(30);
  const [fee, setFee] = useState(0);

  useEffect(() => {
    setFee(days * 1); // Set fee to $1 per day
  }, [days]);

  const handleDaysChange = (event) => {
    setDays(Number(event.target.value));
  };

  const handleSubscription = async () => {
    try {
      const response = await axiosConfig.post("/subscribe", { days });
      alert(response.data.message);
      onClose();
    } catch (err) {
      console.error(err);
      alert(
        "An error occurred while processing your subscription. Please try again later."
      );
    }
  };

  return (
    <Modal
      title="Subscribe"
      opened={isOpen}
      onClose={onClose}
      closeButtonLabel="Close"
      actions={[
        { type: "button", label: "Cancel", onClick: onClose },
        { type: "submit", label: "Subscribe", onClick: handleSubscription },
      ]}
    >
      <p>Select number of days:</p>
      <input type="number" value={days} onChange={handleDaysChange} />
      <p>Fee: ${fee}</p>
    </Modal>
  );
};

export default SubscriptionModal;
