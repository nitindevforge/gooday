import React, { FC, ReactElement, useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  ListRenderItemInfo,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import {
  AutoCompleteItem,
  AutoCompleteProps,
  EmptyComponent,
  ErrorMassage,
  InputLabel,
  Typography,
} from "@app/ui";
import clsx from "clsx";

export const AutoComplete: FC<AutoCompleteProps> = ({
  label,
  placeholder,
  data: initialData,
  onChange,
  selected,
  className,
  error,
  onBlur,
  fromApi = false,
}) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(initialData);

  const tailwind = useTailwind();

  const onItemPress = (item: AutoCompleteItem): void => {
    onChange(item.value);
    setVisible(false);
  };

  const onSearch = (text: string): void => {
    const filter = text.toUpperCase();
    const filteredData = initialData?.filter(
      (el) => el?.label.toUpperCase().indexOf(filter) > -1
    );
    setData(filteredData);
    onChange(text);
    setVisible(true);
    if (!text) {
      setVisible(false);
    }
  };

  const onClose = (e: any) => {
    setVisible(false);
    onBlur(e);
    const label = data.find((el) => el.value === selected)?.label;
    if (!label) {
      // onChange("");
    }
  };

  const renderItem = ({
    item,
  }: ListRenderItemInfo<AutoCompleteItem>): ReactElement<any, any> => (
    <TouchableOpacity
      style={[tailwind(clsx("px-4 py-2.5 border-gray-600"))]}
      onPress={() => onItemPress(item)}
    >
      <Typography variant="base">{item.label}</Typography>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={onClose} style={tailwind("flex-1")}>
      <View
        style={tailwind(clsx("bg-white relative justify-center", className))}
      >
        {label && <InputLabel label={label} />}
        <View
          style={[tailwind("border-gray-600 rounded-xl overflow-hidden"), { borderWidth: 1.5 }]}
        >
          <TextInput
            style={[
              tailwind(
                "bg-white border-gray-600 rounded-xl z-10 border-t-0 px-4 text-base leading-5"
              ),
              {
                height: 40,
                borderWidth: visible ? 1.5 : 0,
                borderLeftWidth: 0.5,
                borderRightWidth: 0.5
              },
            ]}
            placeholderTextColor="#AEAEAE"
            placeholder={placeholder}
            value={selected!}
            onChangeText={onSearch}
            onBlur={(e) => onClose(e)}
            returnKeyType="next"
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          {visible && (
            <FlatList
              style={[
                tailwind(
                  "bg-white rounded-b-xl border-gray-600 max-h-36 pt-1"
                ),
                {
                  borderBottomWidth: 1,
                },
              ]}
              ListEmptyComponent={
                visible &&
                <View style={tailwind('py-2')}>
                  <ActivityIndicator />
                </View>
              }
              data={fromApi ? initialData : data}
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
              keyboardShouldPersistTaps="handled"
            />
          )}
        </View>

        {!visible && error && <ErrorMassage error={error} />}
      </View>
    </TouchableWithoutFeedback>
  );
};
