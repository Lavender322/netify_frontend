import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, Image, ScrollView, Pressable } from 'react-native';
import IconButton from '../components/ui/IconButton';
import UpcomingEventCards from '../components/Chat/UpcomingEventCards';
import { AuthContext } from '../store/context/auth-context';
import { createNewChat, fetchMessages, sendMessage, fetchChatRoomInfo } from '../utils/http';
import MessageList from '../components/Chat/MessageList';

function ChatDetailScreen({ navigation, route }) {
  const eventDetails = route.params && route.params.eventDetails;
  const eventParticipants = route.params && route.params.eventParticipants;
  const eventHost = route.params && route.params.eventHost;
  const closestEventId = route.params && route.params.closestEventId;
  const eventId = route.params && route.params.eventId;

  const [chatRoomId, setChatRoomId] = useState();
  const [chatRoomInfo, setChatRoomInfo] = useState();
  const [chatMessages, setChatMessages] = useState();
  const [enteredText, setEnteredText] = useState('');

  const { token, userInfo } = useContext(AuthContext);

  useEffect(() => {
    async function initiateNewChat() {
      // setIsFetching(true);
      try {
        const id = await createNewChat(eventId, token);
        setChatRoomId(id);
      } catch (error) {
        console.log("createNewChat", error.response.data);
      };
      // setIsFetching(false);
    };

    initiateNewChat();
  }, []);

  console.log("eventDetails2", eventDetails);

  // useEffect(() => {
  //   if (chatRoomId) {
  //     async function getChatRoomInfo() {
  //       // setIsFetching(true);
  //       try {
  //         const info = await fetchChatRoomInfo(chatRoomId, token);
  //         setChatRoomInfo(info);
  //         console.log("info", info);
  //       } catch (error) {
  //         console.log('fetchChatRoomInfo', error.response.data);
  //       };
  //       // setIsFetching(false);
  //     };
  
  //     getChatRoomInfo();
  //   };
  // }, [chatRoomId]);

  // useEffect(() => {
  //   if (chatRoomId) {
  //     async function getMessages() {
  //       // setIsFetching(true);
  //       try {
  //         const messages = await fetchMessages(chatRoomId, token);
  //         setChatMessages(messages);
  //         console.log("messages", messages);
  //       } catch (error) {
  //         console.log(error.response.data);
  //       };
  //       // setIsFetching(false);
  //     };
  
  //     getMessages();
  //   };
  // }, [chatRoomId]);

  function previousStepHandler() {
    navigation.goBack();
  };

  function textInputHandler(enteredText) {
    setEnteredText(enteredText);
  };

  async function sendMessageHandler() {
    if (chatRoomId && enteredText.length) {
      let body = {
        messageType: "text",
        messageContent: enteredText,
        chatRoomId: chatRoomId
      };
      try {
        await sendMessage(body, token);
      } catch (error) {
        console.log(error.response.data);
      }; 
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <IconButton icon="arrow-left" size={24} color="black" style={styles.goBackButton} onPress={previousStepHandler}/>
        {}
        {eventParticipants && eventParticipants[0] && (
          <Image source={{uri: eventParticipants[0].user.userImage[3]}} style={styles.avatar} />
        )}
        {userInfo.userId !== eventHost.userId && (
          <Image source={{uri: eventHost.userImage[3]}} style={styles.avatar} />
        )}

        {userInfo.userId === eventHost.userId && eventParticipants && eventParticipants[0] && (
          <Text style={styles.name}>{' ' + eventParticipants[0].user.localizedfirstname + ' ' + eventParticipants[0].user.localizedlastname}</Text>
        )}
        {userInfo.userId !== eventHost.userId && (
          <Text style={styles.name}>{' ' + eventHost.localizedfirstname + ' ' + eventHost.localizedlastname}</Text>
        )}
      </View>
      <View style={styles.mainContainer}>
        <ScrollView>
          {chatRoomInfo && chatRoomInfo.closestEventId && (
            <UpcomingEventCards />
            // <UpcomingEventCards 
            //   participantsName={userInfo.userId === eventHost.userId && eventParticipants && eventParticipants[0] && eventParticipants[0].user.localizedfirstname + ' ' + eventParticipants[0].user.localizedlastname} 
            //   hostName={userInfo.userId !== eventHost.userId && eventHost.localizedfirstname + ' ' + eventHost.localizedlastname}
            // />
          )}
          <MessageList />
        </ScrollView>
      </View>

      <View style={styles.searchBar}>
        <TextInput 
          style={styles.searchInput}
          placeholder=''
          placeholderTextColor='#ADB5BD'
          onChangeText={textInputHandler}
          value={enteredText}
        />
        <Pressable onPress={sendMessageHandler}>
          <Image style={styles.logo} source={require("../assets/send-icon.png")} />
        </Pressable>
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
    marginTop: 16,
    paddingTop: 11,
    paddingHorizontal: 13,
    paddingBottom: 36,
    borderTopColor: '#EDEDED',
    borderTopWidth: 1
  },
  searchInput: {
    fontFamily: 'mulish-semibold',
    fontSize: 15,
    color: '#191919',
    borderColor: '#0000001A',
    borderWidth: 1,
    width: '90%',
    borderRadius: 6,
    padding: 8,
    marginRight: 12
  }
});