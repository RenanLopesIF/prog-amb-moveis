import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  ScrollViewComponent,
  TextInput,
  VirtualizedList,
} from 'react-native';

import { fonts, colors } from '../../styles';
import { Text, Title } from '../../components/StyledText';
import RNSButton from '../../components/Button';
import AS from '@react-native-async-storage/async-storage';

export default function HomeScreen({ isExtended, setIsExtended, ...props }) {
  const [isLoading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // AS.clear();
  }, []);

  useLayoutEffect(() => {
    (async () => {
      const userData = await AS.getItem('userData');
      if (!userData) {
        props.navigation.navigate('Configurações');
      } else {
        setIsLoading(false);
      }
    })();
  }, []);

  function sendMessage() {
    if (newMessage.trim() === '') return;
    console.log(newMessage);
    setNewMessage('');
  }

  const currentId = 1;
  const chat = [
    {
      cargo: 'Motorista',
      autor: 'Renan',
      autorId: 1,
      message:
        'Onibus hoje saindo da praça da matriz para o instituto federal do norte de minas gerais em araçuaí',
    },
    {
      cargo: 'Passageiro',
      autor: 'André Carvalho',
      autorId: 2,
      message: 'Home 2',
    },
    {
      cargo: 'Passageiro',
      autor: 'Rômulo Santos',
      autorId: 3,
      message: 'Home 3',
    },
    { cargo: 'Motorista', autor: 'Maria', autorId: 4, message: 'Home 4' },
    { cargo: 'Motorista', autor: 'Maria', autorId: 4, message: 'Home 4' },
    { cargo: 'Motorista', autor: 'Maria', autorId: 4, message: 'Home 4' },
    { cargo: 'Motorista', autor: 'Maria', autorId: 4, message: 'Home 4' },
    { cargo: 'Motorista', autor: 'Maria', autorId: 4, message: 'Home 4' },
    { cargo: 'Motorista', autor: 'Maria', autorId: 4, message: 'Home 4' },
    { cargo: 'Motorista', autor: 'Maria', autorId: 4, message: 'Home 4' },
    { cargo: 'Motorista', autor: 'Maria', autorId: 4, message: 'Home 4' },
    { cargo: 'Motorista', autor: 'Maria', autorId: 4, message: 'Home 4' },
    { cargo: 'Motorista', autor: 'Maria', autorId: 4, message: 'Home 4' },
    { cargo: 'Motorista', autor: 'Maria', autorId: 4, message: 'Home 4' },
    { cargo: 'Motorista', autor: 'Maria', autorId: 4, message: 'Home 4' },
    { cargo: 'Motorista', autor: 'Maria', autorId: 4, message: 'Home 4' },
    { cargo: 'Motorista', autor: 'Maria', autorId: 4, message: 'Home 4' },
    { cargo: 'Motorista', autor: 'Maria', autorId: 4, message: 'Home 4' },
    { cargo: 'Motorista', autor: 'Maria', autorId: 4, message: 'Home 4' },
    { cargo: 'Motorista', autor: 'Maria', autorId: 4, message: 'Home 4' },
    { cargo: 'Motorista', autor: 'Maria', autorId: 4, message: 'Home 4' },
    {
      cargo: 'Motorista',
      autor: 'Renan',
      autorId: 1,
      message: 'Home Final do texto ',
    },
  ];

  if (isLoading) return <></>;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <VirtualizedList
          inverted
          style={styles.scrollView}
          data={chat}
          getItemCount={data => data.length}
          getItem={(data, idx) => data[idx]}
          keyExtractor={(item, idx) => idx}
          renderItem={({ item, index }) => (
            <View
              style={{
                ...styles.messageContainer,
                justifyContent:
                  currentId === item.autorId ? 'flex-end' : 'flex-start',
              }}
            >
              <View
                style={
                  currentId === item.autorId
                    ? styles.messageSend
                    : styles.messageRecived
                }
              >
                <Title
                  size={12}
                  color={item.cargo == 'Motorista' ? '#eb8e1c' : '#1c76eb'}
                >
                  {item.autor} - {item.cargo}
                </Title>
                <Text size={16} color="black" bold paddingLeft={0}>
                  {item.message}
                </Text>
              </View>
            </View>
          )}
        />
        <View style={styles.inputArea}>
          <TextInput
            value={newMessage}
            style={styles.input}
            onChangeText={text => {
              setNewMessage(text);
            }}
          />
          <RNSButton
            icon={require('../../../assets/images/send-icon.webp')}
            bgColor="#18f043"
            large
            onPress={sendMessage}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
    width: '100%',
  },
  section: {
    flex: 2,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
  },
  messageContainer: {
    width: '100%',
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
  },
  messageRecived: {
    paddingHorizontal: 20,
    paddingVertical: 2,

    justifyContent: 'center',
    alignItems: 'flex-start',
    maxWidth: '70%',
    width: 'min-content',
    backgroundColor: '#ebebeb',
    color: '#000',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  messageSend: {
    paddingHorizontal: 20,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    maxWidth: '70%',
    width: 'min-content',
    backgroundColor: '#87fa9e',
    color: '#000',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  inputArea: {
    width: '100%',
    height: 50,
    paddingHorizontal: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 2,
  },
  sendBtn: {
    backgroundColor: '',
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    height: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  scrollView: {
    marginBottom: 10,
    marginTop: 10,
  },
});
