import { Icon, Typography } from "@app/ui";
import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { MultiSelectDropdownProps } from "./type";
import { SelectOptions } from "@app/modules";
import clsx from "clsx";
import Modal from "react-native-modal";
import { FriendsDTO } from "@gooday_corp/gooday-api-client";
import { AxiosResponse } from "axios";

export const MultiSelectDropdown: FC<MultiSelectDropdownProps> = ({
  options = [],
  optionComponent: OptionComponent,
  selectedOptions,
  disabled = false,
  onChange = () => { },
  fetchNextPage
}) => {
  const tailwind = useTailwind();
  const [filteredContacts, setFilteredContacts] = useState(options);
  const [showList, setShowList] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [selectedContacts, setSelectedContacts] = useState<SelectOptions[]>(
    selectedOptions || []
  );

  useEffect(() => {
    if ((selectedOptions?.length ?? 0) > 0) {
      setSelectedContacts((selectedOptions ?? [])?.filter((ele) => ele?.value !== null))
    }
  }, [selectedOptions])
  const handleSelect = (contact: SelectOptions) => {
    if (!selectedContacts.some((item) => item.value === contact.value)) {
      setSelectedContacts([...selectedContacts, contact]);
      onChange([...selectedContacts, contact]);
    } else {
      removeSelected(contact?.value)
    }
  };

  const removeSelected = (value: unknown) => {
    setSelectedContacts(
      selectedContacts.filter((item) => item.value !== value)
    );
    onChange(selectedContacts.filter((item) => item.value !== value));
  };

  const onFetch = async () => {
    try {
      const res = await fetchNextPage();
      setPage(res?.data?.pages?.length ?? 1);
      if (res?.data?.pages?.length !== page || res?.data?.pages?.length === 1) {
        setLoading(true);
      }
      const data = res?.data?.pages?.reduce(
        (acc: FriendsDTO["data"], page: AxiosResponse<FriendsDTO>) => {
          return [...(acc ?? []), ...(page?.data?.data ?? [])];
        },
        []
      )?.map((friend) => ({
        label: `${friend?.firstName} ${friend?.lastName}`,
        value: friend?._id,
      })) || []
      setFilteredContacts(data);
      if (res?.data?.pages?.length !== 1) {
        setTimeout(() => {
          setLoading(false);
        }, 1000)
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options?.length) {
      setFilteredContacts(options);
    }
  }, [options]);

  return (
    <TouchableWithoutFeedback onPress={() => setShowList(false)}>
      <View>
        <Typography className="mb-2">Invite</Typography>
        <View
          style={[
            tailwind(
              clsx(
                "flex-row items-center border-gray-600 pl-4 rounded-10 justify-between",
                {
                  "bg-gray-600": disabled,
                }
              )
            ),
            {
              borderWidth: 1.5,
              height: 42.88,
              opacity: disabled ? 0.5 : 1,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => setShowList(!showList)}
            disabled={disabled}
            activeOpacity={1}
            style={tailwind("flex-row flex-1")}
          >
            {selectedContacts?.length ? (
              <FlatList
                data={selectedContacts}
                horizontal
                contentContainerStyle={{
                  gap: 2,
                }}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    disabled={disabled}
                    style={[styles.tag, tailwind("bg-primary-300")]}
                    onPress={() => removeSelected(item.value)}
                  >
                    <Typography variant="sm" color="white">
                      {item.label}
                    </Typography>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <TextInput
                placeholderTextColor={"#AEAEAE"}
                editable={false}
                onPress={() => {
                  !disabled && setShowList(!showList);
                }}
                placeholder="Add contact"
                style={[
                  {
                    height: 42.88,
                    width: "100%",
                  },
                  tailwind("text-gray-200 text-base leading-5"),
                ]}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            disabled={disabled}
            onPress={() => setShowList(!showList)}
            style={styles.addButton}
          >
            <Icon name="add" stroke="#DADADA" width={15} height={15} />
          </TouchableOpacity>
        </View>

        <Modal
          isVisible={showList}
          style={tailwind("m-0 flex-1 justify-end")}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setShowList(!showList)}
            style={tailwind("flex-1 items-center justify-end bg-black/30")}
          />
          <View style={tailwind('h-68 bg-white rounded-xl')}>
            <FlatList
              style={tailwind('mb-3')}
              onScroll={onFetch}
              showsVerticalScrollIndicator={false}
              data={filteredContacts}
              keyExtractor={(item) => item.value}
              ListHeaderComponent={<Typography variant="xl" className="p-4">Invite friends</Typography>}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.contactItem, tailwind(clsx("flex-row items-center mb-1", {
                    'bg-gray-700': selectedContacts.some((ele) => ele.value === item.value)
                  }))]}
                  onPress={() => handleSelect(item)}
                >
                  {OptionComponent ? (
                    <OptionComponent {...item} />
                  ) : (
                    <Text>{item.label}</Text>
                  )}
                </TouchableOpacity>
              )}
            />
            <View style={tailwind('mb-4')}>
              {
                loading &&
                <ActivityIndicator size='large' />
              }
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  addButton: {
    padding: 12,
  },
  addButtonText: {
    fontSize: 18,
  },
  contactItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    columnGap: 20,
  },
  tag: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 5,
  },
});
