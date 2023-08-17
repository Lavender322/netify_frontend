import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import VisibilityFilterItem from './VisibilityFilterItem';

function VisibilityFilter({ style, filters, selectFilters, setSelectedFilter, setUpdateEventList }) {

  function filterChangeHandler(isChecked, filterId) {
    // if (isChecked) {
    //   if (filterId) {
    //     setSelectedFilter(prev => [...prev, filterId]);
    //   }
    // } else {
    //   setSelectedFilter(prev => prev.filter((filter) => filter !== filterId));
    // };
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.filtersContainer}>
        {filters.map((filter, idx) => (
          <VisibilityFilterItem 
            key={filter.id ? filter.id : 50+idx}
            filter={filter} 
            // isFilterChecked={filterChangeHandler} 
          />
        ))}
      </View>
      <View style={styles.allFiltersContainer}>
        <VisibilityFilterItem 
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
    // boxShadow: '0 0 45 0 ',
    shadowColor: '#0000001A',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    width: '97%'

  },
  filtersContainer: {
    padding: 8,
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1
  },
  allFiltersContainer: {
    padding: 8
  },
  pressed: {
    opacity: 0.75
  }
});