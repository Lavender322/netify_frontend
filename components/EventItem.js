import { StyleSheet, View, Image, Pressable, Linking, Alert, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function EventItem({ id, name, grade, sector, period, date, onPress}) {
  const navigation = useNavigation();

  function eventDetailHandler() {
    navigation.navigate('EventDetail', {
      eventId: id
    });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={eventDetailHandler} style={({pressed}) => [styles.leftContainer, pressed && styles.pressed]}>
        <Image source={require('../assets/avatar.png')} style={styles.avatar} />
        <View style={styles.infoOuterContainer}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.infoInnerContainer}>
            <Text style={styles.grade}>{grade}</Text>
            <View style={styles.sectorContainer}>
              <Text style={styles.sector}>{sector}</Text>
            </View>
          </View>
          <View style={styles.infoInnerContainer}>
            <Text style={styles.period}>{period}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
      </Pressable>
      <Pressable onPress={() => {}}>
        <View style={styles.requestContainer}>
          <Text style={styles.requestText}>Request</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default EventItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 20,
    marginRight: 8,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1, 
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 10
  },
  infoOuterContainer: {
    padding: 4,
    marginRight: 30,
    justifyContent: 'space-between',
  },  
  name: {
    fontFamily: 'roboto-bold',
    fontSize: 16,
    color: '#1A1A1A',
  },
  infoInnerContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 1
  },
  grade: {
    color: '#3B4852',
    marginRight: 10,
    fontFamily: 'roboto-medium',
    fontSize: 12
  },
  sectorContainer: {
    backgroundColor: '#E9E9E9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2
  },
  sector: {
    color: '#3B4852',
    fontFamily: 'roboto-medium',
    fontSize: 12
  },
  period: {
    color: '#3C8722',
    fontSize: 16,
    fontFamily: 'roboto-medium',
    marginRight: 5
  },
  date: {
    color: '#3B4852',
    fontFamily: 'roboto-medium'
  },
  requestContainer: {
    backgroundColor: '#1A4821',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 23
  },
  requestText: {
    color: '#A6E291',
    fontSize: 16,
    fontFamily: 'roboto'
  },
  pressed: {
    opacity: 0.75
  }
});