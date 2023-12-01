import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { GetWeekDay } from '../constants/functions'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux'
import { DailyWork } from '../constants/interfaces'
import { updateDailyWork } from '../redux/dailyWork'
import StatBlock from '../components/StatBlock'
import DangeroudBlock from '../components/DangeroudBlock'
import SwipeToDelete from '../components/SwipeToDelete'

export default function WorkingDayScreen({ route, navigation }: any) {
  const dailyWork = useSelector((state: RootState) => state.dailyWork)
  const userInfo = useSelector((state: RootState) => state.userInfo)

  const dispatch = useDispatch()

  function DeleteDay() {
    let newDailyWork: any = []
    dailyWork.forEach((d: DailyWork) => {
      if (d.timestamp !== route.params.data.timestamp) {
        newDailyWork.push(d)
      }
    })
    navigation.goBack()

    dispatch(updateDailyWork(newDailyWork))
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#eee'} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={40} color="black" />
        </TouchableOpacity>
        <Text style={styles.weekDay}>
          {GetWeekDay(
            route.params.data.year,
            route.params.data.month,
            route.params.data.date
          )}
        </Text>
        <View style={styles.backButton}></View>
      </View>
      <Text style={styles.date}>
        {route.params.data.date}.{route.params.data.month}.
        {route.params.data.year}
      </Text>
      <StatBlock data={route.params.data} />
      <View style={{ flex: 1 }}></View>

      <SwipeToDelete
        title="Видалити робочий день"
        action={DeleteDay}
        icon="trash-outline"
      />
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
    paddingBottom: 50,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBlockColor: '#666',
    marginBottom: 10,
    paddingHorizontal: 20,
    height: 70,
  },
  weekDay: {
    fontSize: 24,
  },
  date: { fontSize: 18 },
  backButton: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  horizontalLine: {
    height: 0,
    width: '92%',
    backgroundColor: '#666',
  },
})
