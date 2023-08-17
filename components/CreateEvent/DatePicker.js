import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import DatePickerItem from './DatePickerItem';
import { getEventDates } from '../../utils/date';

function DatePicker() {
  const [isSelectedDate, setIsSelectedDate] = useState([true, false, false, false, false, false, false]);
  
  const eventDates = getEventDates();

  function selectDateHandler(idx) {
    let updatedIsSelectedDate = [...isSelectedDate];
    updatedIsSelectedDate[idx] = true;
    updatedIsSelectedDate.map((date, i) => {
      i !== idx && (updatedIsSelectedDate[i] = false);
    });
    setIsSelectedDate(updatedIsSelectedDate);
  };

  return (
    <View style={styles.outerContainer}>
      <Text style={styles.text}>May, 2023</Text>
      <ScrollView horizontal style={styles.container}>
        {eventDates.map((date, idx) => (
          <DatePickerItem 
            key={idx}
            day={Object.keys(date)}
            date={Object.values(date)}
            active={isSelectedDate[idx]}
            onPress={selectDateHandler.bind(this, idx)}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default DatePicker;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#F2F2F2',
    paddingVertical: 18
  },
  container: {
    paddingHorizontal: 16,
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