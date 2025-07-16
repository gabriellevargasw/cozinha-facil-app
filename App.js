import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './Telas/splash';
import Login from './Telas/login';
import Inicio from './Telas/inicio';
import Buscarreceitas from './Telas/buscarreceitas';
import Receitaaleatoria from './Telas/receitaaleatoria';
import Favoritos from './Telas/favoritos';
import Registrar from './Telas/registrar'; 
import Esqueceuasenha from './Telas/esqueceuasenha';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }}/>
        <Stack.Screen name="Buscarreceitas" component={Buscarreceitas} options={{ headerShown: false }} />
        <Stack.Screen name="Receitaaleatoria" component={Receitaaleatoria} options={{ headerShown: false }}/>
        <Stack.Screen name="Favoritos" component={Favoritos} options={{ headerShown: false }} />
        <Stack.Screen name="Registrar" component={Registrar} options={{ headerShown: false }}/>
        <Stack.Screen name="Esqueceuasenha" component={Esqueceuasenha} options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

