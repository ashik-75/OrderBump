import { useAppBridge } from "@shopify/app-bridge-react";
import { Button, Modal } from "@shopify/polaris";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import useDeleteBump from "../hooks/useDeleteBump";

function DeleteBumpModal({ manualBumpId, setIsModalOpen, isModalOpen }) {
  const queryClient = useQueryClient();
  const app = useAppBridge();
  const navigate = useNavigate();
  const { mutate, isLoading, isSuccess, isError, error } = useDeleteBump();

  const handleDelete = () => {
    mutate({ manualBumpId, app });
  };

  const handleChange = () => {
    setIsModalOpen((dt) => !dt);
  };

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries("allBumps");
      navigate("/");
    }
  }, [isSuccess]);

  const activator = (
    <Button destructive onClick={handleChange}>
      Delete
    </Button>
  );

  return (
    <div>
      <Modal
        // activator={activator}
        open={isModalOpen}
        onClose={handleChange}
        title="Are you sure to delete this Bump?"
        primaryAction={{
          content: isLoading ? "Deleting.." : "Delete",
          onAction: handleDelete,
          destructive: true,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleChange,
          },
        ]}
      >
        {/* <Modal.Section>
          <TextContainer>
            <p>
              Use Instagram posts to share your products with millions of
              people. Let shoppers buy from your store without leaving
              Instagram.
            </p>
          </TextContainer>
        </Modal.Section> */}
      </Modal>
    </div>
  );
}

export default DeleteBumpModal;
