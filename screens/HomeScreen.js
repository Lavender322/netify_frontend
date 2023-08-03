import { StyleSheet, View, Image, Pressable, Linking, Alert, Text } from 'react-native';
import EventsList from '../components/EventsList';
import EventFilters from '../components/EventFilters';
import { DUMMY_EVENTS } from '../store/context/user-context';

function HomeScreen() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.headerText}>Hi, Richard</Text>
        <View style={styles.outerPanelContainer}>
          <View style={[styles.innerPanelContainer, styles.innerPanel]}>
            <Text style={styles.panelNumber}>3</Text> 
            <Text style={styles.panelText}>Confirmed Meeting</Text> 
          </View>
          <View style={[styles.innerPanelContainer, styles.innerPanel]}>
            <Text style={styles.panelNumber}>5</Text> 
            <Text style={styles.panelText}>Pending Request</Text> 
          </View>
          <View style={styles.innerPanelContainer}>
            <Text style={styles.panelNumber}>9</Text> 
            <Text style={styles.panelText}>Invitations Received</Text> 
          </View>
        </View>
        <EventFilters />
        <EventsList events={DUMMY_EVENTS} />
      </View>
   </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 7
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'roboto-bold',
    marginTop: 58,
    marginLeft: 13,
    color: '#000000E5'
  },
  outerPanelContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginTop: 16,
    paddingVertical: 16
  },
  innerPanelContainer: {
    flex: 1,
    paddingHorizontal: 16
  },
  innerPanel: {
    borderRightColor: '#D9D9D9',
    borderRightWidth: 1,
  },
  panelNumber: {
    fontSize: 24,
    fontFamily: 'roboto-bold',
    color: '#1A1A1A',
    marginBottom: 8
  },
  panelText: {
    color: '#6F8698',
    fontSize: 13,
    fontFamily: 'roboto-medium'
  }
});