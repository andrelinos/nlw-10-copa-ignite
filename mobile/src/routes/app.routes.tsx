import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PlusCircle, SoccerBall } from "phosphor-react-native";
import { useTheme } from "native-base";

import { New } from "../screens/New";
import { Polls } from "../screens/Polls";
import { Find } from "../screens/Find";
import { Details } from "../screens/Details";
import { SignIn } from "../screens/SignIn";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return <SignIn />;
}
