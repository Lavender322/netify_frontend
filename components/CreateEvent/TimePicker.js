import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addMinutes } from '../../utils/date'; 


function TimePicker({ setPreviewTime, startTime, setStartTime, endTime, setEndTime }) {
  useEffect(() => {
    // var newEndTime = startTime;
    // if (startTime > endTime) {
    //   // console.log(newEndTime)
    //   // addMinutes(endTime, 15)
    //   // addMinutes(newEndTime, 16);
    //   newEndTime.setMinutes(newEndTime.getMinutes() + 16);
    //   setEndTime(newEndTime);
    //   console.log(endTime);
    //   // 
    //   // setEndTime(newEndTime);
    // };
    var previewStartTime = startTime.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: false});
    var previewEndTime = endTime.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: false});
    setPreviewTime(previewStartTime + ' - ' + previewEndTime);
  }, [startTime, endTime]);

  // '14:00 - 16:45'

  const onStartTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setStartTime(currentDate);
  };

  const onEndTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setEndTime(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <DateTimePicker
          testID="startTimePicker"
          value={startTime}
          mode="time"
          display="spinner"
          is24Hour={true}
          minuteInterval={15}
          onChange={onStartTimeChange}
        />
      </View>
      <View style={styles.innerContainer}>
        <DateTimePicker
          testID="endTimePicker"
          value={endTime}
          mode="time"
          display="spinner"
          is24Hour={true}
          minuteInterval={15}
          onChange={onEndTimeChange}
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