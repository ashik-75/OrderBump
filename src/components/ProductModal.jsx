import {
  Button,
  Modal,
  ResourceItem,
  ResourceList,
  TextStyle,
} from "@shopify/polaris";
import { useCallback, useState } from "react";

function ResourceItemExample({ variants }) {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <ResourceList
      resourceName={{ singular: "blog post", plural: "blog posts" }}
      items={variants}
      selectedItems={selectedItems}
      onSelectionChange={setSelectedItems}
      selectable
      renderItem={(item) => {
        const { id, url, title, author } = item;
        const authorMarkup = author ? <div>by {author}</div> : null;
        return (
          <ResourceItem
            id={id}
            url={url}
            accessibilityLabel={`View details for ${title}`}
            name={title}
          >
            <h3>
              <TextStyle variation="strong">{title}</TextStyle>
            </h3>
            {authorMarkup}
          </ResourceItem>
        );
      }}
    />
  );
}

function ProductModal({ product }) {
  const [active, setActive] = useState(false);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const activator = (
    <Button onClick={handleChange}>Change default Variant</Button>
  );

  return (
    <div>
      <Modal
        activator={activator}
        open={active}
        onClose={handleChange}
        title={product?.selection[0]?.title}
        primaryAction={{
          content: "Cancel",
          onAction: handleChange,
        }}
        secondaryActions={[
          {
            content: "save",
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
          {/* <TextContainer> */}
          <ResourceItemExample variants={product?.selection[0]?.variants} />
          {/* </TextContainer> */}
        </Modal.Section>
      </Modal>
    </div>
  );
}

export default ProductModal;
