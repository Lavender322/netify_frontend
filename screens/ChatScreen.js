import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ChatList from '../components/Chat/ChatList';
import { fetchChats } from '../utils/http';
import { AuthContext } from '../store/context/auth-context';
import { useIsFocused } from '@react-navigation/native';

function ChatScreen() {
  const [isFetchingChats, setIsFetchingChats] = useState(true);
  const [loadedChats, setLoadedChats] = useState();

  const { token } = useContext(AuthContext);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function getChats() { 
      setIsFetchingChats(true);
      try {
        const chats = await fetchChats(token);
        const displayedChats = chats.filter(chat => 
          chat.lastMessage !== null
        );
        setLoadedChats(displayedChats);
      } catch (error) {
        console.log('fetchChats', error);
        console.log(error.response.data);
      };
      setIsFetchingChats(false);
    };
    
    getChats();
  }, [isFocused]);


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Chats</Text>
      </View>
      <ChatList 
        chats={loadedChats}
        isFetchingChats={isFetchingChats} />
    </View>
  )
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16
  },
  headerContainer: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'roboto-bold',
    marginTop: 58,
    marginLeft: 4,
    color: '#000000E5',
    paddingBottom: 16
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