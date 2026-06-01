import { createContext, createElement, ReactNode, useCallback, useContext, useState } from "react";
import { FlashbarProps } from "@cloudscape-design/components";
import { useOrderStatus } from "../../hooks/useOrderStatus";
import { VendorStatusEntry, VendorStatus } from "../../constants/types/orderRecord";

interface NotificationContextType {
  flashItems: FlashbarProps.MessageDefinition[];
  startTracking: (orderId: string) => void;
  addFlash: (
    item: Omit<FlashbarProps.MessageDefinition, "id" | "dismissible" | "onDismiss">,
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

const formatVendorName = (vendorId: string): string =>
  vendorId
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const getFlashType = (status: VendorStatus): FlashbarProps.Type => {
  switch (status) {
    case "success":
    case "email_sent":
      return "success";
    case "partial_success":
      return "warning";
    case "not_configured":
      return "info";
    default:
      return "error";
  }
};

const getFlashMessage = (vendorId: string, status: VendorStatus): string => {
  const name = formatVendorName(vendorId);
  switch (status) {
    case "success":
    case "email_sent":
      return `${name} order is ready for review.`;
    case "partial_success":
      return `${name} order completed with some items not added.`;
    case "not_configured":
      return `${name} requires manual ordering — no automation configured.`;
    default:
      return `${name} order failed. Check email for details.`;
  }
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [flashItems, setFlashItems] = useState<FlashbarProps.MessageDefinition[]>([]);
  const [trackedOrderId, setTrackedOrderId] = useState<string | null>(null);

  const dismissFlash = useCallback((id: string) => {
    setFlashItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const onVendorComplete = useCallback(
    (orderId: string, vendorId: string, entry: VendorStatusEntry) => {
      const id = `${orderId}-${vendorId}`;
      setFlashItems((prev) => {
        if (prev.some((item) => item.id === id)) return prev;
        return [
          ...prev,
          {
            id,
            type: getFlashType(entry.status),
            header: "Submitted order status",
            content: createElement(
              "span",
              null,
              getFlashMessage(vendorId, entry.status),
              createElement("br"),
              createElement("small", null, `Order ID: ${orderId}`),
            ),
            dismissible: true,
            onDismiss: () => dismissFlash(id),
            statusIconAriaLabel: entry.status,
          },
        ];
      });
    },
    [dismissFlash],
  );

  const startTracking = useCallback((orderId: string) => {
    setTrackedOrderId(orderId);
  }, []);

  const addFlash = useCallback(
    (item: Omit<FlashbarProps.MessageDefinition, "id" | "dismissible" | "onDismiss">) => {
      const id = `flash-${Date.now()}`;
      setFlashItems((prev) => [
        ...prev,
        { ...item, id, dismissible: true, onDismiss: () => dismissFlash(id) },
      ]);
    },
    [dismissFlash],
  );

  useOrderStatus(trackedOrderId, onVendorComplete);

  return (
    <NotificationContext.Provider value={{ flashItems, startTracking, addFlash }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
