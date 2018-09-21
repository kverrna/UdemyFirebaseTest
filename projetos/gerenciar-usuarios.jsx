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

  cadastrarUsuario(){
    var auth = firebase.auth();
    auth.createUserWithEmailAndPassword(
      "jamilton.cursos@gmail.com",
      "jamilton12345"
    ).catch(
      (erro) => {
        /*var mensagemErro = "";
        if( erro.code == "auth/weak-password" ){
          mensagemErro = "senha precisa ter no mínimo 6 digitos!! ";
        }
        alert(mensagemErro);*/
        alert(erro.message);
      }
    );
  }

  verificarUsuarioLogado(){
    firebase.auth().onAuthStateChanged( (usuario) => {
      if (usuario) {
        alert("logado");
      } else {
        alert("nao logado");
      }
    });
  }

  deslogarUsuario(){
    firebase.auth().signOut();
  }

  logarUsuario(){
    firebase.auth().signInWithEmailAndPassword(
      "jamilton.cursos@gmail.com",
      "jamilton12345"
    );
  }

  render(){

    return(
      <View>
        <Button
          onPress={ ()=>{ this.cadastrarUsuario(); } }
          title="Cadastrar usuário"
          color="#841584"
          accessibilityLabel="Cadastrar usuário"/>
          
          <Button
          onPress={ ()=>{ this.verificarUsuarioLogado(); } }
          title="Verificar usuário logado"
          color="#841584"
          accessibilityLabel="Verificar usuário logado"/>

          <Button
          onPress={ ()=>{ this.deslogarUsuario(); } }
          title="Deslogar usuario"
          color="#841584"
          accessibilityLabel="Deslogar usuario"/>

          <Button
          onPress={ ()=>{ this.logarUsuario(); } }
          title="Logar usuario"
          color="#841584"
          accessibilityLabel="Logar usuario"/>

      </View>
    );
  }

}

AppRegistry.registerComponent('firebaseTeste', () => App );