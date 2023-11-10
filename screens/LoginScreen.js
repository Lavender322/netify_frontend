import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

function LoginScreen({ route }) {
  const returnedUrl = route.params?.returnedUrl;

  return (
    <WebView
      style={styles.container}
      source={{ uri: returnedUrl }}
    />
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});