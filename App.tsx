import React from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from './src/screens/DetailsScreen';
import TabNavigator, {RootTabParamList} from './src/navigators/TabNavigator';
import PaymentScreen from './src/screens/PaymentScreen';
import {persistor, store} from './src/store/store';
import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {IProductWithQuantity} from './src/interface/data';
import SplashScreen from 'react-native-splash-screen';
import {PersistGate} from 'redux-persist/integration/react';
import {View} from 'react-native';
import {COLORS} from './src/theme/theme';

export type RootStackParamList = {
  Tab: NavigatorScreenParams<RootTabParamList>;
  Details: {
    id: string;
    type: string;
  };
  Payment: {
    productInCart: IProductWithQuantity[];
  };
};

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate
          loading={
            <View
              style={{flex: 1, backgroundColor: COLORS.primaryBlackHex}}></View>
          }
          persistor={persistor}>
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
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
