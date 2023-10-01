import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
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
        // console.log("chats", chats);
        const displayedChats = chats.filter(chat => 
          chat.lastMessage !== null
        );
        setLoadedChats(displayedChats);
      } catch (error) {
        console.log(error.response.data);
      };
      setIsFetchingChats(false);
    };
    
    getChats();
  }, [isFocused]);


  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Chat</Text>
      <ChatList 
        chats={loadedChats}
        isFetchingChats={isFetchingChats} />
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