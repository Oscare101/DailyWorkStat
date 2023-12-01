import { Animated, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Swipeable } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { RootState } from '../redux'

export default function SwipeToDelete(props: any) {
  const swipeRrenderRightActions = () => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          width: '80%',
          height: '100%',
        }}
        onPress={() => {
          props.action()
        }}
      >
        <Text
          style={{
            fontSize: 20,
          }}
        >
          Підтвердити
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <View
      style={{
        width: '92%',
        height: 60,
        backgroundColor: '#FFDBDE',
        marginTop: 20,
        alignSelf: 'center',
        borderColor: '#AF3039',
        borderRadius: 8,
        borderWidth: 1,
        overflow: 'hidden',
      }}
    >
      <Swipeable
        renderRightActions={swipeRrenderRightActions}
        overshootLeft={true}
        overshootRight={true}
        overshootFriction={1}
        onSwipeableOpen={() => {}}
      >
        <Animated.View
          style={[
            {
              width: '100%',

              overflow: 'hidden',
              backgroundColor: '#FFDBDE',

              height: '100%',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 2,
            },
          ]}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingHorizontal: '6%',
            }}
          >
            <View></View>
            <Text
              style={{
                color: '#AF3039',
                fontSize: 18,
              }}
            >
              {'<<<'} {props.title}
            </Text>
            <Ionicons name={props.icon} size={24} color={'#AF3039'} />
          </View>
        </Animated.View>
      </Swipeable>
    </View>
  )
}
