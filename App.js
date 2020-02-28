import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';
import Home from './screen/home';
import Search from './screen/search';
const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: '#f4511e'
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold'
					}
				}}
			>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen
					name="Search"
					component={Search}
					options={{
						title: 'Search Results'
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
