import { StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function CreateDay(props: any) {
  return (
    <TouchableOpacity
      style={styles.addButton}
      activeOpacity={0.8}
      onPress={() => props.onCreateDay()}
    >
      <Ionicons name="add" size={40} color="#fff" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#0063ff',
    height: 70,
    width: 70,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
