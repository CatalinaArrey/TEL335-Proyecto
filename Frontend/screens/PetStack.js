import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function App() {
  return (
    <View style={styles.container}>
      <Calendar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});