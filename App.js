import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import firebase from "./src/firebaseConnection";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  console.disableYellowBox = true; //desabilita warnings amarelos. ''avisos menos graves''

  async function cadastrar() {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        alert("usuario criado: " + value.user.email);
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          alert("sua senha deve ter pelo menos 6 caracteres");
          return;
        }
        if (error.code === "auth/invalid-email") {
          alert("email invalido, por favor revise o email digitado");
          return;
        } else {
          alert("Ops aldo deu errado!");
          return;
        }
      });
    setEmail("");
    setPassword("");
    Keyboard.dismiss();
  }

  async function login() {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        alert("Bem-vindo: " + value.user.email);
        setUser(value.user.email);
      })
      .catch((error) => {
        alert("Ops algo deu errado!");
        return;
      });

    setEmail("");
    setPassword("");
    Keyboard.dismiss();
  }

  async function logout() {
    await firebase.auth().signOut();
    setUser("");
    alert("deslogado com sucesso...");
  }

  return (
    <View style={styles.container}>
      {user != "" && (
        <View>
          <Text style={styles.user}>Bem vindo: {user}</Text>
        </View>
      )}

      <View>
        <Text style={styles.title}>E-mail:</Text>
        <TextInput
          style={styles.textInput}
          underlineColorAndroid="transparent"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <Text style={styles.title}>Senha:</Text>
        <TextInput
          style={styles.textInput}
          underlineColorAndroid="transparent"
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      <View>
        <View style={styles.button}>
          <TouchableOpacity onPress={cadastrar}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        {user == "" ? (
          <View style={[styles.button, { backgroundColor: "#FFC107" }]}>
            <TouchableOpacity onPress={login}>
              <Text style={[styles.buttonText, { color: "#7952B3" }]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[styles.button, { backgroundColor: "#F90716" }]}>
            <TouchableOpacity onPress={logout}>
              <Text style={[styles.buttonText, { color: "#e1e8eb" }]}>
                Sair
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 32,
    backgroundColor: "#343A40",
    justifyContent: "space-between",
  },
  user: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 23,
    textAlign: "center",
    color: "#e1e8eb",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFC107",
    marginBottom: 8,
  },
  textInput: {
    height: 48,
    padding: 8,
    paddingLeft: 12,
    marginBottom: 16,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "#FFC107",
    backgroundColor: "#E1E8EB",
    elevation: 1,
    fontSize: 24,
  },
  button: {
    height: 48,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: "#7952B3",
  },
  buttonText: {
    fontSize: 24,
    color: "#FFC107",
  },
});
