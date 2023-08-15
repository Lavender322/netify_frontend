import { useState } from 'react';
import { StyleSheet, View, Image, Pressable, Linking, Alert, Text, ScrollView } from 'react-native';
import DatePickerItem from './DatePickerItem';
// import { getEventDates } from '../../utils/date';

function DatePicker() {
  const [selectedDate, setSelectedDate] = useState([true, false, false, false, false, false, false]);
  
  return (
    <ScrollView horizontal style={styles.container}>
      {/* <DatePickerItem active={} />
      <DatePickerItem active={} />
      <DatePickerItem active={} />
      <DatePickerItem active={} />
      <DatePickerItem active={} />
      <DatePickerItem active={} />
      <DatePickerItem active={} /> */}
    </ScrollView>
  )
}

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16
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