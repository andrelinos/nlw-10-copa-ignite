import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { IconProps } from "phosphor-react-native";
import { useTheme } from "native-base";

interface Props extends TouchableOpacityProps {
  icon: React.FC<IconProps>;
  size?: number;
}

export function ButtonIcon({ icon: Icon, size = 6, ...rest }: Props) {
  const { colors, sizes } = useTheme();

  return (
    <TouchableOpacity {...rest}>
      <Icon color={colors.gray[300]} size={sizes[size]} />
    </TouchableOpacity>
  );
}
