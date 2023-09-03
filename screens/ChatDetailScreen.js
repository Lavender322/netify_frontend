import { StyleSheet, View, Text, TextInput, Image, ScrollView } from 'react-native';
import IconButton from '../components/ui/IconButton';
import UpcomingEventCard from '../components/Chat/UpcomingEventCard';

function ChatDetailScreen({ navigation, route }) {
  const eventHost = route.params && route.params.eventHost;
  const eventParticipants = route.params && route.params.eventParticipants;

  function previousStepHandler() {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <IconButton icon="arrow-left" size={24} color="black" style={styles.goBackButton} onPress={previousStepHandler}/>
        <Image source={{uri: eventHost.userImage[3]}} style={styles.avatar} />
        <Text style={styles.name}>{eventParticipants && eventParticipants[0] ? ' ' + eventParticipants[0].user.localizedfirstname + ' ' + eventParticipants[0].user.localizedlastname :
        ' ' + eventHost.localizedfirstname + ' ' + eventHost.localizedlastname}</Text>
      </View>

      <View style={styles.mainContainer}>
        <ScrollView>
          <UpcomingEventCard />
          <View style={styles.timeContainer}>
            <Text style={styles.time}>22 June 2023 BST</Text>
          </View>
        </ScrollView>
      </View>

      <View style={styles.searchBar}>
        <TextInput 
          style={styles.searchInput}
          placeholder='Search'
          placeholderTextColor='#ADB5BD'
        />
        <Image style={styles.logo} source={require("../assets/send-icon.png")} />
      </View>
    </View>
  )
}

export default ChatDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    marginTop: 23,
    height: 92
  },
  goBackButton: {
    marginLeft: 16,
    marginRight: 13,
  },
  avatar: {
    width: 60,
    height: 60,
    marginVertical: 36,
    marginRight: 14,
    borderRadius: 42,
    overflow: 'hidden',
  },
  name: {
    color: '#1A1A1A',
    fontFamily: 'roboto-bold',
    fontSize: 17,
  },
  mainContainer: {
    flex: 1
  },
  logo: {
    width: 21,
    height: 18
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: 'yellow'
  },
  searchInput: {
    fontFamily: 'mulish-semibold',
    fontSize: 15,
    marginLeft: 8,
    color: '#191919',
    backgroundColor: 'blue'
  }

});