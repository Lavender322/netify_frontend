
import { StyleSheet, Text, View, Image, Pressable, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

function UpcomingActivity({ isGroupEvent }) {
  return (
    <View style={isGroupEvent ? styles.groupContainer : styles.container}>
      {isGroupEvent ? (
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>Come to join our rooftop drink after work 🍺</Text>
        </View>
      ) : (
        <Image source={require('../../assets/images/avatar.png')} style={styles.avatar} />
      )}
      <Text style={styles.time}>20:00 - 21:30</Text>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>Thu, Jul 11</Text>
        {isGroupEvent ? (
          <View style={styles.numContainer}>
            <Feather name="user" size={13} color="#FFAE10" />
            <Text style={styles.num}>110</Text>
          </View>
        ) : null}
      </View>
      
    </View>
  )
}

export default UpcomingActivity;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F5EF',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 16,
    height: 113,
    width: 111
  },
  groupContainer: {
    backgroundColor: '#F1F5EF',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 16,
    height: 113,
    width: 164
  },
  avatar: {
    width: 48,
    height: 48,
    marginVertical: 8
  },
  time: {
    fontFamily: 'roboto-medium',
    color: '#3C8722',
    fontSize: 17
  },
  date: {
    color: '#3C8722',
    fontFamily: 'roboto-medium',
    fontSize: 13,
  },
  titleContainer: {
    height: 64,
    justifyContent: 'center'
  },
  title: {
    fontSize: 17,
    fontFamily: 'roboto-bold',
    color: '#1A1A1A',
    paddingHorizontal: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8
  },
  numContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8
  },
  num: {
    fontFamily: 'roboto',
    fontSize: 13,
    color: '#000000'
  }
});