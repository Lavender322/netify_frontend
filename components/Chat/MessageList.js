import { FlatList, Text, StyleSheet, View } from 'react-native';
import MessageItem from "./MessageItem";

function MessageList({ chatMessages }) {
  console.log('chatMessages', chatMessages);
  if (chatMessages && chatMessages.length) {
    return (
      <View style={styles.timeContainer}>
        <Text style={styles.time}>22 June 2023 BST</Text>
      </View>
    )
  }
};

export default MessageList;

const styles = StyleSheet.create({
  timeContainer: {
    alignItems: 'center',
    borderRadius: 19,
    
  },
  time: {
    backgroundColor: '#E0F2DA',
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontFamily: 'roboto-medium',
    fontSize: 11,
    lineHeight: 14,
    color: '#3B4852'
  },
});