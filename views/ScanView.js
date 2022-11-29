import {BarCodeScanner} from "expo-barcode-scanner";
import React, {useCallback, useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Camera} from "expo-camera";
import {Button, Dialog, Paragraph, Portal, Provider} from "react-native-paper";
import {useFocusEffect, useIsFocused} from "@react-navigation/native";

export default function ScanView({navigation}) {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [showWrongCodeMessage, setShowWrongCodeMessage] = useState(false);
    const isFocused = useIsFocused();

    useFocusEffect(
        useCallback(() => {
            setScanned(false);
        }, [])
    )

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        let qrinfo = null;
        try {
            qrinfo = JSON.parse(data).qrinfo
        } catch (e) { }
        if(qrinfo === "MOSIR_TICKET_QR"){
            navigation.navigate('Ticket', data);
        } else {
            setShowWrongCodeMessage(true);
        }
    };

    const hideDialog = () => {
        setScanned(false);
        setShowWrongCodeMessage(false);
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return isFocused && (
        <Provider>
            <View style={styles.container}>
                <Camera
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    barCodeScannerSettings={{
                        barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
                    }}
                    style={StyleSheet.absoluteFillObject} ratio="16:9"
                />
                <Button color="#7b1fa2" mode="contained" contentStyle={styles.buttonContent}
                        onPress={() => navigation.navigate('Home')}>
                    Powrót
                </Button>
                <Portal>
                    <Dialog visible={showWrongCodeMessage} onDimiss={hideDialog}>
                        <Dialog.Title>Kod niepoprawny</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>Wykryty kod jest niepoprawny. Upewnij się, że skanujesz właściwy kod i spróbuj ponownie.</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </Provider>
    );
}

const styles = {
    container: {
        width: '100%',
        height: '100%',
    },
    buttonContent: {
        height: 100
    }
}