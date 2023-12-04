import {
  FlatList,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import taskNames from '../constants/taskNames'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux'
import { DailyWork } from '../constants/interfaces'
import { updateDailyWork } from '../redux/dailyWork'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
export default function Categories(props: any) {
  const dailyWork = useSelector((state: RootState) => state.dailyWork)
  const dispatch = useDispatch()

  const [modal, setModal] = useState<boolean>(false)
  const [currentTaskName, setCurrentTaskName] = useState<string>(
    props.data.taskName
  )

  function TaskNameChange(value: string) {
    const newDailyWork = dailyWork.map((d: DailyWork) => {
      if (
        d.year === props.data.year &&
        d.month === props.data.month &&
        d.date === props.data.date
      ) {
        return {
          ...d,
          taskName: value,
        }
      } else {
        return d
      }
    })
    setCurrentTaskName(value)
    dispatch(updateDailyWork(newDailyWork))
  }

  function RenderCategory({ item }: any) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          TaskNameChange(item)
          setModal(false)
        }}
        style={{
          width: '100%',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#666',
          opacity: currentTaskName === item ? 1 : 0.5,
          marginVertical: 5,
          backgroundColor: currentTaskName === item ? '#c7ddff' : '#fff',
        }}
      >
        <Text style={styles.taskNameButtonTitle}>{item}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <>
      <TouchableOpacity
        style={styles.taskNameButton}
        activeOpacity={0.8}
        onPress={() => setModal(true)}
      >
        <Text
          style={[
            styles.taskNameButtonTitle,
            {
              opacity: currentTaskName ? 1 : 0.5,
              fontWeight: currentTaskName ? '400' : '300',
            },
          ]}
        >
          {currentTaskName ? currentTaskName : 'Задача'}
        </Text>
      </TouchableOpacity>

      <Modal transparent visible={modal} style={styles.modal}>
        <StatusBar
          // barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={'#bbb'}
        />
        <View style={styles.modalBG}>
          <View style={styles.modalBlock}>
            <TouchableOpacity
              style={styles.exitButton}
              activeOpacity={0.8}
              onPress={() => setModal(false)}
            >
              <Ionicons name="close-outline" size={36} color="black" />
            </TouchableOpacity>
            <FlatList
              style={{ width: '92%' }}
              data={Object.values(taskNames)}
              renderItem={RenderCategory}
            />
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  taskNameButton: {
    width: '92%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  taskNameButtonTitle: {
    fontSize: 20,
  },
  modal: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBG: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#66666666',
  },
  modalBlock: {
    width: '90%',
    paddingBottom: 48,
    paddingTop: 64,

    borderRadius: 16,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  exitButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
