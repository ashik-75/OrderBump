import {
  Button,
  ButtonGroup,
  Card,
  FooterHelp,
  Heading,
  Layout,
  Link,
  Page,
  TextContainer,
} from "@shopify/polaris";
import React from "react";

const Support = () => {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <TextContainer>
              <Heading>Getting Started with OrderBump!</Heading>
              <p>
                Order Bump is a sales-driving app for Shopify that lets you
                up-sell and cross-sell products in your store’s checkout
                (Shopify Plus merchants only!) and post-purchase to increase AOV
                and store revenue.
              </p>
              <ButtonGroup>
                <Button>Cancel</Button>
                <Button plain>Visit the website</Button>
              </ButtonGroup>
            </TextContainer>
          </Card>
        </Layout.Section>
        <Layout.AnnotatedSection id="storeDetails" title="Getting started!">
          <Card sectioned>
            <TextContainer>
              <Heading>Can I use the app if I’m on Shopify Plus?</Heading>
              <p>
                Yes! Shopify Plus merchants have access to both our
                post-purchase and checkout bump customizations. Shopify
                merchants can currently only use the post-purchase bump.
              </p>
            </TextContainer>
          </Card>
          <Card sectioned>
            <TextContainer>
              <Heading>How do I install the app?</Heading>
              <p>
                Order Bump is now listed in the Shopify app marketplace! Just
                follow this link, and click on ‘Add App’ to get started. If
                you’re a Shopify Plus merchant and want to use the checkout bump
                feature, follow this link and review the instructions to add two
                simple lines of code to your checkout.liquid file before you can
                start selling in checkout.
              </p>
            </TextContainer>
          </Card>
          <Card sectioned>
            <TextContainer>
              <Heading>
                How do I install the pre-purchase (checkout) widget code?
              </Heading>
              <p>
                Follow this link and review the instructions to add two simple
                lines of code to your checkout.liquid file.
              </p>
            </TextContainer>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection id="storeDetails" title="Bumps">
          <Card sectioned>
            <TextContainer>
              <Heading>What are bumps?</Heading>
              <p>
                Bumps are up-sell or cross-sell relationships you set up between
                products in your customers’ orders and promotional products you
                offer them pre-purchase (checkout) or post-purchase. Bumps can
                be as basic as offering the same promotional product to all
                customers regardless of what products they have in their orders,
                or as specific as certain product types, categories,
                collections, etc. triggering different promotional product
                offers.
              </p>
            </TextContainer>
          </Card>
          <Card sectioned>
            <TextContainer>
              <Heading>
                What’s the difference between pre-purchase and post-purchase
                bumps?
              </Heading>
              <p>
                Pre-purchase bumps refers to promotional offers that appear on
                the checkout page of your store; these offers appear in a
                discrete but well-optimized widget near the top of the page.
                Post-purchase bumps are promotional offers that get presented to
                customers after they’ve completed checkout but before they
                proceed to the order status page.
              </p>
            </TextContainer>
          </Card>
          <Card sectioned>
            <TextContainer>
              <Heading>Do pre-purchase bumps mean in-cart upsells?</Heading>
              <p>
                No, pre-purchase bumps refer to promotional offers that get
                presented in the checkout step of a customer’s shopping journey.
                While we do not currently offer in-cart upsells, we believe that
                Order Bump bumps can complement in-cart (and other) up-selling
                and cross-selling tactics you may be considering for your store.
                Consider how a travel booking website like Expedia.com might try
                selling customers different offers at various points throughout
                a shopping journey, e.g. a seat upgrade at one step, a car &
                hotel deal at another, and insurance before you complete your
                transaction. You can use tools like Order Bump and other
                cross-selling/up-selling apps as part of your overall sales and
                merchandising strategy to really hone in on maximizing your
                revenue.
              </p>
            </TextContainer>
          </Card>
          <Card sectioned>
            <TextContainer>
              <Heading>What are conditions?</Heading>
              <p>
                Conditions are specific criteria that you can set for each of
                the manual bumps that will determine when your promotional
                product will be shown to customers. It’s a great way to
                personalize your bump offers to create ideal product pairings,
                offer a better customer experience with your brand and products,
                and increase your chances of a successful promotional product
                conversion.
              </p>
            </TextContainer>
          </Card>
          <Card sectioned>
            <TextContainer>
              <Heading>How do conditions work?</Heading>
              <p style={{ whiteSpace: "pre-line" }}>
                Conditions allow you to create a focused bump based on criteria
                that your customers’ orders must meet. Conditions can be set
                based on the following values:
                <br />
                <p>Product Title: </p>
                <p>Product Type:</p>
                <p>Product Vendor:</p>
                <p>Product Tag:</p>
                <p>Product Price:</p>
                <p>Variant Title:</p>
                <p>Variant SKU:</p>
                <br />
                <p>and the following operators:</p>
                <p>- is equal to:</p>
                <p>- contains:</p>
                <p>-is greater than:</p>
                <p>- is less than:</p>
                <br />
                To finalize a condition, you would then input the appropriate
                text or value you want to target. So an example condition might
                look like:
                <br />
                <br />
                Product Price is greater than $50
                <br />
                <br />
                This means that your bump will be triggered if the customer has
                at least one product in his or her cart that’s greater than $50.
                <br />
                <br />
                Each bump can have multiple conditions linked together by the
                and operator, which means that every condition set for that
                specific bump must be met in order for that promotional product
                to be displayed.
              </p>
            </TextContainer>
          </Card>
          <Card sectioned>
            <TextContainer>
              <Heading>How do my bumps get prioritized by Order Bump?</Heading>
              <p>
                You can control when specific bumps get shown to customers by
                setting conditions for each of the manual bumps. If you have
                multiple bumps with conditions that match a customer’s order,
                the bump with the most matching conditions will be prioritized
                for display. And if there are multiple bumps with an equal
                number of matching conditions to a customer’s order, the bump
                with the highest priced promotional product will be prioritized
                for display.
              </p>
            </TextContainer>
          </Card>
          <Card sectioned>
            <TextContainer>
              <Heading>Can I add a discount to my bump?</Heading>
              <p>
                It depends. To apply a discount to a product in a pre-purchase
                (checkout) bump, you’ll need to leverage Shopify Scripts (a
                feature available to Shopify Plus merchants). You can read more
                about how that works in our blog post here! Applying a discount
                to a post-purchase offer is currently more straightforward -
                we’ve included an input field on the bump creation screen that
                you can use to enter your discount as a percentage or fixed
                dollar amount.
              </p>
            </TextContainer>
          </Card>
          <Card sectioned>
            <TextContainer>
              <Heading>What’s a default bump?</Heading>
              <p>
                A default bump is a bump that you can set as your backup to show
                customers in the event that you created bumps with conditions,
                none of which match a customer’s order. Think of it as a
                fallback bump when none of your other bumps get triggered
                because their conditions aren’t met. Your default bump will be
                shown to all customers who are not being shown a bump that has
                conditions matching their order contents. To set a default bump,
                simply select the ‘Set as Default’ option for one of the bumps
                on your Bumps tab within your Order Bump admin panel.
              </p>
            </TextContainer>
          </Card>
        </Layout.AnnotatedSection>
        <FooterHelp>
          Learn more about
          <Link url="#">fulfilling orders</Link>
        </FooterHelp>
      </Layout>
    </Page>
  );
};

export default Support;
