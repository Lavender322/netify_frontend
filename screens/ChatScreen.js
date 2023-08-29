import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import ChatList from '../components/Chat/ChatList';

function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Chat</Text>
      <View style={styles.searchBar}>
        <Ionicons name="search-sharp" size={24} color="#ADB5BD" />
        <TextInput 
          style={styles.searchInput}
          placeholder='Search'
          placeholderTextColor='#ADB5BD'
        />
      </View>
      <ChatList />
    </View>
  )
}

export default ChatScreen;

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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 8
  },
  textInputContainer: {
    flex: 1
  },  
  searchInput: {
    fontFamily: 'mulish-semibold',
    fontSize: 15,
    marginLeft: 8,
    color: '#191919',
  }
});