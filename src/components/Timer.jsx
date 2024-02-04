import { Text, View, StyleSheet } from "react-native";

export default function Timer({time}) {
    const formattedTime = `${Math.floor(time / 60).toString().padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;

    return(
        <View style={styles.container}>
            <Text style={styles.timer}>{formattedTime}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent", 
        color: "white",
        fontSize: 190
    },
    timer: {
        color: "white",
        textAlign: "center",
        fontSize: 80
    }
})