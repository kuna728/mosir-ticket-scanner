import {Text, View} from "react-native";
import {Button} from "react-native-paper";
import {useContext} from "react";
import {AuthContext} from "../auth/AuthContext";

export default function HomeView({navigation}) {

    const auth = useContext(AuthContext);

    const handleLogout = () => {
        auth.logout();
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <View style={styles.verticalSpacing}>
                <Text style={styles.textSubtitle}>Zalogowano jako</Text>
                <Text style={styles.textHeader}>Andrzej Andrzejowicz</Text>
            </View>
            <View style={styles.verticalSpacing}>
                <Button mode="contained" contentStyle={styles.buttonContent}
                        color="#1976d2"
                        onPress={() => navigation.navigate('Scan')}>
                    Skanuj
                </Button>
            </View>
            <View style={styles.verticalSpacing}>
                <Button mode="contained" contentStyle={styles.buttonContent}
                        color="#7b1fa2"
                        onPress={handleLogout}>
                    Wyloguj
                </Button>
            </View>
        </View>
    )
}

const styles = {
    container: {
        marginTop: 20,
        padding: 10,
    },
    buttonContent: {
        height: 50
    },
    verticalSpacing: {
        marginTop: 5,
        marginBottom: 5
    },
    textHeader: {
        fontSize: 25
    },
    textSubtitle: {
        color: "gray",
        fontSize: 15
    }
}