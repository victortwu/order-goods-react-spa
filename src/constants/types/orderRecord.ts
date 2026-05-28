import { OrderItem } from "./orderItem";

export type VendorStatus =
  | "pending"
  | "success"
  | "partial_success"
  | "failure"
  | "auth_failure"
  | "connection_failure"
  | "credential_failure"
  | "browser_failure"
  | "timeout"
  | "delivery_unavailable"
  | "not_configured"
  | "email_sent";

export interface VendorStatusEntry {
  status: VendorStatus;
  timestamp: string;
}

export interface OrderRecord {
  id: string;
  timestamp: number;
  list: OrderItem[];
  vendorStatuses?: Record<string, VendorStatusEntry>;
}
