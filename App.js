import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './Header';
import Body from './Body';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tareas: [],
      texto: '',
    };
  }

  establecerTexto = (value) => {
    this.setState({ texto: value });
  }

  agregarTarea = () => {
    this.setState({
      tareas: [...this.state.tareas, this.state.texto],
      texto: '',
    });
    console.log(this.state.tareas.length);
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          texto={this.state.texto}
          cambiarTexto={this.establecerTexto}
          agregar={this.agregarTarea}
        />
        <Text>{this.state.texto}</Text>
        <Body tareas={this.state.tareas} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});

export default App;
