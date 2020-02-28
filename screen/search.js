import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const search = (props) => {
	const [ state, setState ] = useState(props.route.params.search.split(' ').join('+'));
	console.log(state);
	return (
		<View style={{ flex: 1 }}>
			<WebView
				source={{
					uri: `https://www.google.com/search?q=${state}&sxsrf=ALeKk01fEF2Tu0Uswp_6Qg1UK2qbOdqQbQ:1582872950379&source=lnms&tbm=vid&sa=X&ved=2ahUKEwjG6bmf1fPnAhXE4XMBHc2BDLwQ_AUoAXoECAwQAw&cshid=1582873017583781&biw=1280&bih=636`
				}}
			/>
		</View>
	);
};

export default search;
