import { useState, useCallback } from "react";
import { OrderItem } from "../constants/types/orderItem";

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

export const useOrderList = () => {
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
        const next = prev.map((i) => (i.id === id ? { ...i, ...changes } : i));
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

  return { orderList, addItem, updateItem, removeItem, clearList, isInList };
};
