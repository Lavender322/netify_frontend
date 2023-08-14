import { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Checkbox from 'expo-checkbox';

function EventFilterItem({ filter, isGroupFilter }) {
  const [isChecked, setChecked] = useState(false);

  if (filter.parameter === 'ONE_TO_ONE') {
    filter = 'One to One';
  } else if (filter.parameter === 'GROUP_EVENT') {
    filter = 'Group Event';
  };

  return (
    <View style={styles.filterItemContainer}>
      <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} color={isChecked ? '#3C8722' : undefined} />
      <Text style={styles.text}>{isGroupFilter ? filter : filter.tagName}</Text>
    </View>
  )
}

export default EventFilterItem;

const styles = StyleSheet.create({
  filterItemContainer: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center'
  },
  text: {
    color: '#1A1A1A',
    fontFamily: 'roboto-medium',
    marginLeft: 4
  }
});