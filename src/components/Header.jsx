import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const options = ["FOCUS TIME", "SHORT BREAK", "LONG BREAK"];

export default function Header({ currentTime, setCurrentTime, setTime }) {

    function handlePress(index) {
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
        setCurrentTime(index);
        setTime(newTime * 60);
    }

    return (
        <View style={{flexDirection: "row"}}>
            {options.map((item, index) => (
                <TouchableOpacity 
                    key={index} 
                    onPress={() => handlePress(index)} 
                    style={[styles.itemStyle, currentTime !== index && {borderColor: 'transparent'},
                    ]}
                >
                    <Text style={[{fontWeight: "bold"}, {color: "white"}]}>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    itemStyle: {
        justifyContent: "center",
        width: "33.33%",
        alignItems: "center",
        borderWidth: 2,
        padding: 5,
        borderRadius: 10,
        borderColor: "white",
        marginVertical: 60,
    },
});