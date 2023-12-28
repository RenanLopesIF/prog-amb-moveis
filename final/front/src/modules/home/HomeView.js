import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  VirtualizedList,
  TouchableOpacity,
} from 'react-native';
import { Text, Title } from '../../components/StyledText';
import RNSButton from '../../components/Button';
import AS from '@react-native-async-storage/async-storage';
import { ENDPOINT } from '../../../App';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Entypo';

export default function HomeScreen({ isExtended, setIsExtended, ...props }) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  async function getMessages() {
    const res = await axios.get(`${ENDPOINT}/messages`);
    setMessages(res.data);
  }

  async function sendMessage() {
    const msg = newMessage.trim();
    if (msg === '') return;

    try {
      console.log(userData.id);
      const res = await axios.post(`${ENDPOINT}/messages/inserir`, {
        autorId: userData.id,
        message: msg,
      });
      console.log(res.data);
      getMessages();
    } catch (error) {}

    setNewMessage('');
  }

  async function deleteMessages(msgId) {
    await axios.delete(`${ENDPOINT}/messages/deletar`, {
      data: {
        messageId: msgId,
      },
    });
    getMessages();
  }

  useLayoutEffect(() => {
    (async () => {
      const res = await AS.getItem('userData');
      const parsedRed = JSON.parse(res);

      if (parsedRed) {
        console.log(parsedRed, 'f');
        setUserData(parsedRed);
        setIsLoading(false);
      } else {
        props.navigation.navigate('Configurações');
      }
    })();
  }, []);

  useEffect(() => {
    getMessages();
  }, []);

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
          data={messages}
          getItemCount={data => data.length}
          getItem={(data, idx) => data[idx]}
          keyExtractor={(item, idx) => idx}
          renderItem={({ item, index }) => (
            <View
              style={{
                ...styles.messageContainer,
                justifyContent:
                  userData.id === item.autorId ? 'flex-end' : 'flex-start',
              }}
            >
              <View
                style={
                  userData.id === item.autorId
                    ? styles.messageSend
                    : styles.messageRecived
                }
              >
                <Title
                  size={12}
                  color={item.autorRole == 'Motorista' ? '#eb8e1c' : '#1c76eb'}
                >
                  {item.autorName} - {item.autorRole}
                </Title>
                <Text size={16} color="black" bold paddingLeft={0}>
                  {item.message}
                </Text>
                <TouchableOpacity
                  style={styles.deleteMsg}
                  onPress={() => {
                    deleteMessages(item.id);
                  }}
                >
                  <Text>
                    <Icon name="trash" size={12} color="red" />
                  </Text>
                </TouchableOpacity>
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
    // borderTopLeftRadius: 10,
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
  deleteMsg: {
    position: 'absolute',
    left: -20,
    top: 0,
    height: 20,
    width: 20,
    backgroundColor: 'white',
    // width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
});
