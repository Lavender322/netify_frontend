import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


function TimePicker() {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <DateTimePicker
          testID="timePicker"
          value={date}
          mode="time"
          display="spinner"
          is24Hour={true}
          minuteInterval={15}
          onChange={onChange}
        />
      </View>
      <View style={styles.innerContainer}>
        <DateTimePicker
          testID="timePicker"
          value={date}
          mode="time"
          display="spinner"
          is24Hour={true}
          minuteInterval={15}
          onChange={onChange}
        />
      </View>
    </View>
  )
}

export default TimePicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  innerContainer: {
    flex: 1
  }
});