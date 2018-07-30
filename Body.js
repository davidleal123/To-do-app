// import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Tarea from './Tarea';

// create a component
class Body extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.tareas}
                    renderItem={({ item }) => <Tarea item={item} eliminar={this.props.eliminar} />}
                />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 9,
        backgroundColor: '#98fb98',
    },
});

// make this component available to the app
export default Body;
