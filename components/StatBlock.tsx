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

export default function StatBlock(props: any) {
  const dailyWork = useSelector((state: RootState) => state.dailyWork)
  const userInfo = useSelector((state: RootState) => state.userInfo)
  const dispatch = useDispatch()

  function GetTasks() {
    const todaySat = dailyWork.find(
      (d: DailyWork) =>
        d.year === props.data.year &&
        d.month === props.data.month &&
        d.date === props.data.date
    )
    return todaySat
  }

  function StatChange(type: string, value: number) {
    const newDailyWork = dailyWork.map((d: DailyWork) => {
      if (
        d.year === props.data.year &&
        d.month === props.data.month &&
        d.date === props.data.date
      ) {
        return {
          ...d,
          tasks:
            type === 'task' && d.tasks !== undefined
              ? d.tasks + value < 0
                ? 0
                : d.tasks + value
              : d.tasks,
          chats:
            type === 'chat' && d.chats !== undefined
              ? d.chats + value < 0
                ? 0
                : d.chats + value
              : d.chats,
        }
      } else {
        return d
      }
    })
    dispatch(updateDailyWork(newDailyWork))
  }

  return (
    <>
      <View style={styles.statBlok}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="checkbox-outline" size={24} color="black" />
          <Text style={styles.statText}>Задачі: </Text>
          <Text style={styles.statValue}>{GetTasks()?.tasks || 0}</Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={[styles.statChangeButton, { backgroundColor: '#c4dbff' }]}
              activeOpacity={0.8}
              onPress={() => {
                StatChange('task', +1)
              }}
            >
              <Text>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statChangeButton, { backgroundColor: '#c4dbff' }]}
              activeOpacity={0.8}
              onPress={() => {
                StatChange('task', +10)
              }}
            >
              <Text>+10</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={[styles.statChangeButton, { backgroundColor: '#ffc2c2' }]}
              activeOpacity={0.8}
              onPress={() => {
                StatChange('task', -1)
              }}
            >
              <Text>-1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statChangeButton, { backgroundColor: '#ffc2c2' }]}
              activeOpacity={0.8}
              onPress={() => {
                StatChange('task', -10)
              }}
            >
              <Text>-10</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.statBlok}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={24}
            color="black"
          />
          <Text style={styles.statText}>Чати: </Text>
          <Text style={styles.statValue}>{GetTasks()?.chats || 0}</Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={[styles.statChangeButton, { backgroundColor: '#c4dbff' }]}
              activeOpacity={0.8}
              onPress={() => {
                StatChange('chat', +1)
              }}
            >
              <Text>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statChangeButton, { backgroundColor: '#c4dbff' }]}
              activeOpacity={0.8}
              onPress={() => {
                StatChange('chat', +10)
              }}
            >
              <Text>+10</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={[styles.statChangeButton, { backgroundColor: '#ffc2c2' }]}
              activeOpacity={0.8}
              onPress={() => {
                StatChange('chat', -1)
              }}
            >
              <Text>-1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statChangeButton, { backgroundColor: '#ffc2c2' }]}
              activeOpacity={0.8}
              onPress={() => {
                StatChange('chat', -10)
              }}
            >
              <Text>-10</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          width: '100%',
          margin: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={styles.dayStatTitle}>Всього задач:</Text>
          <Text style={styles.dayStatValue}>
            {(GetTasks()?.tasks || 0) + (GetTasks()?.chats || 0)}
          </Text>
        </View>
        <View style={{ width: 1, height: '100%', backgroundColor: '#666' }} />
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={styles.dayStatTitle}>За годину:</Text>
          <Text style={styles.dayStatValue}>
            {(
              ((GetTasks()?.tasks || 0) + (GetTasks()?.chats || 0)) /
              8
            ).toFixed(2)}
          </Text>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  statBlok: {
    width: '92%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 10,
  },
  statText: {
    fontSize: 20,
    marginLeft: 5,
  },
  statValue: {
    fontSize: 30,
  },
  statChangeButton: {
    padding: 10,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    borderRadius: 5,
  },
  dayStatTitle: { fontSize: 18 },

  dayStatValue: { fontSize: 24, fontWeight: '500' },
})
