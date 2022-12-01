import React from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const ResultScreen = () => {
  const headers = ['Nick', 'Point', 'Type', 'Date'];
  const data = [
    ['test', '10', 'test1', '01.01.2022'],
    ['test', '10', 'test1', '01.01.2022'],
    ['test', '10', 'test1', '01.01.2022'],
    ['test', '10', 'test1', '01.01.2022'],
    ['test', '10', 'test1', '01.01.2022'],
  ]

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Tabela wyników</Text>
        <Table style={styles.tableStyle} borderStyle={{borderWidth: 2, borderColor: 'white'}}>
          <Row style={styles.headStyle} data={headers} textStyle={styles.textStyle} />
          <Rows style={styles.rowStyle} data={data} textStyle={styles.textStyle}/>
        </Table>
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