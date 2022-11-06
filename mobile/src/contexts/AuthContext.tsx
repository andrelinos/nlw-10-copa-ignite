import { createContext, ReactNode, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSessions from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

import { api } from "../services/api";

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  singIn: () => Promise<void>;
  isUserLoading: boolean;
  setUser: ({}) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.GOOGLE_CLIENT_ID,
    redirectUri: AuthSessions.makeRedirectUri({ useProxy: true }),
    scopes: ["profile", "email"],
  });

  async function singIn() {
    try {
      setIsUserLoading(true);
      await promptAsync();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function singInWithGoogle(access_token: string) {
    try {
      setIsUserLoading(true);

      console.log("access_token: ", access_token);

      const tokenResponse = await api.post("/users", { access_token });
      const token = tokenResponse.data.token;

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const userInfoResponse = await api.get("/me");
      const userData = userInfoResponse.data.user;

      const jsonValue = JSON.stringify(userData);

      await AsyncStorage.setItem("@NlwCopa:token", token);
      await AsyncStorage.setItem("@NlwCopa:user", jsonValue);

      setUser(userData);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      singInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        singIn,
        isUserLoading,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
