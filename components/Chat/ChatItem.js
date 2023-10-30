import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Image, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFormattedDate, getFormattedChatTime } from '../../utils/date';
import { fetchEvent } from '../../utils/http';
import { AuthContext } from '../../store/context/auth-context';
import LoadingOverlay from '../ui/LoadingOverlay';
import GroupProfilePictures from '../GroupProfilePictures';

function ChatItem({ chatRoomId, chatRoomType, chatRoomMember, chatRoomName, lastMessage, closestEventId, currentUserUnReadMessage, totalMessage, onPress}) {
  const [eventHostSectorTag, setEventHostSectorTag] = useState();
  const [eventHostGradeTag, setEventHostGradeTag] = useState();
  const [userChattedTo, setUserChattedTo] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventDetails, setEventDetails] = useState();
  const [isFetching, setIsFetching] = useState(true);
  
  const navigation = useNavigation();

  // TO COMMENT OUT
  const { token, userInfo } = useContext(AuthContext);
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';
  
  useEffect(() => {
    setIsFetching(true);
    if (chatRoomType === 'ONE_TO_ONE_CHAT') {
      const user = chatRoomMember.filter(
        member => member.userId !== userInfo.userId
      );
      setUserChattedTo(user);
    } else {
      setUserChattedTo(chatRoomMember);
    };
    setIsFetching(false);
  }, [chatRoomMember]);

  useEffect(() => {
    if (chatRoomType === 'GROUP_EVENT_CHAT') {
      async function getEventDetails() {
        setIsFetching(true);
        try {
          const eventDetails = await fetchEvent(token, chatRoomId);
          setEventDetails(eventDetails);
        } catch (error) {
          console.log('fetchEvent', error);
          console.log(error.response.data);
        };
        setIsFetching(false);
      };
  
      getEventDetails();
    };
  }, [closestEventId, chatRoomName]);

  function directToChatDetailHandler() {
    navigation.navigate('ChatDetail', {
      eventHost: chatRoomType === 'ONE_TO_ONE_CHAT' ? userChattedTo[0] : eventDetails.eventHost,
      eventDetails: eventDetails,
      eventId: chatRoomId,
      eventType: chatRoomType === 'ONE_TO_ONE_CHAT' ? 'ONE_TO_ONE' : 'GROUP_EVENT',
    });
  };

  if (!isFetching && !userChattedTo.length) {
    return <View></View>
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={directToChatDetailHandler} style={({pressed}) => [styles.leftContainer, pressed && styles.pressed]}>
        {chatRoomType === 'ONE_TO_ONE_CHAT' && userChattedTo && userChattedTo.length ? (
          <View style={styles.avatarContainer}>
            <Image source={{uri: userChattedTo[0].userImage[3]}} style={styles.avatar} />
            {currentUserUnReadMessage !== 0 && (
              <View style={styles.greenDot}></View>
            )}
          </View>
        ) : null}
        {chatRoomType === 'GROUP_EVENT_CHAT' && userChattedTo && userChattedTo.length ? (
          <GroupProfilePictures host={userChattedTo[0]} participants={userChattedTo.slice(1)} isSeparate={false} currentUserUnReadMessage={currentUserUnReadMessage} />
        ) : null}
        <View style={styles.infoOuterContainer}>
          {chatRoomType === 'ONE_TO_ONE_CHAT' && userChattedTo && userChattedTo.length ? (
            <Text numberOfLines={1} style={styles.name}>{userChattedTo[0].localizedfirstname + ' ' + userChattedTo[0].localizedlastname}</Text>
          ) : null}
          {chatRoomType === 'GROUP_EVENT_CHAT' && eventDetails ? (
            <Text numberOfLines={1} style={styles.name}>{eventDetails.eventName}</Text>
          ) : null}
          {lastMessage ? (
            <Text numberOfLines={1} style={styles.msg}>{lastMessage.content}</Text>
          ) : null}
          {lastMessage ? (
            <Text style={styles.time}>{getFormattedChatTime(lastMessage.messageTime)}</Text>
          ) : null}
        </View>
      </Pressable>
    </View>
  )
}

export default ChatItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1, 
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  twoImages: {
    width: 64,
    height: 64,
    marginRight: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  threeImages: {
    width: 64,
    height: 64,
    marginRight: 6,
  },
  fourImages: {
    width: 64,
    height: 64,
    marginRight: 6,
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 30
  },
  smallAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  infoOuterContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 4,
    marginRight: 70
  },  
  name: {
    fontFamily: 'roboto-bold',
    fontSize: 16,
    color: '#1A1A1A',
  },
  msg: {
    color: '#3B4852',
    fontFamily: 'roboto',
    fontSize: 15,
    lineHeight: 20,
    flexShrink: 1,
    marginVertical: 4
  },
  time: {
    color: '#3B4852',
    fontFamily: 'roboto-medium',
    fontSize: 11,
    lineHeight: 14
  },
  avatarContainer: {
    position: 'relative'
  },
  greenDot: {
    position: 'absolute',
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#2CC069',
    borderWidth: 2,
    borderColor: '#FFFFFF'
  }
});