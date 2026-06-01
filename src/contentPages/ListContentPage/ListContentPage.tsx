import { Alert, Box, Button, Header, Modal, SpaceBetween } from "@cloudscape-design/components";
import { OrderListView } from "../../components/OrderListView/OrderListView";
import { useOrderList } from "../../hooks/useOrderList";
import { useCreateList } from "../../api/hooks/useCreateList";
import { useNotifications } from "../../contexts/NotificationContext/NotificationContext";
import { useState, useCallback } from "react";

export const ListsContentPage = () => {
  const { orderList, updateItem, removeItem, clearList } = useOrderList();
  const { mutate, isPending, isError, reset } = useCreateList();
  const { startTracking } = useNotifications();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  const handleSubmit = () => {
    if (orderList.length === 0) return;
    setShowSuccess(false);
    mutate(
      { list: orderList },
      {
        onSuccess: (data) => {
          clearList();
          setShowSuccess(true);
          const { id } = data as { id: string };
          startTracking(id);
        },
      },
    );
  };

  const handleClearAll = () => {
    clearList();
    setShowClearModal(false);
  };

  const calculateTotalUnits = useCallback(() => {
    return orderList.reduce((acc, curr) => {
      return curr.qty + acc;
    }, 0);
  }, [orderList]);

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
        <Alert type="error" dismissible onDismiss={reset} header="Order submission failed">
          There was a problem submitting your order. Your list has been preserved — please try
          again.
        </Alert>
      )}

      <Header
        variant="h1"
        counter={
          orderList.length > 0 &&
          `| ${calculateTotalUnits()} pkg${calculateTotalUnits() > 1 ? "s" : ""}`
        }
      >
        Crate
      </Header>

      {orderList.length === 0 && !showSuccess ? (
        <Box textAlign="center" color="text-body-secondary">
          No items added yet. Go to Goods to build your order.
        </Box>
      ) : (
        <OrderListView items={orderList} onUpdate={updateItem} onRemove={removeItem} />
      )}
      <Box float="right">
        <SpaceBetween direction="horizontal" size="s">
          <Button disabled={orderList.length === 0} onClick={() => setShowClearModal(true)}>
            Clear All
          </Button>
          <Button
            variant="primary"
            loading={isPending}
            disabled={orderList.length === 0}
            onClick={handleSubmit}
          >
            Submit Order
          </Button>
        </SpaceBetween>
      </Box>
      <Modal
        visible={showClearModal}
        onDismiss={() => setShowClearModal(false)}
        header="Clear all items"
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button onClick={() => setShowClearModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleClearAll}>
                Clear All
              </Button>
            </SpaceBetween>
          </Box>
        }
      >
        Are you sure you want to clear all items from your order list? This action cannot be undone.
      </Modal>
    </SpaceBetween>
  );
};
