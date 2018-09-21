import firebase from 'firebase';
import React, { Component } from 'react';
import { AppRegistry, View, Text, Button } from 'react-native';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {pontuacao:0}
  }

  componentWillMount() {

    var config = {
      apiKey: "AIzaSyDuuY8Bq1x6Ssl4PBlWL8wL_wUB6ougC4U",
      authDomain: "configuracaofirebasereact.firebaseapp.com",
      databaseURL: "https://configuracaofirebasereact.firebaseio.com",
      storageBucket: "configuracaofirebasereact.appspot.com",
      messagingSenderId: "263541257878"
    };

    firebase.initializeApp(config);

  }

  salvarDados(){
    var funcionarios = firebase.database().ref("funcionarios");
    //database.ref("pontuacao").remove();

    funcionarios.push().set(
      {
        nome: "Mariana Silva",
        altura: "1,65",
        peso: "60KG"
      }
    );
    //funcionarios.remove();

  }

  listarDados(){
    var pontuacao = firebase.database().ref("pontuacao");
    pontuacao.on('value', (snapshot) => {
      var pontos = snapshot.val();
      this.setState( {pontuacao: pontos } );
    } );

  }

  render(){
    
    let {pontuacao} = this.state;

    return(
      <View>
        <Button
          onPress={ ()=>{ this.salvarDados(); } }
          title="Salvar dados"
          color="#841584"
          accessibilityLabel="Salvar dados"/>
          
          <Button
          onPress={ ()=>{ this.listarDados(); } }
          title="Listar dados"
          color="#841584"
          accessibilityLabel="Listar dados"/>

          <Text>{pontuacao}</Text>
      </View>
    );
  }

}

AppRegistry.registerComponent('firebaseTeste', () => App );