//Example to Convert Speech to Text in React Native - Voice Recognition
import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableHighlight, ScrollView, Modal } from 'react-native';
import Voice from 'react-native-voice';

class App extends Component {
	state = {
		pitch: '',
		error: '',
		end: 'Not Yet',
		started: 'Not Yet',
		results: [],
		partialResults: [],
		modal: false,
		search: ''
	};

	constructor(props) {
		super(props);
		//Setting callbacks for the process status
		Voice.onSpeechStart = this.onSpeechStart;
		Voice.onSpeechEnd = this.onSpeechEnd;
		Voice.onSpeechError = this.onSpeechError;
		Voice.onSpeechResults = this.onSpeechResults;
		Voice.onSpeechPartialResults = this.onSpeechPartialResults;
		Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
	}

	componentWillUnmount() {
		//destroy the process after switching the screen
		Voice.destroy().then(Voice.removeAllListeners);
	}

	onSpeechStart = (e) => {
		//Invoked when .start() is called without error
		// console.log('onSpeechStart: ', e);
		this.setState({
			started: 'Yes'
		});
	};

	onSpeechEnd = (e) => {
		//Invoked when SpeechRecognizer stops recognition
		// console.log('onSpeechEnd: ', e);
		this.setState({
			end: 'Yes',
			modal: true
		});
	};

	onSpeechError = (e) => {
		//Invoked when an error occurs.
		// console.log('onSpeechError: ', e);
		this.setState({
			error: JSON.stringify(e.error)
		});
	};

	onSpeechResults = (e) => {
		//Invoked when SpeechRecognizer is finished recognizing
		// console.log('onSpeechResults: ', e);
		this.setState({
			results: e.value
		});
	};

	onSpeechPartialResults = (e) => {
		//Invoked when any results are computed
		// console.log('onSpeechPartialResults: ', e);
		this.setState({
			partialResults: e.value
		});
	};

	onSpeechVolumeChanged = (e) => {
		//Invoked when pitch that is recognized changed
		// console.log('onSpeechVolumeChanged: ', e);
		this.setState({
			pitch: e.value
		});
	};

	_startRecognizing = async () => {
		//Starts listening for speech for a specific locale
		this.setState({
			pitch: '',
			error: '',
			started: '',
			results: [],
			partialResults: '',
			end: ''
		});

		try {
			await Voice.start('en-US');
		} catch (e) {
			//eslint-disable-next-line
			console.error(e);
		}
	};

	_stopRecognizing = async () => {
		//Stops listening for speech
		try {
			await Voice.stop();
		} catch (e) {
			//eslint-disable-next-line
			console.error(e);
		}
	};

	_cancelRecognizing = async () => {
		//Cancels the speech recognition
		try {
			await Voice.cancel();
		} catch (e) {
			//eslint-disable-next-line
			console.error(e);
		}
	};

	_destroyRecognizer = async () => {
		//Destroys the current SpeechRecognizer instance
		try {
			await Voice.destroy();
		} catch (e) {
			//eslint-disable-next-line
			console.error(e);
		}
		this.setState({
			pitch: '',
			error: '',
			started: '',
			results: [],
			partialResults: [],
			end: ''
		});
	};

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<Modal transparent={true} visible={this.state.modal}>
					<View style={{ flex: 1, backgroundColor: '#000000f0', justifyContent: 'center' }}>
						<View
							style={{
								borderRadius: 10,
								height: '80%',
								width: '90%',
								alignSelf: 'center',
								backgroundColor: '#fff',
								paddingHorizontal: 20
							}}
						>
							<ScrollView>
								<Text
									style={{
										fontWeight: 'bold',
										textAlign: 'center',
										width: '100%',
										marginVertical: 20,
										fontSize: 20
									}}
								>
									Suggestions{' '}
								</Text>

