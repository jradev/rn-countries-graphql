/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import SearchBoard from './src/views/search-board';
import { UtilityThemeProvider } from 'react-native-design-utility';
import { theme } from './src/theme';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';


// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com',
  cache: new InMemoryCache()
});


function App(): JSX.Element {

  return (
    <SafeAreaView style={{ flex: 1}}>
      <ApolloProvider client={client}>
        <UtilityThemeProvider theme={theme}>
          <SearchBoard />
        </UtilityThemeProvider>
       </ApolloProvider>
    </SafeAreaView>
  );
}


export default App;
