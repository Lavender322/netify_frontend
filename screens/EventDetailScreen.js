import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';
import IconButton from '../components/ui/IconButton';
import { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';

function EventDetailScreen({ navigation }) {
  function previousStepHandler() {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <IconButton icon="arrow-left" size={24} color="black" style={styles.goBackButton} onPress={previousStepHandler}/>
      <ScrollView style={styles.mainContainer}>
        <Text style={styles.headerText}>Finance coffee chat</Text> 
        <Image source={require('../assets/avatar.png')} style={styles.avatar} />
        <Text style={styles.name}>Albina Ranniaia</Text>
        <View style={[styles.detailInnerContainer, styles.roleContainer]}>
          <Text style={styles.grade}>Director</Text>
          <View style={styles.sectorContainer}>
            <Text style={styles.sector}>EUMI</Text>
          </View>
        </View>
        <View style={styles.detailInnerContainer}>
          <Feather name="calendar" size={18} color="#3C8722" />
          <Text style={styles.period}>12:00 - 12:30</Text>
          <Text style={styles.date}>Thu, Jul 11</Text>
        </View>
        <View style={[styles.detailInnerContainer, styles.locationContainer]}>
          <Feather name="map-pin" size={18} color="black" />
          <Text style={styles.location}>London</Text>
        </View>
        <Text style={styles.detail}>Hello there! I'm Albina, a passionate financial professional eager to connect with you over a coffee chat. Let's discuss anything finance-related, be it investments, budgeting, or career advice. I'm here to share insights and support your financial goals. Together, we can navigate the complexities of the financial world and unlock opportunities. So, don't hesitate – book a coffee chat with me today.</Text>      
      </ScrollView>
      <View style={styles.submitFormContainer}>
        <Pressable onPress={() => {}} style={({pressed}) => pressed && styles.pressed}>
          <View style={styles.submitBtnContainer}>
            <Text style={styles.submitBtnText}>Book this session</Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

export default EventDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },
  goBackButton: {
    marginTop: 56,
    marginLeft: 16
  },
  mainContainer: {
    padding: 16,
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  headerText: {
    marginTop: 32,
    fontSize: 28,
    fontFamily: 'roboto-bold'
  },
  avatar: {
    width: 120,
    height: 120,
    marginVertical: 36
  },
  name: {
    fontFamily: 'roboto-bold',
    fontSize: 20,
    color: '#000000E5'
  },
  detailInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },  
  roleContainer: {
    marginTop: 12,
    marginBottom: 16
  },
  grade: {
    fontFamily: 'roboto-medium',
    fontSize: 16,
    color: '#000000E5',
    marginRight: 12
  },
  sectorContainer: {
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: '#E6E6E6'
  },
  sector: {
    color: '#3B4852',
    fontFamily: 'roboto-medium'
  },
  period: {
    color: '#3C8722',
    fontFamily: 'roboto-medium',
    fontSize: 16,
    marginHorizontal: 8
  },
  date: {
    color: '#3C8722',
    fontFamily: 'roboto-medium',
    fontSize: 16
  },
  locationContainer: {
    marginTop: 8,
    marginBottom: 16
  },
  location: {
    fontFamily: 'roboto-medium',
    fontSize: 16,
    color: '#191919',
    marginLeft: 4
  },
  detail: {
    color: '#4F4F4F',
    fontFamily: 'roboto',
    lineHeight: 22,
    fontSize: 15
  },
  submitFormContainer: {
    paddingBottom: 80,
    paddingTop: 16,
    paddingHorizontal: 12,
    backgroundColor: 'white'
  },
  submitFormText: {
    fontSize: 16,
    color: '#000000E5',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'roboto'
  },
  submitBtnContainer: {
    backgroundColor: '#1A4821',
    borderRadius: 8,
    paddingVertical: 13,
  },
  submitBtnText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'roboto-medium',
    textAlign: 'center'
  },
  pressed: {
    opacity: 0.75
  }
});