import React, { useCallback, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import { FriendList } from "../components/FriendList";

interface Data {
  id: number;
  name: string;
  likes: number;
}

export function Home() {
  const [name, setName] = useState("");
  const [friends, setFriends] = useState([]);

  async function handleSearch() {
    const response = await fetch(`http://192.168.0.112:3333/friends?q=${name}`);
    const data = await response.json();

    const formattedData = data.map((item: Data) => {
      return {
        id: item.id,
        name: item.name,
        likes: item.likes,
        online: `${String(new Date().getHours()).padStart(2, "0")}:${String(
          new Date().getMinutes()
        ).padStart(2, "0")}`,
      };
    });

    setFriends(formattedData);
  }

  const handleFollow = useCallback(() => {
    console.log("follow user");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Amigos</Text>

      <TextInput
        placeholder="Nome do amigo"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Button title="Buscar" onPress={handleSearch} />

      <FriendList data={friends} follow={handleFollow} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    marginTop: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    padding: 7,
    marginVertical: 10,
  },
});
