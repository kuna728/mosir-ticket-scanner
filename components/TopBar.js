import {Image, StyleSheet, Text, View} from "react-native";

export default function TopBar() {

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.image} source={require('../assets/logo_topbar.png')} />
                <Text style={styles.textLogo}>MOSIR</Text>
            </View>
            <Text style={styles.subText}>Skaner biletów</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // alignSelf: 'stretch',
        height: 52,
        flexDirection: 'row',
        backgroundColor: '#1976d2',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: 35,
        width: 35,
        marginRight: 6
    },
    textLogo: {
        color: 'white',
        fontFamily: 'monospace',
        fontWeight: '900',
        letterSpacing: 3,
        fontSize: 15
    },
    subText: {
        color: 'white',
    }
});