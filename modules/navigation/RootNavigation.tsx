import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';
import { observer } from 'mobx-react';
import MainTabNavigator from 'app/modules/navigation/MainTabNavigator';
import AccountsNavigator from 'app/modules/navigation/AccountsNavigator';
import EditProfileScreen from 'app/modules/profile/EditProfileScreen';
import EntryOptionsModal from 'app/modules/search/EntryOptionsModal';
import PricingOptionsModal from 'app/modules/search/PricingOptionsModal';
import UploadMusicModal from 'app/modules/profile/UploadMusicModal';
import PaymentModal from 'app/modules/profile/PaymentModal';
import WithdrawalModal from 'app/modules/profile/WithdrawalModal';
import BuyOptionsModal from 'app/modules/ui/BuyOptionsModal';
import AuthLoadingScreen from 'app/modules/accounts/AuthLoadingScreen';
import { Stores } from 'app/functions/Stores';
import { loadResourcesAsync } from 'app/functions/LoadResourcesAsync';
import { Asset } from 'expo-asset';
import { Images } from 'app/assets/images/Images';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  useLinking,
  DefaultTheme,
} from '@react-navigation/native';
import CancelEditBtn from 'app/modules/ui/CancelEditBtn';
import DoneEditBtn from 'app/modules/ui/DoneEditBtn';
import Colors from 'app/constants/Colors';

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: Colors.darkBlue,
    background: Colors.darkBlue,
  },
};

const AppStack = createStackNavigator();

export default observer(() => {
  const [loaded, setLoaded] = useState(false);
  const { sessionStore } = Stores();

  StatusBar.setBarStyle('light-content');

  const loadAssets = async () => {
    return Promise.all([Asset.loadAsync(Images), loadResourcesAsync()]);
  };

  const loadAll = async () => {
    [await loadAssets(), await sessionStore.loadSession()];
    setLoaded(true);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const ref: any = useRef();

  const { getInitialState } = useLinking(ref, {
    prefixes: ['https://skyhitz.io', 'skyhitz://'],
    config: {
      WebApp: '',
      SignUp: 'accounts/sign-up',
      SignIn: 'accounts/sign-in',
      ResetPassword: 'accounts/reset-password',
      UpdatePassword: 'accounts/update-password',
      Privacy: 'accounts/privacy',
      Terms: 'accounts/terms',
      Main: {
        screens: {
          SearchNavigator: {
            screens: {
              Search: {
                screens: {
                  Beats: 'beats',
                  Beatmakers: 'beatmakers',
                },
              },
            },
          },
          ChartsView: 'charts',
          ProfileSettings: {
            screens: {
              ProfileSettingsScreen: 'profile',
              LikesScreen: 'likes',
              MyMusicScreen: 'my-music',
            },
          },
        },
      },
      EditProfileModal: 'edit-profile',
      UploadMusicModal: 'upload',
      EntryOptionsModal: 'options',
      PaymentModal: 'payment',
    },
  });

  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    Promise.race([
      getInitialState(),
      new Promise((resolve) =>
        // Timeout in 150ms if `getInitialState` doesn't resolve
        // Workaround for https://github.com/facebook/react-native/issues/25675
        setTimeout(resolve, 50)
      ),
    ])
      .catch((e) => {
        console.error(e);
      })
      .then((state: any) => {
        if (state !== undefined) {
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  if (loaded && isReady) {
    return (
      <NavigationContainer initialState={initialState} ref={ref} theme={Theme}>
        {sessionStore.user ? (
          <AppStack.Navigator mode="modal">
            <AppStack.Screen
              name="Main"
              component={MainTabNavigator}
              options={{ headerShown: false }}
            />
            <AppStack.Screen
              name="EditProfileModal"
              component={EditProfileScreen}
              options={{
                gestureEnabled: false,
                title: 'Edit Profile',
                headerTitleStyle: { color: Colors.white },
                headerStyle: {
                  backgroundColor: Colors.headerBackground,
                  borderBottomWidth: 0,
                  shadowColor: 'transparent',
                },
                headerLeft: () => <CancelEditBtn />,
                headerRight: () => <DoneEditBtn />,
              }}
            />
            <AppStack.Screen
              name="UploadMusicModal"
              component={UploadMusicModal}
              options={{
                headerShown: false,
                gestureEnabled: false,
                cardStyle: { backgroundColor: 'transparent' },
              }}
            />

            <AppStack.Screen
              name="PaymentModal"
              component={PaymentModal}
              options={{
                headerShown: false,
                gestureEnabled: false,
                cardStyle: { backgroundColor: 'transparent' },
              }}
            />
            <AppStack.Screen
              name="WithdrawalModal"
              component={WithdrawalModal}
              options={{
                headerShown: false,
                gestureEnabled: false,
                cardStyle: { backgroundColor: 'transparent' },
              }}
            />
            <AppStack.Screen
              name="BuyOptionsModal"
              component={BuyOptionsModal}
              options={{
                headerShown: false,
                gestureEnabled: false,
                cardStyle: { backgroundColor: 'transparent' },
              }}
            />
            <AppStack.Screen
              name="EntryOptionsModal"
              component={EntryOptionsModal}
              options={{
                headerShown: false,
                cardStyle: { backgroundColor: 'transparent' },
              }}
            />
            <AppStack.Screen
              name="PricingOptionsModal"
              component={PricingOptionsModal}
              options={{
                headerShown: false,
                cardStyle: { backgroundColor: 'transparent' },
              }}
            />
          </AppStack.Navigator>
        ) : (
          <AccountsNavigator />
        )}
      </NavigationContainer>
    );
  }
  return <AuthLoadingScreen />;
});
