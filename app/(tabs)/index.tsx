import React, { useRef, useState } from 'react';
import Typo from '@/components/Typo';
import ViewTemplate from '@/components/ViewTemplate';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Checkbox from 'expo-checkbox';

const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  todoContainer: {
    rowGap: 16,
    width: '100%',
  },
  addArea: {
    flexDirection: 'row',
    columnGap: 16,
    height: 40,
  },
  input: {
    width: Dimensions.get('window').width - 140,
    borderRadius: 4,
    borderWidth: 1,
    height: 50,
    fontSize: 20,
    paddingHorizontal: 4,
  },
  addBtnBackground: {
    backgroundColor: '#d0d0d0',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 4,
    marginBottom: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnText: {
    color: '#000',
    fontSize: 12,
  },
  todoListArea: {
    rowGap: 8,
  },
  row: {
    flexDirection: 'row',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  todoText: {
    width: Dimensions.get('window').width - 148,
  },
  deleteBtnBg: {
    backgroundColor: '#d0d0d0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  deleteBtnText: {
    color: '#000',
    fontSize: 12,
  },
});

export default function HomeScreen() {
  const inputRef = useRef<TextInput | null>(null);

  const [value, setValue] = useState('');
  const [list, setList] = useState<
    { key: number; value: string; checked: boolean }[]
  >([]);

  const onChangeText = (v: string) => {
    setValue(v);
  };

  const onAdd = () => {
    if (value === '') return;

    setList([
      ...list,
      {
        key: new Date().getTime(),
        value,
        checked: false,
      },
    ]);

    setValue('');

    inputRef.current?.blur();
  };

  const onDelete = (idx: number) => {
    setList((prev) => prev.filter((_, i) => idx !== i));
  };

  const onChangeCheck = (idx: number, checked: boolean) => {
    setList((prev) =>
      prev.map((state, i) => ({
        ...state,
        checked: i === idx ? checked : state.checked,
      })),
    );
  };

  return (
    <ViewTemplate
      style={{
        padding: 0,
        rowGap: 14,
        backgroundColor: '#fff',
        height: '100%',
      }}
    >
      <Typo typo='t'>Todo List</Typo>
      <View style={styles.todoContainer}>
        <View style={styles.addArea}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={value}
            ref={inputRef}
          ></TextInput>
          <TouchableOpacity onPress={onAdd} style={styles.addBtnBackground}>
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.todoListArea}>
          {list.map(({ value, checked, key }, idx) => {
            return (
              <View style={styles.row} key={`${idx}-${key}`}>
                <View style={styles.left}>
                  <Checkbox
                    value={checked}
                    onValueChange={() => {
                      onChangeCheck(idx, !checked);
                    }}
                  ></Checkbox>
                  <Text
                    style={{
                      ...styles.todoText,
                      textDecorationLine: checked ? 'line-through' : 'none',
                    }}
                  >
                    {value}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteBtnBg}
                  onPress={() => {
                    onDelete(idx);
                  }}
                >
                  <Text style={styles.deleteBtnText}>Delete</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </ViewTemplate>
  );
}
