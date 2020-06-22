import React, { useEffect, useState } from "react";
import api from "./services/api";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`, {
      url: "https://github.com/Rocketseat/umbriel",
      title: "Desafio - React Native",
      techs: ["Node", "Express", "TypeScript"],
    });

    const repository = repositories.filter(repository => repository.id !== id);

    setRepositories([...repository, response.data]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({ item: repository }) => (
            <View key={repository.id} style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repository.title}</Text>

              <FlatList
                data={repository.techs}
                keyExtractor={tech => tech}
                style={styles.techsContainer}
                renderItem={({ item: tech }) => (
                  <Text style={styles.tech}>{tech}</Text>
                )}
              />

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${repository.id}`}
                >
                  {`${repository.likes} curtidas`}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(`${repository.id}`)}
                testID={`like-button-${repository.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
