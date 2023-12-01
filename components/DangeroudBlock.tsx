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
import SwipeToDelete from './SwipeToDelete'

export default function DangeroudBlock(props: any) {
  const dailyWork = useSelector((state: RootState) => state.dailyWork)
  const userInfo = useSelector((state: RootState) => state.userInfo)
  const dispatch = useDispatch()

  return <></>
}
