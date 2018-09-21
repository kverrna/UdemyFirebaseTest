import { AppRegistry } from 'react-native';
import App from './src/app';

AppRegistry.registerComponent('app3Firebase', () => App );

import firebase from 'firebase';
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Header } from './components/common';



class App extends Component {

	constructor(props){
	    super(props);
	    this.state = {pontuacao: 0 };
	}

	componentWillMount() {
		firebase.initializeApp(
			{
			    apiKey: "AIzaSyA3mxLg55kGJmdvBl6ynPu7PnY59utdANk",
			    authDomain: "configuracaoreactteste.firebaseapp.com",
			    databaseURL: "https://configuracaoreactteste.firebaseio.com",
			    storageBucket: "configuracaoreactteste.appspot.com",
			    messagingSenderId: "453215895837"
			}
		);
	}

	cadastrarUsuario(){
		//alert("Logar clicado");
		firebase.auth().createUserWithEmailAndPassword(
			'jamilton.cursos@gmail.com', '123456ja'
		).catch( (error) => {
			alert( error.code );
		});

	}

	logarUsuario(){
		//alert("Logar clicado");
		firebase.auth().signInWithEmailAndPassword(
			'jamilton.cursos@gmail.com', '123456ja'
		).catch( (error) => {
			alert( error.code );
		});

	}

	salvarDados(){
		var pontuacao = firebase.database().ref("usuarios");
		pontuacao.push().set(
		{
			nome: "Mariana Silva",
			usuario: "marianasilva",
			peso: "65KG",
			altura: "1,60"
		}
		);
	}

	recuperarDados(){
		const pontuacao = firebase.database()
								  .ref("pontuacao")
								  .child("jamiltondamasceno");
		pontuacao.on('value', (snapshot) => {
			var pontos = snapshot.val();
			this.setState({pontuacao: pontos });
		});

	}

	render(){
		let {pontuacao} = this.state;
		return(
			<View>
				<Button
				  onPress={this.cadastrarUsuario}
				  title="Cadastrar usuário"
				  color="#841584"
				  accessibilityLabel="Cadastrar usuário"
				/>

				<Button
				  onPress={this.logarUsuario}
				  title="Logar usuário"
				  color="#841584"
				  accessibilityLabel="Logar usuário"
				/>

				<Button
				  onPress={this.salvarDados}
				  title="Salvar dados"
				  color="#841584"
				  accessibilityLabel="Salvar dados"
				/>

				<Button
				  onPress={ () => {this.recuperarDados();} }
				  title="Recuperar dados"
				  color="#841584"
				  accessibilityLabel="Recuperar dados"
				/>

				<Text>{pontuacao}</Text>

			</View>
		);
	}
}

export default App;