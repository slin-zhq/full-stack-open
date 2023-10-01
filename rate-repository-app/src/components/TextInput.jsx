import { TextInput as NativeTextInput } from 'react-native';

// const styles = StyleSheet.create({});
import theme from '../theme';

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = error ? [{ ...style, borderColor: theme.colors.textError }]: [style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;