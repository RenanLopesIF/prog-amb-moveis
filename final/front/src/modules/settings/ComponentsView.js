import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { colors, fonts } from '../../styles';

import { Button, RadioGroup, Dropdown, TextInput } from '../../components';
import AS from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ENDPOINT } from '../../../App';

export default function ComponentsScreen(props) {
  const route = useRoute();
  const [userData, setUserData] = useState(null);
  const [config, setConfig] = useState({ name: '', role: 'Passageiro' });

  function handleRole(index) {
    setConfig(prev => ({
      ...prev,
      role: index === 0 ? 'Passageiro' : 'Motorista',
    }));
  }

  function handleName(name) {
    setConfig(prev => ({
      ...prev,
      name: name,
    }));
  }

  async function saveConfigOnStorage() {
    const nData = JSON.stringify({ ...(userData || {}), ...config });
    await AS.setItem('userData', nData);
  }

  async function createUserOnDatabase() {
    try {
      const { data } = await axios.post(`${ENDPOINT}/usuario/inserir`, {
        name: config.name,
        role: config.role,
      });
      setConfig(prev => ({ ...prev, id: data.insertId }));
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function updateUserOnDatabase() {
    const res = await axios.put(`${ENDPOINT}/usuario/atualizar`, {
      role: config.role,
      name: config.name,
    });

    return res;
  }

  async function save() {
    if (config.name.length < 2) return;

    if (userData) await updateUserOnDatabase();
    else await createUserOnDatabase();

    await saveConfigOnStorage();
    props.navigation.navigate('Chat');
  }

  useEffect(() => {
    (async () => {
      const res = await AS.getItem('userData');
      const parsedRed = JSON.parse(res);

      setUserData(parsedRed);
      if (parsedRed) {
        setConfig({ ...config, name: parsedRed.name, role: parsedRed.role });
      }
    })();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <View style={styles.componentsSection}>
        <Text style={styles.componentSectionHeader}>Nome</Text>

        <TextInput
          style={{
            backgroundColor: '#f0f0f0',
            border: 'none',
            borderRadius: 4,
            color: 'black',
          }}
          value={config.name}
          onChangeText={handleName}
        />
      </View>

      <View style={styles.componentsSection}>
        <Text style={styles.componentSectionHeader}>Atuação</Text>

        <RadioGroup
          style={styles.demoItem}
          items={['Passageiro', 'Motorista']}
          selectedIndex={config.role == 'Passageiro' ? 0 : 1}
          onChange={handleRole}
        />
      </View>

      <Button
        style={[styles.demoButton, { flexBasis: '47%' }]}
        primary
        caption="SALVAR"
        onPress={save}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bluish,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  componentsSection: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginBottom: 20,
    borderRadius: 5,
  },
  componentSectionHeader: {
    fontFamily: fonts.primaryRegular,
    color: '#686868',
    fontSize: 24,
    marginBottom: 20,
  },
  demoButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  demoIconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 3,
    marginBottom: 20,
  },
  demoButton: {
    marginTop: 8,
    marginBottom: 8,
  },
  demoItem: {
    marginVertical: 15,
  },
});
