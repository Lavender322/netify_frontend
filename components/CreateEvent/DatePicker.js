import { useState } from 'react';
import { StyleSheet, View, Image, Pressable, Linking, Alert, Text, ScrollView } from 'react-native';
import DatePickerItem from './DatePickerItem';
import { getEventDates } from '../../utils/date';

function DatePicker({ show }) {
  const [selectedDate, setSelectedDate] = useState([true, false, false, false, false, false, false]);
  
  const eventDates = getEventDates();

  return (
    <View style={[!show && styles.hide, styles.outerContainer]}>
      <Text style={styles.text}>May, 2023</Text>
      <ScrollView horizontal style={styles.container}>
        {eventDates.map((date, idx) => (
          <DatePickerItem 
            key={idx}
            day={Object.keys(date)}
            date={Object.values(date)}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default DatePicker;

const styles = StyleSheet.create({
  hide: {
    display: 'none',
  },
  outerContainer: {
    backgroundColor: '#F2F2F2',
    paddingVertical: 18
  },
  container: {
    paddingHorizontal: 16,
    // paddingRight: 16
  },
  text: {
    color: '#1A1A1A',
    lineHeight: 20.8,
    fontFamily: 'roboto-medium',
    fontSize: 16,
    marginBottom: 8,
    paddingLeft: 16,
  },
});