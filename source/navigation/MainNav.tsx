import { NavigationContainer } from '@react-navigation/native';
import { OnBoardingNav } from '../hawaijahaaj/onBoarding/OnBoardingNav';
import { useSliceSelector } from '../redux/hooks';
import { HomeScreen } from '../hawaijahaaj/home/screen/HomeScreen';

export default function MainNav() {
  const { isloggedIn } = useSliceSelector('app');
  // const isloggedIn = false;
  console.log('isloggedIn..............111111111', isloggedIn);
  return (
    <NavigationContainer>
      {isloggedIn ? <HomeScreen /> : <OnBoardingNav />}
    </NavigationContainer>
  );
}
