import React from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios'

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: []
        }
    }

    componentWillMount() {
        axios.get('/api/groups').then(({ data }) => this.setState({ groups: data }))
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                <FlatList data={this.state.groups}
                    renderItem={({ item }) => <Text style={{ fontSize: 24 }}>{item.name}</Text>}
                    keyExtractor={(item, index) => index.toString()}></FlatList>
            </View>
        );
    }
}