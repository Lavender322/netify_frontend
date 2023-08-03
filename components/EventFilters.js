import { StyleSheet, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

function EventFilters() {
  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Text style={styles.filterText}>Grade</Text>
        <Feather name="chevron-down" size={24} color="#1A1A1A" />
      </View>
      <View style={styles.dropdownContainer}>
        <Text style={styles.filterText}>Industry</Text>
        <Feather name="chevron-down" size={24} color="#1A1A1A" />
      </View>
      <View style={[styles.dropdownContainer, styles.colorContainer]}>
        <Text style={[styles.filterText, styles.colorText]}>One to One</Text>
        <Feather name="chevron-down" size={24} color="white" />
      </View>
    </View>
  )
}

export default EventFilters;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 8,
    marginTop: 16,
    marginRight: 8
  },
  colorContainer: {
    backgroundColor: '#3C8722'
  },
  filterText: {
    fontFamily: 'roboto-medium',
    color: '#1A1A1A',
    marginRight: 4
  },
  colorText: {
    color: 'white'
  }
});