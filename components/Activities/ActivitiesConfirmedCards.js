import { FlatList, Text, StyleSheet, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../ui/LoadingOverlay';
import ActivitiesConfirmedCard from './ActivitiesConfirmedCard';

function renderActivityItem(itemData, sectorTags, gradeTags) {
  return (
    <ActivitiesConfirmedCard {...itemData.item} sectorTags={sectorTags} gradeTags={gradeTags} />
  );
};

function ActivitiesConfirmedCards({ activities, isFetchingActivities, sectorTags, gradeTags }) {
  const navigation = useNavigation();
  
  function redirectHandler() {
    navigation.navigate('CreateEvent');
  };

  if (isFetchingActivities) {
    return (
      <LoadingOverlay />
    )
  };

  if ((!activities || activities.length === 0) && !isFetchingActivities) {
    return (
      <View style={styles.fallbackContainer}>
        <Text>
          <Text style={styles.fallback}>There are no upcoming events around you. </Text>
          <Pressable onPress={redirectHandler}>
          <Text style={styles.fallbackHighlight}>Host one!</Text>
          </Pressable>
        </Text>
      </View>
    )
  };

  return (
    <FlatList 
      data={activities} 
      renderItem={(item) => renderActivityItem(item, sectorTags, gradeTags)} 
      keyExtractor={(item) => item.id}
    />
  )
}

export default ActivitiesConfirmedCards;

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
    lineHeight: 20,
    marginTop: 4
  }
});