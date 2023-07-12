/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// @ts-nocheck

import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Box, Text } from 'react-native-design-utility';

import { gql, useQuery } from '@apollo/client';
import { IMAGES } from '../../utils/images';
import { theme } from '../../theme';
import { client } from '../../../App';
import { GET_COUNTRIES } from '../../queries';


export default function SearchBoard(): JSX.Element {

  const { loading, error, data } = useQuery(GET_COUNTRIES);


  const [countries, setCountries] = useState(data?.countries)
  
  const [keyword, setKeyword] = useState(null) 


  useEffect( () => {
    const debounce = setTimeout(() => {
      console.log(`SEARCH FOR COUNTRY ${keyword}`);
      if(keyword){
        getCountryByKeyword()
      }else{
        setCountries(data?.countries)
      }
    }, 200);

    return () => clearTimeout(debounce)
  }, [keyword])

  const getCountryByKeyword = async () => {
    const response = await client.query({
      query: SEARCH_COUNTRY,
      variables: {
        filter: {
          code: {
            eq: `${keyword?.toUpperCase()}`,
          },
        },
      },
    });

    if(response?.data?.countries?.length > 0){
      setCountries(response?.data?.countries)
    }else{
      setCountries([])
    }

    // console.log('SEARCH RESULT')
    // console.log(data)
  }


  const Header = () => {
    return (
      <Box dir='row'  align='center' justify='center' f={1} mx='xs'
      style={{
        borderWidth: 1,
        borderColor: theme.color.greyLight,
        borderRadius: theme.radius.xs,
        backgroundColor: theme.color.white,
        marginBottom: theme.space.xs
      }}
      >
        <Image 
        source={IMAGES.search}
        style={{
          height: theme.text.size.md,
          width: theme.text.size.md,
          resizeMode: 'contain'
        }}
        />
        <TextInput 
        value={keyword}
        maxLength={3}
        placeholder='Search by country code'
        onChangeText={(e) => onSearchChange(e)}
        style={{
          width: '90%',
          minHeight: 32,
          marginLeft: theme.space.xs
        }}
        />
      </Box>
    )
  }

  const ListEmpty = () => {
    return (
      <Box f={1} align='center' center>
        <Text color='grey'>No result found.</Text>
      </Box>
    )
  }


  const onSearchChange = useCallback((e: string) => {
    setKeyword(e)
  },[keyword]);

  const onPressCountry = useCallback((item: any) => {
    Alert.alert("Info", `
    Name: ${item.name} \n
    Currency: ${item.currency} \n
    Logo: ${item.emoji}
    `)
  },[])

  return (
    <React.Fragment>      
      <Box f={1}>
        <FlatList 
        stickyHeaderIndices={[0]}
        ListHeaderComponent={Header()}
        data={countries ? countries : data?.countries ? data?.countries :[]}
        keyExtractor={item => item.name}
        renderItem={({item, i}) =>(
          <TouchableOpacity onPress={() => onPressCountry(item)}>
            <Box h={35} key={i} dir="row" style={{
              borderBottomWidth: StyleSheet.hairlineWidth
            }} my="xs" px="xs">
              <Text>{item.emoji}</Text>
              <Text>{item.name}</Text>
            </Box>
          </TouchableOpacity>
        )}
        ListEmptyComponent={ListEmpty()}
        />

      </Box>
    </React.Fragment>
  );
}
