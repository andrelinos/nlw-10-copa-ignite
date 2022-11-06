import { SignIn } from "../screens/SignIn";
export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      new: undefined;
      signin: undefined;
      polls: undefined;
      find: undefined;
      details: {
        id: string;
      };
    }
  }
}
