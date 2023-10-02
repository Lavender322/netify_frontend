import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, Image, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import IconButton from '../components/ui/IconButton';
import UpcomingEventCards from '../components/Chat/UpcomingEventCards';
import { AuthContext } from '../store/context/auth-context';
import { createNewChat, fetchMessages, sendMessage, fetchChatRoomInfo } from '../utils/http';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function ChatDetailScreen({ navigation, route }) {
  const eventDetails = route.params && route.params.eventDetails;
  const eventParticipants = route.params && route.params.eventParticipants;
  const eventHost = route.params && route.params.eventHost;
  const closestEventId = route.params && route.params.closestEventId;
  const eventId = route.params && route.params.eventId;
  const eventType = route.params && route.params.eventType;
  const eventName = route.params && route.params.eventName;
  const alreadyParticipatedNumber = route.params && route.params.alreadyParticipatedNumber;

  const [chatRoomId, setChatRoomId] = useState();
  const [chatRoomInfo, setChatRoomInfo] = useState();
  const [chatMessages, setChatMessages] = useState();
  const [enteredText, setEnteredText] = useState('');
  const [isFetchingMessages, setIsFetchingMessages] = useState(true);
  const [isInitiating, setIsInitiating] = useState(true);
  const [isFetchingInfo, setIsFetchingInfo] = useState(true);

  const { token, userInfo } = useContext(AuthContext);

  useEffect(() => {
    async function initiateNewChat() {
      setIsInitiating(true);
      try {
        const id = await createNewChat(eventId, token);
        setChatRoomId(id);
      } catch (error) {
        console.log("createNewChat", eventId, error.response.data);
      };
      setIsInitiating(false);
    };

    initiateNewChat();
  }, []);

  useEffect(() => {
    if (chatRoomId) {
      async function getChatRoomInfo() {
        setIsFetchingInfo(true);
        try {
          const info = await fetchChatRoomInfo(chatRoomId, token);
          setChatRoomInfo(info);
          // console.log("info", info);
        } catch (error) {
          console.log('fetchChatRoomInfo', error.response.data);
        };
        setIsFetchingInfo(false);
      };
  
      getChatRoomInfo();
    };
  }, [chatRoomId]);

  useEffect(() => {
    if (chatRoomId) {
      async function getMessages() {
        setIsFetchingMessages(true);
        try {
          const messages = await fetchMessages(chatRoomId, token);
          setChatMessages(messages);
          // console.log("messages", messages);
        } catch (error) {
          console.log(error.response.data);
        };
        setIsFetchingMessages(false);
      };
  
      getMessages();
    };
  }, [chatRoomId]);

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
        setEnteredText('');
        var newMessage = {
          content: enteredText,
          senderId: userInfo.userId,
          messageTime: new Date()
        };
        setChatMessages(prev => [...prev, newMessage]);
        await sendMessage(body, token);
      } catch (error) {
        console.log('sendMessage', error.response.data);
      }; 
    };
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <IconButton icon="arrow-left" size={24} color="black" style={styles.goBackButton} onPress={previousStepHandler}/>
          {eventType === 'GROUP_EVENT' ? (
            <>
              <Text numberOfLines={1} style={[styles.name, styles.chatName]}>{eventName ? eventName : eventDetails.eventName}</Text>
              <Text style={[styles.name, styles.leftGap]}>{alreadyParticipatedNumber ? '(' + alreadyParticipatedNumber + ')' : '(' + eventDetails.alreadyParticipatedNumber + ')'}</Text>
            </>
          ) : (
            <>
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
            </>
          )}
        </View>
        {!(!isFetchingInfo && !isInitiating && !isFetchingMessages) ? (
          <LoadingOverlay />
        ) : (
          <>
            <View style={styles.mainContainer}>
              {chatRoomInfo && (
                <UpcomingEventCards 
                  closestEventId={chatRoomInfo.closestEventId} 
                  chatMessages={chatMessages} 
                />
              )}
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
          </>
        )}
      </View>
    </KeyboardAvoidingView>
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
  leftGap: {
    marginLeft: 8
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
  },
  chatName: {
    maxWidth: 190
  }
});