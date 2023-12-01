import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux'
import { DailyWork } from '../constants/interfaces'
import { useState } from 'react'
import { GetWeekDay } from '../constants/functions'
import CreateDay from '../components/CreateDay'

export default function MainScreen({ navigation }: any) {
  const dailyWork: any = useSelector((state: RootState) => state.dailyWork)
  const dispatch = useDispatch()

  function GetSortedDays() {
    let daysArr: any = []
    dailyWork.forEach((i: any) => {
      daysArr.push(i)
    })
    daysArr.sort((a: any, b: any) => b.timestamp - a.timestamp)
    return daysArr
  }

  function RenderDay({ item }: any) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('WorkingDayScreen', { data: item })}
        style={styles.dayBlock}
      >
        <View style={styles.rowBetween}>
          <Text style={styles.weekDay}>
            {GetWeekDay(item.year, item.month, item.date)}
          </Text>
          <Text style={styles.date}>
            {item.date}.{item.month}.{item.year}
          </Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.rowBetween}>
          <Text style={styles.stat}>Задачі: {item.tasks}</Text>
          <Text style={styles.stat}>Чати: {item.chats}</Text>
          <Text style={styles.statSum}>
            Сумарно: {item.tasks + item.chats} (
            {((item.tasks + item.chats) / 8).toFixed(2)}/год)
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#eee'} />
      {dailyWork.length ? (
        <FlatList
          style={styles.flatList}
          data={GetSortedDays()}
          renderItem={RenderDay}
        />
      ) : (
        <Text>Створіть свій перший робочий день</Text>
      )}
      <CreateDay onCreateDay={() => navigation.navigate('NewDayScreen')} />
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
  flatList: { width: '100%', overflow: 'visible' },
  dayBlock: {
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    elevation: 5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  rowBetween: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weekDay: {
    fontSize: 18,
  },
  date: {
    fontSize: 14,
    fontWeight: '300',
  },
  horizontalLine: {
    height: 1,
    width: '100%',
    backgroundColor: '#666',
    marginVertical: 5,
  },
  stat: { fontSize: 14, fontWeight: '400' },
  statSum: {
    fontSize: 14,
    fontWeight: '500',
  },
})
