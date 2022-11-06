import { Text, HStack, Box, Avatar, Flex, Center, Button } from "native-base";
import { CaretLeft, Door, Export, SignOut } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";

import { ButtonIcon } from "./ButtonIcon";
import { useAuth } from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  title?: string;
  showBackButton?: boolean;
  showShareButton?: boolean;
  onShare?: () => void;
}

export function HeaderUser({
  title,
  showBackButton = false,
  showShareButton = false,
  onShare,
}: Props) {
  const { user, isUserLoading, setUser } = useAuth();
  const { navigate } = useNavigation();

  async function handleLogout() {
    await AsyncStorage.removeItem("@NlwCopa:token");
    await AsyncStorage.removeItem("@NlwCopa:user");
    setUser({});
    navigate("signin");
  }

  return (
    <HStack w="full" h={24} bgColor="gray.800" alignItems="flex-end" px={5}>
      <HStack w="full" justifyContent="space-between">
        <Center>
          <Text color="white" fontWeight="bold" fontSize={16}>
            Olá, {user.name}
          </Text>
        </Center>
        <HStack space={2}>
          <Center>
            <ButtonIcon icon={SignOut} onPress={handleLogout} size={8} />
          </Center>
          <Avatar
            key={user?.name}
            source={{ uri: user?.avatarUrl }}
            w={12}
            h={12}
            rounded="full"
            borderWidth={2}
            marginRight={-3}
            borderColor="gray.800"
          >
            {user?.name?.toUpperCase()}
          </Avatar>
        </HStack>
      </HStack>
    </HStack>
  );
}
