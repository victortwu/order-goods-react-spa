/**
 * Design tokens — single source of truth for all raw color, spacing,
 * and radius values used across Theme.ts (Cloudscape) and theme.css.
 *
 * When the design changes, update here only.
 */

export const colorTokens = {
  light: {
    bgMain: "#fff",
    bgContainer: "#f9f9f9",
    bgHeader: "#f1f1f1",
    bgPopover: "#fdfdfd",
    bgInput: "#fff",
    bgInputDisabled: "#ddd",
    bgButtonNormal: "#eee",
    bgButtonNormalHover: "#ddd",
    bgButtonPrimary: "#0056b3",
    bgButtonPrimaryHover: "#003c80",
    bgItemSelected: "#ddd",
    bgNotificationBlue: "#93c5fd",
    bgNotificationRed: "#fecaca",
    textPrimary: "#333",
    textSecondary: "#555",
    textSubheading: "#555",
    textLink: "#0056b3",
    textLinkHover: "#003c80",
    textInteractive: "#0056b3",
    textInteractiveHover: "#003c80",
    textPlaceholder: "#999",
    textButtonPrimary: "#fff",
    textStatusWarning: "#996600",
    textStatusError: "#990000",
    border: "#ccc",
    borderHover: "#888",
  },
  dark: {
    bgMain: "#333",
    bgContainer: "#222",
    bgHeader: "#1a1a1a",
    bgPopover: "#1a1a1a",
    bgInput: "#222",
    bgInputDisabled: "#333",
    bgButtonNormal: "#444",
    bgButtonNormalHover: "#555",
    bgButtonPrimary: "#c5e1ff",
    bgButtonPrimaryHover: "#9cc9ff",
    bgItemSelected: "#444",
    bgNotificationBlue: "#1e3a8a",
    bgNotificationRed: "#7f1d1d",
    textPrimary: "#fff",
    textSecondary: "#bbb",
    textSubheading: "#ddd",
    textLink: "#9cc9ff",
    textLinkHover: "#c5e1ff",
    textInteractive: "#c5e1ff",
    textInteractiveHover: "#e0f2ff",
    textPlaceholder: "#888",
    textButtonPrimary: "#1a1a1a",
    textStatusWarning: "#ffcc00",
    textStatusError: "#ff6666",
    border: "#555",
    borderHover: "#bbb",
  },
} as const;

export const radiusTokens = {
  button: "6px",
  container: "6px",
} as const;

export type ColorMode = keyof typeof colorTokens;
