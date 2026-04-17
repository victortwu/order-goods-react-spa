import { Theme } from "@cloudscape-design/components/theming";
import { colorTokens, radiusTokens } from "./constants/designTokens";

export const getTheme = (isDark: boolean): Theme => {
  const c = isDark ? colorTokens.dark : colorTokens.light;

  return {
    tokens: {
      // Borders
      borderRadiusButton: radiusTokens.button,
      borderRadiusContainer: radiusTokens.container,
      colorBorderButtonNormalDefault: c.border,
      colorBorderButtonNormalHover: c.borderHover,
      colorBorderContainerTop: c.border,
      colorBorderDividerDefault: "none",

      // Backgrounds
      colorBackgroundLayoutMain: c.bgMain,
      colorBackgroundContainerContent: c.bgContainer,
      colorBackgroundContainerHeader: c.bgHeader,
      colorBackgroundPopover: c.bgPopover,
      colorBackgroundNotificationBlue: c.bgNotificationBlue,
      colorBackgroundNotificationRed: c.bgNotificationRed,
      colorBackgroundItemSelected: c.bgItemSelected,
      colorBackgroundButtonNormalDefault: c.bgButtonNormal,
      colorBackgroundButtonNormalHover: c.bgButtonNormalHover,
      colorBackgroundButtonPrimaryDefault: c.bgButtonPrimary,
      colorBackgroundButtonPrimaryHover: c.bgButtonPrimaryHover,
      colorBackgroundInputDefault: c.bgInput,
      colorBackgroundInputDisabled: c.bgInputDisabled,

      // Text
      colorTextHeadingDefault: c.textPrimary,
      colorTextBodyDefault: c.textPrimary,
      colorTextHeadingSecondary: c.textSubheading,
      colorTextBodySecondary: c.textSecondary,
      colorTextLinkDefault: c.textLink,
      colorTextLinkHover: c.textLinkHover,
      colorTextButtonNormalDefault: c.textPrimary,
      colorTextButtonPrimaryDefault: c.textButtonPrimary,
      colorTextInteractiveDefault: c.textInteractive,
      colorTextInteractiveHover: c.textInteractiveHover,
      colorTextGroupLabel: c.textSubheading,
      colorTextFormSecondary: c.textSubheading,
      colorTextInputPlaceholder: c.textPlaceholder,

      // Status
      colorTextStatusWarning: c.textStatusWarning,
      colorTextStatusError: c.textStatusError,
    },
  };
};
