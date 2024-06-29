import { StyleSheet, StatusBar, Text, View } from 'react-native';
import StackNavigation from './StackNavigation';
export default function App() {
  return (
    <View style={{ backgroundColor: "lightgreen", width: "auto", flex: 1 }}>
      <StatusBar translucent={true} barStyle="light-content" backgroundColor="transparent" />
      <StackNavigation />
    </View>
  );
}

