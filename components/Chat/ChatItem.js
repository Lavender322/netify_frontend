import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Image, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFormattedDate } from '../../utils/date';
import { fetchEvent } from '../../utils/http';
import { AuthContext } from '../../store/context/auth-context';
import LoadingOverlay from '../ui/LoadingOverlay';
import GroupProfilePictures from '../GroupProfilePictures';

function ChatItem({ chatRoomMember, chatRoomName, lastMessage, closestEventId, onPress}) {
  const [eventHostSectorTag, setEventHostSectorTag] = useState();
  const [eventHostGradeTag, setEventHostGradeTag] = useState();
  const [userChattedTo, setUserChattedTo] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventDetails, setEventDetails] = useState();

  // console.log("closestEventId", closestEventId);
  
  const navigation = useNavigation();

  // TO COMMENT OUT
  const { token, userInfo } = useContext(AuthContext);
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNmE5YTZmMy02YjZkLTQ4ZGYtOTk2OS1hZDYxYWQ3ZDlkOGEiLCJpYXQiOjE2OTE3NDU2MTYsImV4cCI6MjU1NTc0NTYxNn0.c1hFaFFIxbI0dl8xq7kCRSMP1HAUZDCmsLeIQ6HFlxMnniypZveeiv4aopwNbLcK6zvp3ofod5G1B4Pu8A7FGg';
  
  useEffect(() => {
    if (chatRoomName.startsWith('One to one')) {
      const user = chatRoomMember.filter(
        member => member.userId !== userInfo.userId
      );
      // console.log("user", user[0]);
      setUserChattedTo(user);
    } else {
      setUserChattedTo(chatRoomMember);
    };
  }, [chatRoomMember]);

  useEffect(() => {
    if (!chatRoomName.startsWith('One to one') && closestEventId) {
      async function getEventDetails() {
        // setIsFetching(true);
        try {
          const eventDetails = await fetchEvent(token, closestEventId[0]);
          setEventDetails(eventDetails);
          // console.log("eventDetails1", eventDetails);
        } catch (error) {
          console.log(error.response.data);
        };
        // setIsFetching(false);
      };
  
      getEventDetails();
    };
  }, [closestEventId, chatRoomName]);

  function directToChatDetailHandler() {
    navigation.navigate('ChatDetail', {
      // closestEventId: closestEventId,
      eventHost: eventDetails.eventHost,
      // eventParticipants: eventParticipants,
      eventId: eventId
    });
  };

  // console.log("eventHost123", chatRoomMember);
 
  // useEffect(() => {
  //   if (eventHost && eventHost.userTag) {
  //     const eventHostGradeTag = gradeTags.filter((gradeTag) => {
  //       return eventHost.userTag.includes(gradeTag.tagId.toString());
  //     });
    
  //     const eventHostSectorTag = sectorTags.filter((sectorTag) => {
  //       return eventHost.userTag.includes(sectorTag.tagId.toString());
  //     });
  
  //     setEventHostGradeTag(eventHostGradeTag[0] && eventHostGradeTag[0].tagName);
  //     setEventHostSectorTag(eventHostSectorTag[0] && eventHostSectorTag[0].tagName);
  //   };
  // }, [eventHost]);

  // console.log("chatRoomMember", lastMessage);

  return (
    <View style={styles.container}>
      <Pressable onPress={directToChatDetailHandler} style={({pressed}) => [styles.leftContainer, pressed && styles.pressed]}>
        {chatRoomName.startsWith('One to one') && userChattedTo && (
          <Image source={{uri: userChattedTo[0].userImage[3]}} style={styles.avatar} />
        )}
        {!chatRoomName.startsWith('One to one') && userChattedTo && userChattedTo.length && (
          <GroupProfilePictures host={userChattedTo[0]} participants={userChattedTo.slice(1)} isSeparate={false} />
        )}
        <View style={styles.infoOuterContainer}>
          {chatRoomName.startsWith('One to one') ? (
            <Text style={styles.name}>{userChattedTo && userChattedTo[0].localizedfirstname + ' ' + userChattedTo[0].localizedlastname}</Text>
          ) : (
            <Text style={styles.name}>{eventDetails && eventDetails.eventName}</Text>
          )}
          <Text style={styles.msg}>{lastMessage && lastMessage.content}</Text>
          <Text style={styles.time}>{lastMessage && lastMessage.messageTime}</Text>
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
    marginRight: 8,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1, 
    alignItems: 'center',
    justifyContent: 'space-between',
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
    padding: 4,
    marginRight: 30,
  },  
  name: {
    fontFamily: 'roboto-bold',
    fontSize: 16,
    color: '#1A1A1A',
  },
  msg: {
    color: '#3B4852',
    fontFamily: 'roboto',
    lineHeight: 20,
  },
  time: {
    color: '#3B4852',
    fontFamily: 'roboto-medium',
    fontSize: 11,
    lineHeight: 14
  }
});