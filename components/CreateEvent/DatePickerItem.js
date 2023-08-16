import { StyleSheet, View, Image, Pressable, Linking, Alert, Text } from 'react-native';

function DatePickerItem({ day, date }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.day]}>{day}</Text>
      <Text style={styles.text}>{date}</Text>
    </View>
  )
}

export default DatePickerItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderColor: '#DCDCDC',
    borderWidth: 1,
    padding: 8,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginRight: 16
  },
  text: {
    color: '#6A6A6A',
    lineHeight: 20,
    fontFamily: 'roboto'
  },
  day: {
    marginBottom: 4
  }
});