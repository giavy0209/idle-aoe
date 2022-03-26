import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
export default function App() {
  const webviewRef = useRef<any>()
  return (
    <WebView
    ref={_ref => webviewRef.current = _ref}
    style={styles.container}
    source={{ uri: 'https://idle-aoe.idlebytegame.com/' }}
    cacheEnabled={false}
    incognito={true}
  />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
