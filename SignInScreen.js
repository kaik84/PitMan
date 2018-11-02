import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    View,
} from 'react-native';
import axios from 'axios'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.baseURL = 'http://67.207.86.74'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#ccc',
        padding: 20,
        marginTop: 15
    },
});

export default class SignInScreen extends React.Component {
    static navigationOptions = {
        title: 'Please sign in',
    };

    constructor(props) {
        super(props);
        this.state = { email: '', password: '' }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={{ height: 40, minWidth: 500 }}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={(email) => this.setState({ ...this.state, email })}
                />
                <TextInput
                    style={{ height: 40, minWidth: 500 }}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ ...this.state, password })}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this._signInAsync}
                >
                    <Text>Log In</Text>
                </TouchableOpacity>
                {/* <Button title="Sign in!"  onPress={this._signInAsync}/> */}
            </View>
        );
    }

    _signInAsync = async () => {
        axios.post('/login', { email: this.state.email, password: this.state.password, remember: false }).then(async ({ data }) => {
            await AsyncStorage.setItem('userToken', data.api_token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.api_token}`
            this.props.navigation.navigate('App');
        }).catch(e => console.log(e.response, e.request))

        // await AsyncStorage.setItem('userToken', 'abc');
        // this.props.navigation.navigate('App');
    };
}