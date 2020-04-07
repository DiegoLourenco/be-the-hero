import React from "react";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Text,
  Linking,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MailComposer from "expo-mail-composer";

import logoImg from "../../assets/logo.png";

import styles from "./styles";

export default function Detail() {
  const route = useRoute();
  const navigation = useNavigation();

  const incident = route.params.incident;
  const value = Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(incident.value);

  const message = `Olá ${incident.name}, estou entrando em contato, pois, gostaria ajudar no caso "${incident.title}" com o valor ${value}`;

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `${incident.title}`,
      recipients: [incident.email],
      body: message,
    });
  }

  function senWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />

        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e82041" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.incident}>
          <Text style={[styles.incidentProperty, { marginTop: 0 }]}>Ong:</Text>
          <Text style={styles.incidentValue}>{incident.name}</Text>

          <Text style={styles.incidentProperty}>Localização:</Text>
          <Text style={styles.incidentValue}>
            {incident.city} / {incident.uf}
          </Text>

          <Text style={styles.incidentProperty}>Caso:</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>

          <Text style={styles.incidentProperty}>Descrição:</Text>
          <Text style={styles.incidentValue}>{incident.description}</Text>

          <Text style={styles.incidentProperty}>Valor:</Text>
          <Text style={styles.incidentValue}>{value}</Text>
        </View>

        <View style={styles.contactBox}>
          <Text style={styles.heroTitle}>Salve o dia!</Text>
          <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

          <Text style={styles.heroDescription}>Entre em contato: </Text>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.action} onPress={senWhatsapp}>
              <Text style={styles.actionText}>
                <FontAwesome5 name="whatsapp" size={25} color="#fff" />
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.action} onPress={sendMail}>
              <Text style={styles.actionText}>
                <FontAwesome5 name="envelope" size={25} color="#fff" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
