import { useEffect } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { updateDailyWork } from '../redux/dailyWork'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DailyWork, UserInfo } from '../constants/interfaces'
import { RootState } from '../redux'
import { updateUserInfo } from '../redux/userInfo'

export default function LaunchScreen({ navigation }: any) {
  const dailyWork = useSelector((state: RootState) => state.dailyWork)
  const userInfo = useSelector((state: RootState) => state.userInfo)

  const dispatch = useDispatch()

  function GetTimeStanp() {
    return new Date(
      `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`
    )
      .getTime()
      .toString()
  }

  async function GetData() {
    const workDataStorage = await AsyncStorage.getItem('workData')
    if (workDataStorage !== null && JSON.parse(workDataStorage).length) {
      dispatch(updateDailyWork(JSON.parse(workDataStorage)))
    } else {
      const temporary: DailyWork[] = [
        {
          timestamp: GetTimeStanp(),
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          date: new Date().getDate(),
          tasks: 0,
          chats: 0,
          workingDay: true,
        },
      ]
      await AsyncStorage.setItem('workData', JSON.stringify(temporary))
      dispatch(updateDailyWork(temporary))
    }

    const userInfoStorage = await AsyncStorage.getItem('userInfo')
    if (userInfoStorage !== null) {
      dispatch(updateUserInfo(JSON.parse(userInfoStorage)))
    } else {
      const temporary: UserInfo = {
        tasksAmount: 60,
      }

      await AsyncStorage.setItem('userInfo', JSON.stringify(temporary))
      dispatch(updateUserInfo(temporary))
    }
  }

  useEffect(() => {
    if (dailyWork.length > 0 && userInfo.tasksAmount) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'NavigationApp' }],
      })
    }
  }, [dailyWork])

  useEffect(() => {
    GetData()
  }, [])
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#eee'} />

      <Text>loading</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#eee',
    flex: 1,
  },
})
