import {View, Text} from "react-native";

export default function LabeledItem({label, value, index}) {

    return (
        <View style={[styles.container, index === 0 && styles.firstContainer]}>
            <Text style={styles.textLabel}>{label}</Text>
            <Text style={styles.textValue}>{value}</Text>
        </View>
    )
}

const styles = {
    container: {
        padding: 10,
      borderLeftWidth: 2,
      borderRightWidth: 2,
      borderBottomWidth: 2
    },
    firstContainer: {
      borderTopWidth: 2,
    },
    textLabel: {
        color: "gray",
        fontSize: 15
    },
    textValue: {
        fontSize: 25
    },
    buttonContent: {
        height: 50
    },
}