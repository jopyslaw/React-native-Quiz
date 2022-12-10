import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    RefreshControl
} from 'react-native';
import results from '../assets/results';
import OneResultField from '../components/OneResultField';

const ResultScreen = () => {
  let data = results;
  
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    data = results;
    setRefreshing(false);
  }

  const renderItem = ({item}) => <OneResultField nick={item.nick} score={item.score} type={item.type} date={item.date}/>
  


  return (
    <View style={styles.container}>
        <Text style={styles.title}>Tabela wyników</Text>       
          {/*<OneResultField nick='Nick' score='Score' type='Type' date='Date'/>*/}
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.nick}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
          />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#13d3e8',
    padding: 10
  },
  title: {
    fontSize: 20
  },
  tableStyle: {
    marginTop: 10
  },
  headStyle: {
    height: 40
  },
  rowStyle: {
    height: 30
  },
  textStyle: {
    textAlign: 'center'
  }
})

export default ResultScreen;