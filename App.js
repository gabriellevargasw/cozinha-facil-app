import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './splash';
import Login from './login';
import Inicio from './inicio';
import Buscarreceitas from './buscarreceitas';
import Detalhesreceitas from './detalhesreceitas';
import Receitaaleatoria from './receitaaleatoria';
import Favoritos from './favoritos';
import Registrar from './registrar'; 
import Esqueceuasenha from './esqueceuasenha';
import Logout from './logout';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }}/>
        <Stack.Screen name="Buscarreceitas" component={Buscarreceitas} options={{ headerShown: false }} />
        <Stack.Screen name="Detalhesreceitas" component={Detalhesreceitas} options={{ headerShown: false }}/>
        <Stack.Screen name="Receitaaleatoria" component={Receitaaleatoria} options={{ headerShown: false }}/>
        <Stack.Screen name="Favoritos" component={Favoritos} options={{ headerShown: false }} />
        <Stack.Screen name="Registrar" component={Registrar} options={{ headerShown: false }}/>
        <Stack.Screen name="Esqueceuasenha" component={Esqueceuasenha} options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

