import { Center, Text, Icon } from "native-base";
import { Fontisto } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAuth } from "../hooks/useAuth";

import Logo from "../assets/logo.svg";

import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Loading } from "../components/Loading";

export function SignIn() {
  const { singIn, isUserLoading, user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const token = await AsyncStorage.getItem("@NlwCopa:token");
        if (!user?.name) {
          if (token !== null) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const userInfoResponse = await api.get("/me");

            setUser(userInfoResponse.data.user);
          }
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user]);

  return isLoading ? (
    <Loading />
  ) : (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={212} height={40} />

      <Button
        type="SECONDARY"
        title="ENTRAR COM GOOGLE"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        mt={12}
        onPress={singIn}
        isLoading={isUserLoading}
        _loading={{
          _spinner: { color: "white" },
        }}
      />

      <Text color="white" textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além{"\n"}
        do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  );
}
