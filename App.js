import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button } from 'react-native';
import Header from './Header';
import Body from './Body';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tareas: [],
      texto: '',
      cargando: true,
    };
  }

  componentDidMount() {
    this.recuperarEnTelefono();
  }

  establecerTexto = (value) => {
    this.setState({ texto: value });
  }

  agregarTarea = () => {
    const nuevasTareas = [...this.state.tareas, { texto: this.state.texto, key: Date.now().toString() }];
    this.guardarEnTelefono(nuevasTareas);
    this.setState({
      tareas: nuevasTareas,
      texto: '',
    });
  };

  eliminarTarea = (id) => {
    const nuevasTareas = this.state.tareas.filter(tarea => tarea.key !== id);
    this.guardarEnTelefono(nuevasTareas);
    this.setState({
      tareas: nuevasTareas,
    });
  }

  guardarEnTelefono = (tareas) => {
    console.log(tareas);
    AsyncStorage.setItem('@AppCursoUdemy:tareas', JSON.stringify(tareas))
      .then((value) => {
        console.log(value);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  recuperarEnTelefono = () => {
    AsyncStorage.getItem('@AppCursoUdemy:tareas')
      .then((value) => {
        setTimeout(() => {
          this.setState({
            cargando: false,
          });
        }, 5000);

        if (value !== null) {
          const nuevasTareas = JSON.parse(value);
          this.setState({
            tareas: nuevasTareas,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          cargando: false,
        });
      });
  }


  render() {
    return (
      <View style={styles.container}>
        <Header
          texto={this.state.texto}
          cambiarTexto={this.establecerTexto}
          agregar={this.agregarTarea}
        />
        {/* <Button
          title="Guardar"
          onPress={() => { this.guardarEnTelefono(); }}
        />
        <Button
          title="Recuperar"
          onPress={() => { this.recuperarEnTelefono(); }}
        /> */}
        <Body tareas={this.state.tareas} eliminar={this.eliminarTarea} cargando={this.state.cargando} />
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
