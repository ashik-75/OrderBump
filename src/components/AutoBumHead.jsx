import { Card } from "@shopify/polaris";
import React from "react";
import styles from "../styles/AutoBump.module.css";

const AutoBumHead = () => {
  return (
    <Card title="What are Auto Bumps?" sectioned>
      <div className={styles.headMain}>
        <p>
          Auto Bumps are automatically generated upsell and cross-sell offers
          that the OrderBump app creates based on store sales and product data.
          Using Shopify’s Product Recommendations API, turning on Auto Bumps
          mode will allow the app to detect what customers have in their carts
          and dynamically offer the ideal complementary product, in checkout or
          post-purchase, optimizing your chances of a successful bump.
        </p>
        <img
          src="https://images.unsplash.com/photo-1633409361618-c73427e4e206?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aWNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
      </div>
    </Card>
  );
};

export default AutoBumHead;
