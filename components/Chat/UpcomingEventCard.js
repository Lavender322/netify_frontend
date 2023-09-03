import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';

function UpcomingEventCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your upcoming session with 
        <Text style={styles.match}>
          {/* {eventParticipants[0].user.localizedfirstname + ' ' + eventParticipants[0].user.localizedlastname} */}
        </Text>
      </Text>
    </View>
  )
}

export default UpcomingEventCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#0000001A',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  title: {
    color: '#1A1A1A',
    fontSize: 17,
    fontFamily: 'roboto-bold',
    lineHeight: 21.8
  },
  match: {
    color: '#3C8722'
  },
});