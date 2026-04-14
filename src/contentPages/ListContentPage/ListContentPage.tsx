import {
  Alert,
  Box,
  Button,
  Header,
  SpaceBetween,
} from "@cloudscape-design/components";
import { CardItems } from "../../components/CardItems/CardItems";
import { useOrderList } from "../../hooks/useOrderList";
import { useCreateList } from "../../api/hooks/useCreateList";
import { useState } from "react";

export const ListsContentPage = () => {
  const { orderList, updateItem, removeItem, clearList } = useOrderList();
  const { mutate, isPending, isError, reset } = useCreateList();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    if (orderList.length === 0) return;
    setShowSuccess(false);
    mutate(
      { list: orderList },
      {
        onSuccess: () => {
          clearList();
          setShowSuccess(true);
        },
      },
    );
  };

  return (
    <SpaceBetween size="m">
      {showSuccess && (
        <Alert
          type="success"
          dismissible
          onDismiss={() => setShowSuccess(false)}
          header="Order submitted"
        >
          Your order has been submitted successfully.
        </Alert>
      )}

      {isError && (
        <Alert
          type="error"
          dismissible
          onDismiss={reset}
          header="Order submission failed"
        >
          There was a problem submitting your order. Your list has been
          preserved — please try again.
        </Alert>
      )}

      <Header
        variant="h1"
        actions={
          <Button
            variant="primary"
            loading={isPending}
            disabled={orderList.length === 0}
            onClick={handleSubmit}
          >
            Submit Order
          </Button>
        }
      >
        Order List
      </Header>

      {orderList.length === 0 && !showSuccess ? (
        <Box textAlign="center" color="text-body-secondary">
          No items added yet. Go to Goods to build your order.
        </Box>
      ) : (
        <CardItems
          items={orderList}
          isList={true}
          onUpdate={updateItem}
          onRemove={removeItem}
        />
      )}
    </SpaceBetween>
  );
};
