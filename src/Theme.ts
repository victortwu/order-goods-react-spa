import { Theme } from "@cloudscape-design/components/theming";

const lightModeTextColor = "#333";
const lightModeBGColor = "#fff";
const darkModeTextColor = "#fff";
const darkModeBGColor = "#333";

export const getTheme = (isDark: boolean): Theme => ({
  tokens: {
    borderRadiusButton: "4px",
    borderRadiusContainer: "4px",
    colorBackgroundLayoutMain: isDark ? darkModeBGColor : lightModeBGColor,
    colorBackgroundButtonNormalDefault: isDark
      ? darkModeBGColor
      : lightModeBGColor,
    colorTextButtonNormalDefault: isDark
      ? darkModeTextColor
      : lightModeTextColor,
    colorBackgroundLayoutToggleDefault: isDark
      ? darkModeBGColor
      : lightModeBGColor,
    colorBackgroundContainerContent: isDark
      ? darkModeBGColor
      : lightModeBGColor,
    colorBackgroundContainerHeader: isDark ? darkModeBGColor : lightModeBGColor,
  },
  contexts: {
    header: {
      tokens: {
        colorBackgroundLayoutMain: isDark ? darkModeBGColor : lightModeBGColor,
      },
    },
  },
});
