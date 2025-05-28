import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FS } from '../../Scale'

const CustomEmpty = (props:any) => {
  const {title="Product"} = props;
  return (
    <View style={styles.container}>
      <Text>No {title} Found !</Text>
    </View>
  )
}

export default CustomEmpty

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        height:FS(100)
    }
})