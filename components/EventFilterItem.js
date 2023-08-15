import { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Checkbox from 'expo-checkbox';

function EventFilterItem({ filter, isGroupFilter, isFilterChecked }) {
  const [isChecked, setIsChecked] = useState(false);
  const [groupFilter, setGroupFilter] = useState();

  useEffect(() => {
    isFilterChecked(true);

    if (filter.parameter === 'ONE_TO_ONE') {
      setGroupFilter('One to One');
    } else if (filter.parameter === 'GROUP_EVENT') {
      setGroupFilter('Group Event');
    };
  }, []);
  
  useEffect(() => {
    if (!isGroupFilter) {
      isFilterChecked(isChecked, filter.tagId.toString());
    } else {
      isFilterChecked(isChecked, filter.parameter);
    };
  }, [isChecked]);

  return (
    <View style={styles.filterItemContainer}>
      <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setIsChecked} color={isChecked ? '#3C8722' : undefined} />
      <Text style={styles.text}>{isGroupFilter ? groupFilter : filter.tagName}</Text>
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