import { StyleSheet, View, Text, TextInput, Image, ScrollView, Pressable } from 'react-native';

function MessageItem({ isCurrentUser, message, time }) {
  return (
    <View style={isCurrentUser ? styles.userTwoMsgContainer : styles.userOneMsgContainer}>
      <Text style={styles.msgText}>{message}</Text>
      <Text style={isCurrentUser ? styles.timeTwoText : styles.timeOneText}>{time}</Text>
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
    marginVertical: 24,
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
    marginVertical: 24,
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
});


