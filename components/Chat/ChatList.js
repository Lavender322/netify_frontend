import { FlatList, Text, StyleSheet, View } from 'react-native';
import ChatItem from './ChatItem';
import LoadingOverlay from '../ui/LoadingOverlay';

function renderChatItem(itemData) {
  return (
    <ChatItem {...itemData.item} />
  );
};

function ChatList({ chats, isFetchingChats }) {
  if (isFetchingChats) {
    return (
      <LoadingOverlay />
    )
  };

  console.log("chats", chats);

  if ((!chats || chats.length === 0) && !isFetchingChats) {
    return (
      <View style={styles.fallbackContainer}>
        <Text>
          <Text style={styles.fallback}>You don't have any existing chat.</Text>
          {/* <Text style={styles.fallbackHighlight}>Host one!</Text> */}
        </Text>
      </View>
    )
  };

  return (
    <FlatList 
      data={chats} 
      renderItem={(item) => renderChatItem(item)} 
      keyExtractor={(item) => item.chatRoomId}
    />
  )
}

export default ChatList;

const styles = StyleSheet.create({
  fallbackContainer: {
    marginHorizontal: 40,
    marginTop: 35
  },
  fallback: {
    color: '#3B4852',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'roboto',
    lineHeight: 20
  },
  fallbackHighlight: {
    fontFamily: 'roboto-bold',
    fontSize: 16,
    color: '#3C8722',
    textDecorationLine: 'underline',
    lineHeight: 20
  }
});