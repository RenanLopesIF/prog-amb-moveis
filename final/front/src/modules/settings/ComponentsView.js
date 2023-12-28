import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Entypo';
import { colors, fonts } from '../../styles';

import { Button, RadioGroup, Dropdown, TextInput } from '../../components';
import AS from '@react-native-async-storage/async-storage';

export default function ComponentsScreen(props) {
  const route = useRoute();
  const [userData, setUserData] = useState(null);
  const [config, setConfig] = useState({ name: '', cargo: 'Passageiro' });

  function handleCargo(index) {
    setConfig(prev => ({
      ...prev,
      cargo: index === 0 ? 'Passageiro' : 'Motorista',
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

  async function saveConfigOnDatabase() {}

  async function save() {
    await Promise.all([saveConfigOnDatabase, saveConfigOnStorage]);
    props.navigation.navigate('Chat');
  }

  useEffect(() => {
    (async () => {
      const res = await AS.getItem('userData');
      const parsedRed = JSON.parse(res);

      setUserData(parsedRed);
      if (parsedRed) {
        setConfig({ ...config, name: parsedRed.name, cargo: parsedRed.cargo });
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
          selectedIndex={config.cargo == 'Passageiro' ? 0 : 1}
          onChange={handleCargo}
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
