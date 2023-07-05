/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// @ts-nocheck

import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { Box, Text } from 'react-native-design-utility';

import { gql, useQuery } from '@apollo/client';

const GET_COUNTRIES = gql`
  query ListCountry {
    countries{
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

export default function SearchBoard(): JSX.Element {

  const { loading, error, data } = useQuery(GET_COUNTRIES);


  useEffect(() => {
    console.log('DATA')
    console.log(data?.countries)
  }, [data])

  return (
    <React.Fragment>
      <Box f={1}>
        <FlatList 
        data={data?.countries ?? []}
        keyExtractor={item => item.name}
        renderItem={({item, i}) =>(
          <Box h={100} key={i} style={{
            borderBottomWidth: StyleSheet.hairlineWidth
          }} my="xs">
            <Text>{item.name}</Text>
          </Box>
        )}
        />

      </Box>
    </React.Fragment>
  );
}
