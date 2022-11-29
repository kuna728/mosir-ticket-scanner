import {useCallback, useContext, useState} from "react";
import {Text, View} from "react-native";
import {Button, TextInput} from 'react-native-paper';
import {AuthContext} from "../auth/AuthContext";
import {useFocusEffect} from "@react-navigation/native";

export default function LoginView({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');

    const auth = useContext(AuthContext);

    useFocusEffect(
        useCallback(() => {
            setUsername('');
            setPassword('');
            setErrorText('');
        }, [])
    )

    const handleSubmit = () => auth.login(username, password).then(success => {
        if(success) {
            setErrorText('');
            navigation.navigate('Home');
        } else
            setErrorText('Podano zły login lub hasło');

    }).catch(e => {
        if(e.name === 'WRONG_ROLE_EXCEPTION')
            setErrorText("Konto nie posiada uprawnień do korzystania z aplikacji");
        else
            setErrorText("Coś poszło nie tak. Spróbuj ponownie później");
    })

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.mainText}>Logowanie</Text>
            </View>
            {errorText && (
                <View>
                    <Text style={styles.errorText}>{errorText}</Text>
                </View>
            )}
            <View style={styles.textInput}>
                <TextInput placeholder="Login lub email" mode="outlined"
                           onChangeText={value => setUsername(value)}
                           value={username}
                           activeOutlineColor="#1976d2"
                />
            </View>
            <View style={styles.textInput}>
                <TextInput placeholder="Hasło" mode="outlined"
                           onChangeText={value => setPassword(value)}
                           value={password}
                           secureTextEntry={true}
                           activeOutlineColor="#1976d2"
                />
            </View>
            <View style={styles.submitButton}>
                <Button mode="contained"
                        onPress={handleSubmit}
                        color="#1976d2" contentStyle={styles.submitButtonContent}
                >
                    Zaloguj
                </Button>
            </View>
        </View>
    )
}

const styles = {
    container: {
        marginTop: 50,
        padding: 10,
    },
    mainText: {
        fontSize: 50,
        fontWeight: '300'
    },
    errorText: {
        color: 'red'
    },
    textInput: {
        marginTop: 10
    },
    submitButton: {
        marginTop: 15,
    },
    submitButtonContent: {
        height: 50
    }
}