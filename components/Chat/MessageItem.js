import { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Image, ScrollView, Pressable } from 'react-native';
import { AuthContext } from '../../store/context/auth-context';
import { getFormattedMessageTime, getFormattedMessageDate } from '../../utils/date';

function MessageItem({ id, senderId, content, messageTime, isSameMessageTime }) {
  const [isCurrentUser, setIsCurrentUser] = useState();

  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    if (userInfo.userId === senderId) {
      setIsCurrentUser(true);
    } else {
      setIsCurrentUser(false);
    };
  }, []);

  return (
    <View>
      {isSameMessageTime ? (
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{getFormattedMessageDate(messageTime)}</Text>
        </View>
      ) : null}
      <View style={isCurrentUser ? styles.userTwoMsgContainer : styles.userOneMsgContainer}>
        <Text style={styles.msgText}>{content}</Text>
        <Text style={isCurrentUser ? styles.timeTwoText : styles.timeOneText}>{getFormattedMessageTime(messageTime)}</Text>
      </View>
    </View>
  )
};

export default MessageItem;

const styles = StyleSheet.create({
  userOneMsgContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 16,
    padding: 10,
    marginBottom: 24,
    marginLeft: 35,
    marginRight: 65
  },
  msgText: {
    fontFamily: 'roboto',
    fontSize: 15,
    lineHeight: 24,
    color: '#0F1828'
  },
  timeOneText: {
    color: '#ADB5BD',
    fontFamily: 'lato',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4
  },
  userTwoMsgContainer: {
    backgroundColor: '#8AD86F',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 0,
    padding: 10,
    marginBottom: 24,
    marginLeft: 65,
    marginRight: 35
  },
  timeTwoText: {
    color: '#313F4E',
    fontFamily: 'lato',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
    textAlign: 'right'
  },
  timeContainer: {
    borderRadius: 19,
    marginBottom: 24,
    backgroundColor: '#E0F2DA',
    alignSelf: 'center'
  },
  time: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontFamily: 'roboto-medium',
    fontSize: 11,
    lineHeight: 14,
    color: '#3B4852'
  },
});


