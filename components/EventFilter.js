import { StyleSheet, View, Text, Pressable } from 'react-native';
import EventFilterItem from "./EventFilterItem";


function EventFilter({ filters, isGroupFilters }) {
  function handleUpdateEvents() {

  };

  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        {filters.map((filter, idx) => (
          <EventFilterItem filter={filter} isGroupFilter={isGroupFilters} />
        ))}
      </View>
      <Pressable style={({pressed}) => pressed && styles.pressed} onPress={handleUpdateEvents}>
        <View style={styles.requestContainer}>
          <Text style={styles.requestText}>Show results</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default EventFilter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  filtersContainer: {
    padding: 8,
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1
  },
  requestContainer: {
    backgroundColor: '#1A4821',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 23,
    marginVertical: 16,
    marginHorizontal: 8,  
  },
  requestText: {
    color: '#A6E291',
    fontSize: 16,
    fontFamily: 'roboto',
    textAlign: 'center'
  },
  pressed: {
    opacity: 0.75
  }
});