								{this.state.results.map((result, index) => {
									return (
										// <View style={index%2==0?{backgroundColor:"#ebae34",marginBottom:5, justifyContent:"center"}:{backgroundColor:"#f4511e",marginBottom:5, justifyContent:"center"}}>

										<Text
											onPress={() => {
												this.props.navigation.navigate('Search', { search: result });
												this.setState({ search: result, modal: false });
											}}
											key={`result-${index}`}
											style={[
												styles.stat,
												index % 2 == 0
													? {
															backgroundColor: '#ebae34',
															marginBottom: 5,
															justifyContent: 'center'
														}
													: {
															backgroundColor: '#f4511e',
															marginBottom: 5,
															justifyContent: 'center'
														}
											]}
										>
											{result}
										</Text>
										//   </View>
									);
								})}
							</ScrollView>
							<Text
								style={{
									width: '100%',
									marginBottom: 20,
									borderRadius: 5,
									height: 40,
									backgroundColor: 'red',
									textAlign: 'center',
									textAlignVertical: 'center'
								}}
								onPress={() => {
									this.setState({ modal: false });
								}}
							>
								Close
							</Text>
						</View>
					</View>
				</Modal>
				<View style={styles.container}>
					{/* <Text style={styles.welcome}>
        Voice to Text Converter
          </Text> */}

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							paddingVertical: 10
						}}
					>
						<Text
							style={{
								flex: 1,
								textAlign: 'center',
								color: '#B0171F'
							}}
						>{`Started: ${this.state.started}`}</Text>
						<Text
							style={{
								flex: 1,
								textAlign: 'center',
								color: '#B0171F'
							}}
						>{`End: ${this.state.end}`}</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							paddingVertical: 10
						}}
					>
						<Text
							style={{
								flex: 1,
								textAlign: 'center',
								color: '#B0171F'
							}}
						>{`Pitch \n ${this.state.pitch}`}</Text>
						<Text
							style={{
								flex: 1,
								textAlign: 'center',
								color: '#B0171F'
							}}
						>{`Error \n ${this.state.error}`}</Text>
					</View>
					<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
						<Text style={styles.instructions}>Press mike to start Recognition</Text>
						<TouchableHighlight
							onPress={this._startRecognizing}
							style={{ marginVertical: 20, alignSelf: 'center' }}
						>
							<Image
								style={styles.button}
								source={{
									uri:
										'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png'
								}}
							/>
						</TouchableHighlight>
					</View>
					{/* <Text
            style={{
              textAlign: 'center',
              color: '#B0171F',
              marginBottom: 1,
              fontWeight: '700',
            }}>
            Final Result
          </Text> */}
					{/* <ScrollView>
            {this.state.partialResults.map((result, index) => {
              return (
                <Text
                  key={`partial-result-${index}`}
                  style={{
                    textAlign: 'center',
                    color: '#B0171F',
                    marginBottom: 1,
                    fontWeight: '700',
                  }}>
                  {result}
                </Text>
              );
            })}
          </ScrollView> */}
					{/* <Text style={styles.stat}>Similar Results</Text>
          <ScrollView style={{ marginBottom: 42 }}>
            {this.state.results.map((result, index) => {
              return (
                <Text key={`result-${index}`} style={styles.stat}>
                  {result}
                </Text>
              );
            })}
          </ScrollView> */}
					{/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'space-between',
              position: 'absolute',
              bottom: 0,
            }}>
            <TouchableHighlight
              onPress={this._stopRecognizing}
              style={{ flex: 1, backgroundColor: 'red' }}>
              <Text style={styles.action}>Stop</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this._cancelRecognizing}
              style={{ flex: 1, backgroundColor: 'red' }}>
              <Text style={styles.action}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this._destroyRecognizer}
              style={{ flex: 1, backgroundColor: 'red' }}>
              <Text style={styles.action}>Destroy</Text>
            </TouchableHighlight>
          </View> */}
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		width: 60,
		height: 60
		// backgroundColor:"red",
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		// justifyContent: 'center',
		backgroundColor: '#F5FCFF'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	action: {
		width: '100%',
		textAlign: 'center',
		color: 'white',
		paddingVertical: 8,
		marginVertical: 5,
		fontWeight: 'bold'
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
		fontWeight: 'bold',
		fontSize: 20,
		marginBottom: 30
	},
	stat: {
		color: '#fff',
		textAlign: 'center',
		textAlignVertical: 'center',
		// color: '#B0171F',
		padding: 20,
		marginBottom: 1
		// marginTop: 30,
	}
});
export default App;
