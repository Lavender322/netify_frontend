import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Image, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFormattedDate } from '../../utils/date';
import { joinEvent } from '../../utils/http';
import { AuthContext } from '../../store/context/auth-context';
import LoadingOverlay from '../ui/LoadingOverlay';

function ChatItem({ chatRoomMember, chatRoomName, lastMessage, onPress}) {
  const [eventHostSectorTag, setEventHostSectorTag] = useState();
  const [eventHostGradeTag, setEventHostGradeTag] = useState();
  const [userChattedTo, setUserChattedTo] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  function eventDetailHandler() {
    navigation.navigate('EventDetail', {
      eventId: eventId,
      sectorTags: sectorTags,
      gradeTags: gradeTags
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

  async function requestToJoinEventHandler(token, eventId) {
    setIsSubmitting(true);
    try {
      await joinEvent(token, eventId);
      setEventStatus('REQUESTED');
    } catch (error) {
      console.log("error", error);
      // setError('Could not save data - please try again later!');
    };
    setIsSubmitting(false);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={eventDetailHandler} style={({pressed}) => [styles.leftContainer, pressed && styles.pressed]}>
        {chatRoomName.startsWith('One to one') && userChattedTo && (
          <Image source={{uri: userChattedTo[0].userImage[3]}} style={styles.avatar} />
        )}
        {!chatRoomName.startsWith('One to one') && userChattedTo && userChattedTo.length === 2 && (
          <View style={styles.twoImages}>
            <Image source={{uri: userChattedTo[0].userImage[3]}} style={styles.smallAvatar} />
            <Image source={{uri: userChattedTo[0].userImage[3]}} style={styles.smallAvatar} />
          </View>
        )}
        {!chatRoomName.startsWith('One to one') && userChattedTo && userChattedTo.length === 3 && (
          <View style={styles.threeImages}>
            <Image source={{uri: userChattedTo[0].userImage[3]}} style={styles.smallAvatar} />
            <Image source={{uri: userChattedTo[0].userImage[3]}} style={styles.smallAvatar} />
            <Image source={{uri: userChattedTo[0].userImage[3]}} style={styles.smallAvatar} />
          </View>
        )}
        {!chatRoomName.startsWith('One to one') && userChattedTo && userChattedTo.length >= 4 && (
          <View style={styles.fourImages}>
            <Image source={{uri: userChattedTo[0].userImage[3]}} style={styles.smallAvatar} />
            <Image source={{uri: userChattedTo[0].userImage[3]}} style={styles.smallAvatar} />
            <Image source={{uri: userChattedTo[0].userImage[3]}} style={styles.smallAvatar} />
            <Image source={{uri: userChattedTo[0].userImage[3]}} style={styles.smallAvatar} />
          </View>
        )}
        <View style={styles.infoOuterContainer}>
          <Text style={styles.name}>{userChattedTo && userChattedTo[0].localizedfirstname + ' ' + userChattedTo[0].localizedlastname}</Text>
          <Text style={styles.msg}>Thanks for checking the locati...</Text>
          <Text style={styles.time}>15 mins ago</Text>
          <View style={styles.infoInnerContainer}>
            {/* <Text style={styles.period}>{eventStartTime.substring(11,16) + ' - ' + eventEndTime.substring(11,16)}</Text>
            <Text style={styles.date}>{getFormattedDate(eventStartTime)}</Text> */}
          </View>
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