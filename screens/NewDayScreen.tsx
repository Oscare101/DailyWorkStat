import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DailyWork } from '../constants/interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux'
import { updateDailyWork } from '../redux/dailyWork'

const calendarItemHeight: number = 50

export default function NewDayScreen({ navigation }: any) {
  const dailyWork = useSelector((state: RootState) => state.dailyWork)
  const dispatch = useDispatch()

  const [year, setYear] = useState<number>(
    +new Date().toISOString().split('T')[0].split('-')[0]
  )
  const [month, setMonth] = useState<number>(
    +new Date().toISOString().split('T')[0].split('-')[1]
  )

  const [date, setDate] = useState<number>(
    +new Date().toISOString().split('T')[0].split('-')[2]
  )

  const flatListRefYear = useRef<any>(null)
  const flatListRefMonth = useRef<any>(null)
  const flatListRefDate = useRef<any>(null)

  function GetYearsArr() {
    const currentYear: number = +new Date()
      .toISOString()
      .split('T')[0]
      .split('-')[0]
    let arr: any = []
    for (let i = 0; i < 100; i++) {
      arr.push(currentYear - i)
    }
    return arr
  }

  function GetMonthArr() {
    const months = [
      'Січень',
      'Лютий',
      'Березень',
      'Квітень',
      'Червень',
      'Червень',
      'Липень',
      'Серпень',
      'Вересень',
      'Жовтень',
      'Листопад',
      'Грудень',
    ]
    const currentYear: number = +new Date()
      .toISOString()
      .split('T')[0]
      .split('-')[0]
    const currentMonth: number = +new Date()
      .toISOString()
      .split('T')[0]
      .split('-')[1]

    if (year === currentYear) {
      return months.splice(0, currentMonth)
    }
    return months
  }

  function GetDaysArr() {
    const currentYear: number = +new Date()
      .toISOString()
      .split('T')[0]
      .split('-')[0]
    const currentMonth: number = +new Date()
      .toISOString()
      .split('T')[0]
      .split('-')[1]
    const currentDate: number = +new Date()
      .toISOString()
      .split('T')[0]
      .split('-')[2]
    let arr: any = []

    // for (let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
    //   arr.push(i)
    // }
    const lastDay =
      month === currentMonth ? currentDate : new Date(year, month, 0).getDate()

    for (let i = lastDay; i >= 1; i--) {
      arr.push(i)
    }

    if (year === currentYear && month === currentMonth) {
      return arr.slice(0, currentDate)
    }

    return arr
  }
  useEffect(() => {
    const currentYear: number = +new Date()
      .toISOString()
      .split('T')[0]
      .split('-')[0]
    const currentMonth: number = +new Date()
      .toISOString()
      .split('T')[0]
      .split('-')[1]
    const currentDate: number = +new Date()
      .toISOString()
      .split('T')[0]
      .split('-')[2]
    if (month !== currentMonth) {
      setDate(new Date(year, month, 0).getDate())
    } else {
      setDate(currentDate)
    }
  }, [year, month])

  function CreateNewDay() {
    const stamp: string = new Date(`${year}-${month}-${date}`)
      .getTime()
      .toString()
    const newDay: DailyWork = {
      timestamp: stamp,
      year: year,
      month: month,
      date: date,
      tasks: 0,
      chats: 0,
      workingDay: true,
    }

    const newDailyWork = [...dailyWork, newDay]
    dispatch(updateDailyWork(newDailyWork))
    navigation.goBack()
  }

  function RenderYearItem({ item, index }: any) {
    return (
      <View
        style={{
          height: calendarItemHeight,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',

          // marginTop: index ? 0 : calendarItemHeight / 2,
        }}
      >
        <Text
          style={{
            fontSize: 24,
          }}
        >
          {item}
        </Text>
      </View>
    )
  }

  function Disabled() {
    return !!dailyWork.find(
      (d: DailyWork) => d.year === year && d.month === month && d.date === date
    )
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
        <Text style={styles.title}>Створити день</Text>
        <View style={styles.backButton}></View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.dateBlock}>
          <View style={styles.dateInputBlock}>
            <View style={styles.dateScrollBlock}>
              <View
                style={{
                  height: calendarItemHeight * 3,
                  width: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    backgroundColor: '#000',
                    height: 5,
                    width: 5,
                    borderRadius: 5,
                  }}
                ></View>
              </View>
              <FlatList
                ref={flatListRefYear}
                onScrollToIndexFailed={() => {}}
                data={[...GetYearsArr()]}
                renderItem={RenderYearItem}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                snapToAlignment="center"
                decelerationRate={'fast'}
                snapToInterval={calendarItemHeight}
                snapToOffsets={[...GetYearsArr()].map(
                  (x, i) => i * calendarItemHeight
                )}
                contentContainerStyle={{ alignItems: 'center' }}
                onScroll={(event: any) => {
                  const currentYear: number = +new Date()
                    .toISOString()
                    .split('T')[0]
                    .split('-')[0]
                  const newYear: number =
                    currentYear -
                    Math.ceil(
                      event.nativeEvent.contentOffset.y / calendarItemHeight -
                        0.02
                    )

                  if (year !== newYear) {
                    setYear(newYear)
                  }
                }}
                ListHeaderComponent={() => (
                  <View
                    style={{
                      width: '100%',
                      height: calendarItemHeight,
                      backgroundColor: 'black',
                    }}
                  />
                )}
                ListFooterComponent={() => (
                  <View
                    style={{
                      width: '100%',
                      height: calendarItemHeight,
                      backgroundColor: 'black',
                    }}
                  />
                )}
              />
              <View
                style={{
                  height: calendarItemHeight * 3,
                  width: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    backgroundColor: '#000',
                    height: 5,
                    width: 5,
                    borderRadius: 5,
                  }}
                ></View>
              </View>
              <FlatList
                ref={flatListRefMonth}
                data={[...GetMonthArr()].reverse()}
                renderItem={RenderYearItem}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                decelerationRate={'fast'}
                snapToInterval={calendarItemHeight}
                snapToOffsets={[...GetMonthArr()]
                  .reverse()
                  .map((x, i) => i * calendarItemHeight)}
                contentContainerStyle={{ alignItems: 'center' }}
                onScroll={(event: any) => {
                  const newMonth: number = Math.ceil(
                    event.nativeEvent.contentOffset.y / calendarItemHeight -
                      0.02
                  )

                  if (
                    month !== GetMonthArr().length - newMonth &&
                    GetMonthArr().length - newMonth < 13
                  ) {
                    setMonth(GetMonthArr().length - newMonth)
                  }
                }}
                ListHeaderComponent={() => (
                  <View
                    style={{
                      width: '100%',
                      height: calendarItemHeight,
                      backgroundColor: 'black',
                    }}
                  />
                )}
                ListFooterComponent={() => (
                  <View
                    style={{
                      width: '100%',
                      height: calendarItemHeight,
                      backgroundColor: 'black',
                    }}
                  />
                )}
              />
              <View
                style={{
                  height: calendarItemHeight * 3,
                  width: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    backgroundColor: '#000',
                    height: 5,
                    width: 5,
                    borderRadius: 5,
                  }}
                ></View>
              </View>
              <FlatList
                ref={flatListRefDate}
                data={[...GetDaysArr()]}
                renderItem={RenderYearItem}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                pagingEnabled
                decelerationRate={'fast'}
                snapToInterval={calendarItemHeight + 0.1}
                snapToOffsets={[...GetYearsArr()].map(
                  (x, i) => i * calendarItemHeight
                )}
                contentContainerStyle={{ alignItems: 'center' }}
                onScroll={(event: any) => {
                  const newDate: number =
                    1 +
                    +Math.ceil(
                      event.nativeEvent.contentOffset.y / calendarItemHeight
                    )

                  if (+date !== +GetDaysArr().length - newDate + 1) {
                    setDate(GetDaysArr().length - newDate + 1)
                  }
                }}
                ListHeaderComponent={() => (
                  <View
                    style={{
                      width: '100%',
                      height: calendarItemHeight,
                      backgroundColor: 'black',
                    }}
                  />
                )}
                ListFooterComponent={() => (
                  <View
                    style={{
                      width: '100%',
                      height: calendarItemHeight,
                      backgroundColor: 'black',
                    }}
                  />
                )}
              />
              <View
                style={{
                  height: calendarItemHeight * 3,
                  width: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    backgroundColor: '#000',
                    height: 5,
                    width: 5,
                    borderRadius: 5,
                  }}
                ></View>
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.dateTitle}>
          {year}-{month}-{date}
        </Text>
      </View>
      {Disabled() ? (
        <Text style={styles.error}>Такий день вже існує</Text>
      ) : (
        <></>
      )}

      <TouchableOpacity
        style={[
          styles.createButton,
          {
            opacity: Disabled() ? 0.5 : 1,
          },
        ]}
        activeOpacity={0.8}
        onPress={CreateNewDay}
        disabled={Disabled()}
      >
        <Text style={styles.createButtonText}>Створити</Text>
      </TouchableOpacity>
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
  backButton: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
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
  title: {
    fontSize: 24,
  },
  dateBlock: {
    backgroundColor: '#F8F8FA',
    alignItems: 'center',
    borderRadius: 10,
  },
  dateInputBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '92%',
    alignSelf: 'center',
  },
  dateScrollBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: calendarItemHeight * 3,
    width: '100%',
  },
  createButton: {
    width: '92%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  createButtonText: {
    fontSize: 24,
    color: '#0063ff',
  },
  error: {
    marginVertical: 10,
    fontSize: 18,
    color: '#AF3039',
  },
  dateTitle: {
    width: '100%',
    textAlign: 'center',
    fontSize: 24,
    alignSelf: 'center',
    marginVertical: 10,
  },
})
