import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import MessageItem from "./MessageItem";
import LoadingOverlay from '../ui/LoadingOverlay';
import { checkWhetherSameDate, getFormattedMessageDate } from '../../utils/date';

function renderMessageItem(itemData, isSameMessageTime) {
  return (
    <MessageItem {...itemData} isSameMessageTime={isSameMessageTime} />
  );
};

function MessageList({ chatMessages, isFetchingMessages }) {
  if (isFetchingMessages) {
    return (
      <LoadingOverlay />
    )
  };

  const [chatMessageTime, setChatMessageTime] = useState([]);
  const [isSameMessageTime, setIsSameMessageTime] = useState([]);
  const [isFormatting, setIsFormatting] = useState(true);

  useEffect(() => {
    setIsFormatting(true);
    chatMessages.map(message => {
      setChatMessageTime(prev => [...prev, getFormattedMessageDate(message.messageTime)])
    });
    setIsFormatting(false);
  }, []);

  useEffect(() => {
    if (!isFormatting && chatMessageTime.length) {
      setIsSameMessageTime(checkWhetherSameDate(chatMessageTime));  
    };
  }, [isFormatting]);
 
  // console.log('chatMessages', chatMessages);
  if (chatMessages && chatMessages.length && isSameMessageTime) {
    return (
      <FlatList 
        data={chatMessages} 
        renderItem={({item, index}) => renderMessageItem(item, isSameMessageTime[index])} 
        keyExtractor={(item) => item.id}
      />
    )
  };
};

export default MessageList;