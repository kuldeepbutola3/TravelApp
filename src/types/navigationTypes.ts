import { RouteProp, ParamListBase, useRoute } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export const useParams = <ParamList extends ParamListBase, RouteName extends keyof ParamList>() => {
  type Params = RouteProp<ParamList, RouteName>['params'];
  return useRoute<RouteProp<ParamList, RouteName>>().params as Params;
};

export type AuraStackScreen<
  ParamList extends ParamListBase = {},
  RouteName extends keyof ParamList = string
> = React.FC<StackScreenProps<ParamList, RouteName>>;
