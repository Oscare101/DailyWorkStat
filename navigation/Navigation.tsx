import React, { useEffect } from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack'
import MainScreen from '../screens/MainScreen'
import LaunchScreen from '../screens/LaunchScreen'
import WorkingDayScreen from '../screens/WorkingDayScreen'
import { useSelector } from 'react-redux'
import { RootState } from '../redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import NewDayScreen from '../screens/NewDayScreen'
import StatisticsScreen from '../screens/StatisticsScreen'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

export default function Navigation() {
  const dailyWork = useSelector((state: RootState) => state.dailyWork)

  async function SaveNewData() {
    await AsyncStorage.setItem('workData', JSON.stringify(dailyWork))
  }

  useEffect(() => {
    SaveNewData()
  }, [dailyWork])

  function TabBar({ state, navigation }: any) {
    const bottomTabData = [
      {
        title: 'Розклад',
        iconActive: 'list',
        iconInactive: 'list',
        action: () => {
          navigation.navigate('MainNavigation', {
            screen: 'MainScreen',
            initial: false,
          })
        },
      },

      {
        title: 'Статистика',
        iconActive: 'stats-chart',
        iconInactive: 'stats-chart-outline',
        action: () => {
          navigation.navigate('StatisticsNavigation', {
            screen: 'StatisticsScreen',
            initial: false,
          })
        },
      },
    ]

    return (
      <View
        style={{
          flexDirection: 'row',
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          elevation: 5,
          borderTopWidth: 1,
          borderColor: '#eee',
        }}
      >
        {bottomTabData.map((item: any, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              item.action()
            }}
            activeOpacity={0.8}
            style={{
              width: '33%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
              height: '100%',
            }}
          >
            {state.index === index ? (
              <Ionicons name={item.iconActive} size={24} color={'#000'} />
            ) : (
              <Ionicons name={item.iconInactive} size={24} color={'#000'} />
            )}
            <Text>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  function StatisticsNavigation() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="StatisticsScreen"
          component={StatisticsScreen}
        />
      </Stack.Navigator>
    )
  }

  function MainNavigation() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="MainScreen"
          component={MainScreen}
        />
      </Stack.Navigator>
    )
  }

  function NavigationApp() {
    return (
      <Tab.Navigator tabBar={(props: any) => <TabBar {...props} />}>
        <Tab.Screen
          name="MainNavigation"
          component={MainNavigation}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="StatisticsNavigation"
          component={StatisticsNavigation}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    )
  }

  const navigation = (
    <Stack.Navigator initialRouteName="LaunchScreen">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="LaunchScreen"
        component={LaunchScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="NavigationApp"
        component={NavigationApp}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animationEnabled: true,
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="WorkingDayScreen"
        component={WorkingDayScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animationEnabled: true,
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="NewDayScreen"
        component={NewDayScreen}
      />
    </Stack.Navigator>
  )

  return <>{navigation}</>
}
