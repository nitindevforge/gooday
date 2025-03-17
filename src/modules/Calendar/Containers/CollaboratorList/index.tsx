import { Button, EmptyComponent, Icon, SearchInput, Typography } from "@app/ui";
import React, { useMemo, useState } from "react";
import { Dimensions, FlatList, TouchableOpacity, View } from "react-native";
import {
  FriendUserCard,
  ManageSubscriptionModal,
  useGetMyFriends,
  useGetUser,
} from "@app/modules";
import { useTailwind } from "tailwind-rn";
import { useDebounce } from "@app/utils";
import { AxiosResponse } from "axios";
import { FriendsDTO, UserEntity } from "@gooday_corp/gooday-api-client";
import NiceModal from "@ebay/nice-modal-react";

interface CollaboratorListContainerProps {
  collaborators: any[];
  onCollaboratorAdd: (data: UserEntity) => void;
  isLoading: boolean;
  onSubmit: () => void;
}

export const CollaboratorListContainer: React.FC<
  CollaboratorListContainerProps
> = ({
  collaborators,
  onCollaboratorAdd,
  isLoading: isRefreshing,
  onSubmit,
}) => {
    const tailwind = useTailwind();
    const { data: user } = useGetUser();
    const [search, setSearch] = useState<string>("");
    const debounceValue = useDebounce(search, 500);
    const { data, isLoading } = useGetMyFriends(debounceValue);
    const friends = useMemo(() => {
      return data?.pages?.reduce(
        (acc: FriendsDTO["data"], page: AxiosResponse<FriendsDTO>) => {
          return [...(acc ?? []), ...(page?.data?.data ?? [])];
        },
        []
      );
    }, [data]);

    const onModalOpen = () => {
      NiceModal.show(ManageSubscriptionModal);
    };

    return (
      <View style={tailwind("flex-1")}>
        <View style={{ gap: 16, flex: 1 }}>
          <Typography variant="2xl" weight="medium">
            Collaborators
          </Typography>
          <SearchInput
            onPressIn={() => { }}
            onChangeText={(text) => setSearch(text)}
            height={36}
            value={search}
            placeholder="Search"
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={
              user?.data?.data?.plan?.name === "Free"
                ? friends?.slice(0, 1)
                : friends
            }
            columnWrapperStyle={{
              flex: 1,
              justifyContent: "space-between",
            }}
            renderItem={({ item }) => (
              <>
                <FriendUserCard
                  active={
                    !!collaborators?.find((element) => element?._id === item?._id)
                      ?._id
                  }
                  disabled={
                    !!collaborators?.find((element) => element?._id === item?._id)
                      ?._id
                  }
                  onPress={() => onCollaboratorAdd(item)}
                  friend={item}
                />
                {/* {user?.data?.data?.plan?.name === "Free" && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onModalOpen}
                    style={[
                      tailwind(
                        "rounded-20 bg-primary-100 items-center justify-center opacity-75"
                      ),
                      {
                        height: 190,
                        width: Dimensions.get("screen").width / 2 - 34,
                      },
                    ]}
                  >
                    <Icon name="add" />
                  </TouchableOpacity>
                )} */}
              </>
            )}
            keyExtractor={(item) => item?._id}
            ListEmptyComponent={() => !isLoading && <EmptyComponent />}
          />
        </View>
        <Button
          onPress={onSubmit}
          disabled={!collaborators.length || isRefreshing}
          title="Next"
        />
      </View>
    );
  };
