import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import VisibilityFilterItem from './VisibilityFilterItem';

function VisibilityFilter({ filters, selectFilters, setSelectedFilter, setUpdateEventList }) {

  function filterChangeHandler(isChecked, filterId) {
    // if (isChecked) {
    //   if (filterId) {
    //     setSelectedFilter(prev => [...prev, filterId]);
    //   }
    // } else {
    //   setSelectedFilter(prev => prev.filter((filter) => filter !== filterId));
    // };
  };

  console.log("filters", filters);

  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        {filters.map((filter, idx) => (
          <VisibilityFilter 
            key={filter.id ? filter.id : 50+idx}
            filter={filter} 
            // isFilterChecked={filterChangeHandler} 
          />
        ))}
      </View>
      <View style={styles.requestContainer}>
        <VisibilityFilter 
          // key={filter.id ? filter.id : 50+idx}
          filter='All' 
          // isFilterChecked={filterChangeHandler} 
          isAll={true}
        />
      </View>

      {/* <Pressable style={({pressed}) => pressed && styles.pressed} onPress={handleUpdateEvents}>
        
      </Pressable> */}
    </View>
  )
}

export default VisibilityFilter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  filtersContainer: {
    padding: 8,
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1
  },
  requestContainer: {
    backgroundColor: '#1A4821',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 23,
    marginVertical: 16,
    marginHorizontal: 8,  
  },
  requestText: {
    color: '#A6E291',
    fontSize: 16,
    fontFamily: 'roboto',
    textAlign: 'center'
  },
  pressed: {
    opacity: 0.75
  }
});