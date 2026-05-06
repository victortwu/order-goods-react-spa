import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { OrderItem } from "../../constants/types/orderItem";

const STORAGE_KEY = "orderList";

const readFromStorage = (): OrderItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as OrderItem[]) : [];
  } catch {
    return [];
  }
};

const writeToStorage = (items: OrderItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

interface OrderListContextType {
  orderList: OrderItem[];
  addItem: (item: OrderItem) => void;
  updateItem: (id: string, changes: Partial<Pick<OrderItem, "qty" | "unitType">>) => void;
  removeItem: (id: string) => void;
  clearList: () => void;
  isInList: (id: string) => boolean;
}

const OrderListContext = createContext<OrderListContextType | null>(null);

export const OrderListProvider = ({ children }: { children: ReactNode }) => {
  const [orderList, setOrderList] = useState<OrderItem[]>(readFromStorage);

  const addItem = useCallback((item: OrderItem) => {
    setOrderList((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      const next = [...prev, item];
      writeToStorage(next);
      return next;
    });
  }, []);

  const updateItem = useCallback(
    (id: string, changes: Partial<Pick<OrderItem, "qty" | "unitType">>) => {
      setOrderList((prev) => {
        const next = prev
          .map((i) => (i.id === id ? { ...i, ...changes } : i))
          .filter((i) => i.qty > 0);
        writeToStorage(next);
        return next;
      });
    },
    [],
  );

  const removeItem = useCallback((id: string) => {
    setOrderList((prev) => {
      const next = prev.filter((i) => i.id !== id);
      writeToStorage(next);
      return next;
    });
  }, []);

  const clearList = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setOrderList([]);
  }, []);

  const isInList = useCallback(
    (id: string) => orderList.some((i) => i.id === id),
    [orderList],
  );

  return (
    <OrderListContext.Provider
      value={{ orderList, addItem, updateItem, removeItem, clearList, isInList }}
    >
      {children}
    </OrderListContext.Provider>
  );
};

export const useOrderList = (): OrderListContextType => {
  const context = useContext(OrderListContext);
  if (!context) {
    throw new Error("useOrderList must be used within an OrderListProvider");
  }
  return context;
};
