import { FlatList, Text, StyleSheet, View } from 'react-native';
import ChatItem from './ChatItem';
import LoadingOverlay from './ui/LoadingOverlay';

function renderChatItem(itemData, sectorTags, gradeTags) {
  return (
    <ChatItem {...itemData.item} sectorTags={sectorTags} gradeTags={gradeTags} />
  );
};

function ChatList({ chats, isFetchingChats, sectorTags, gradeTags }) {
  if (isFetchingChats) {
    return (
      <LoadingOverlay />
    )
  };

  if ((!chats || chats.length === 0) && !isFetchingChats) {
    return (
      <View style={styles.fallbackContainer}>
        <Text>
          <Text style={styles.fallback}>There are no upcoming events around you. </Text>
          <Text style={styles.fallbackHighlight}>Host one!</Text>
        </Text>
      </View>
    )
  };

  return (
    <FlatList 
      data={chats} 
      renderItem={(item) => renderChatItem(item, sectorTags, gradeTags)} 
      keyExtractor={(item) => item.id}
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