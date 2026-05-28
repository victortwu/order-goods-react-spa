import { useQuery } from "@tanstack/react-query";
import { useRef, useCallback, useEffect } from "react";
import { getListById } from "../api/data-fetching/getListById";
import { VendorStatus, VendorStatusEntry } from "../constants/types/orderRecord";

const POLL_INTERVAL = 30_000;

const FINAL_STATUSES: VendorStatus[] = [
  "success",
  "partial_success",
  "failure",
  "auth_failure",
  "connection_failure",
  "credential_failure",
  "browser_failure",
  "timeout",
  "delivery_unavailable",
  "not_configured",
  "email_sent",
];

const isFinal = (status: VendorStatus) => FINAL_STATUSES.includes(status);

export const useOrderStatus = (
  orderId: string | null,
  onVendorComplete: (vendorId: string, entry: VendorStatusEntry) => void,
) => {
  const previousStatuses = useRef<Record<string, VendorStatus>>({});

  const query = useQuery({
    queryKey: ["orderStatus", orderId],
    queryFn: () => getListById(orderId!),
    enabled: !!orderId,
    refetchInterval: (query) => {
      const statuses = query.state.data?.vendorStatuses;
      if (!statuses) return POLL_INTERVAL;
      const allDone = Object.values(statuses).every((e) => isFinal(e.status));
      return allDone ? false : POLL_INTERVAL;
    },
  });

  useEffect(() => {
    const vendorStatuses = query.data?.vendorStatuses;
    if (!vendorStatuses) return;

    for (const [vendorId, entry] of Object.entries(vendorStatuses)) {
      const prev = previousStatuses.current[vendorId];
      if (prev !== entry.status && isFinal(entry.status)) {
        onVendorComplete(vendorId, entry);
      }
      previousStatuses.current[vendorId] = entry.status;
    }
  }, [query.data?.vendorStatuses, onVendorComplete]);

  return query;
};
