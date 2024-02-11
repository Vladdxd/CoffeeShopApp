import React from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from './src/screens/DetailsScreen';
import TabNavigator, {RootTabParamList} from './src/navigators/TabNavigator';
import PaymentScreen from './src/screens/PaymentScreen';
import {store} from './src/store/store';
import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
export type RootStackParamList = {
  Tab: NavigatorScreenParams<RootTabParamList>;
  Details: {
    id: string;
    type: string;
  };
  Payment: undefined;
};

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_bottom',
            }}>
            <Stack.Screen name="Tab" component={TabNavigator} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
