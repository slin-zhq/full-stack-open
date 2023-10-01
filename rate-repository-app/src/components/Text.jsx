import { Text as NativeText, Platform, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: Platform.select({
			default: theme.fonts.main,
			ios: theme.fonts.ios,
			android: theme.fonts.android,
		}),
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
	colorTextAppBarTab: {
		color: theme.colors.textAppBarTab,
	},
	colorTextError: {
		color: theme.colors.textError,
	},
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'secondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
		color === 'appBarTab' && styles.colorTextAppBarTab,
		color === 'error' && styles.colorTextError,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;