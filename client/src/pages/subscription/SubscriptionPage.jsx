import React, { useEffect, useState } from "react";
import { Card, Button } from "@mantine/core";
import axiosConfig from "../../axiosConfig";
import { useSelector } from "react-redux";

function SubscriptionCard({ days, name, discountPercentage }) {
  const unitPrice = getUnitPrice(days);
  const finalPrice = unitPrice * (days / 30) * (1 - discountPercentage / 100);

  async function handleClick() {
    const item = {
      ItemId: days,
      ItemName: name,
      UnitPrice: finalPrice,
      Quantity: 1,
    };
    try {
      const response = await axiosConfig.post("/subscribe", item);
      if (response.data) {
        window.location = response.data.redirectUrl;
        console.log(response.data);
      }
    } catch (err) {
      console.error(err);
      alert(
        "An error occurred while processing your subscription. Please try again later."
      );
    }
  }

  function getUnitPrice(days) {
    switch (days) {
      case 30:
      case 180:
      case 366:
        return 100;
      default:
        return 1;
    }
  }

  return (
    <Card shadow="sm" padding="md">
      <h3>{days}-Day Subscription</h3>
      <p>Price: {finalPrice.toFixed(2)} Birr</p>
      <p>Discount: {discountPercentage}% Birr</p>
      <Button variant="outline" onClick={handleClick}>
        Subscribe
      </Button>
    </Card>
  );
}
function SubscriptionPage() {
  const { role, firstName, profilePicture, subscription } = useSelector(
    (state) => state.user
  );
  console.log(subscription);
  const { status, endDate, startDate } = subscription ?? {};
  const isActive = status === "active";
  const daysLeft = Math.ceil(
    (new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24)
  );
  return (
    <>
      {isActive ? (
        <p>Your subscription is currently active.</p>
      ) : (
        <p>Your subscription has expired.</p>
      )}

      {isActive && <p>You have {daysLeft} days left in your subscription.</p>}

      <div>
        <SubscriptionCard
          days={30}
          name="Monthly Subscription"
          discountPercentage={0}
        />
        <SubscriptionCard
          days={180}
          name="6 Month Subscription"
          discountPercentage={10}
        />
        <SubscriptionCard
          days={366}
          name="Yearly Subscription"
          discountPercentage={20}
        />
      </div>
    </>
  );
}

export default SubscriptionPage;
