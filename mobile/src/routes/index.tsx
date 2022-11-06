import { Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "../hooks/useAuth";

import { AuthRoute } from "./auth.routes";
import { SignIn } from "../screens/SignIn";

import { HeaderUser } from "../components/HeaderUser";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const { user } = useAuth();

  return (
    <Box flex={1} bgColor="gray.900">
      <NavigationContainer>
        {user.name ? (
          <>
            <HeaderUser />
            <AuthRoute />
          </>
        ) : (
          <AppRoutes />
        )}
      </NavigationContainer>
    </Box>
  );
}
