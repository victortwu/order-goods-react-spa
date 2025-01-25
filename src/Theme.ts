import { Theme } from "@cloudscape-design/components/theming";

const lightModeTextColor = "#333";
const lightModeBGColor = "#fff";
const darkModeTextColor = "#fff";
const darkModeBGColor = "#333";
const lightBorderColor = "#ccc";
const darkBorderColor = "#555";
const lightSubHeadingColor = "#555";
const darkSubHeadingColor = "#ddd";

export const getTheme = (isDark: boolean): Theme => ({
  tokens: {
    // Borders
    borderRadiusButton: "6px",
    borderRadiusContainer: "6px",
    colorBorderButtonNormalDefault: isDark ? darkBorderColor : lightBorderColor,
    colorBorderButtonNormalHover: isDark ? "#bbb" : "#888",
    colorBorderContainerTop: isDark ? darkBorderColor : lightBorderColor,
    colorBorderDividerDefault: "none",

    // Background Colors
    colorBackgroundLayoutMain: isDark ? darkModeBGColor : lightModeBGColor,
    colorBackgroundContainerContent: isDark ? "#222" : "#f9f9f9",
    colorBackgroundContainerHeader: isDark ? "#1a1a1a" : "#f1f1f1",
    colorBackgroundPopover: isDark ? "#1a1a1a" : "#fdfdfd",
    colorBackgroundNotificationBlue: isDark ? "#1e3a8a" : "#93c5fd",
    colorBackgroundNotificationRed: isDark ? "#7f1d1d" : "#fecaca",
    colorBackgroundItemSelected: isDark ? "#444" : "#ddd",

    // Text Colors
    colorTextHeadingDefault: isDark ? darkModeTextColor : lightModeTextColor,
    colorTextBodyDefault: isDark ? darkModeTextColor : lightModeTextColor,
    colorTextHeadingSecondary: isDark ? "#ddd" : "#555",
    colorTextBodySecondary: isDark ? "#bbb" : "#666",
    colorTextLinkDefault: isDark ? "#9cc9ff" : "#0056b3",
    colorTextLinkHover: isDark ? "#c5e1ff" : "#003c80",
    colorTextButtonNormalDefault: isDark
      ? darkModeTextColor
      : lightModeTextColor,
    colorTextButtonPrimaryDefault: isDark
      ? darkModeTextColor
      : lightModeTextColor,
    colorTextInteractiveDefault: isDark ? "#c5e1ff" : "#0056b3",
    colorTextInteractiveHover: isDark ? "#e0f2ff" : "#003c80",
    // Subheadings in Cards (Using Header Context)
    colorTextGroupLabel: isDark ? darkSubHeadingColor : lightSubHeadingColor,
    colorTextFormSecondary: isDark ? darkSubHeadingColor : lightSubHeadingColor,

    // Buttons
    colorBackgroundButtonNormalDefault: isDark ? "#444" : "#eee",
    colorBackgroundButtonNormalHover: isDark ? "#555" : "#ddd",
    colorBackgroundButtonPrimaryDefault: isDark ? "#0056b3" : "#007aff",
    colorBackgroundButtonPrimaryHover: isDark ? "#003c80" : "#0056b3",

    // Inputs
    colorBackgroundInputDefault: isDark ? "#222" : "#fff",
    colorBackgroundInputDisabled: isDark ? "#333" : "#ddd",
    colorTextInputPlaceholder: isDark ? "#888" : "#999",

    // Status Indicators
    colorTextStatusWarning: isDark ? "#ffcc00" : "#996600",
    colorTextStatusError: isDark ? "#ff6666" : "#990000",

    // Miscellaneous
    colorBackgroundChatBubbleOutgoing: isDark ? "#1e3a8a" : "#dbeafe",
    colorBackgroundChatBubbleIncoming: isDark ? "#4a4a4a" : "#f3f3f3",
    colorTextChatBubbleOutgoing: isDark ? "#c5e1ff" : "#0056b3",
    colorTextChatBubbleIncoming: isDark ? "#ddd" : "#333",
  },
});
