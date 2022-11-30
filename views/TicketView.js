import {ScrollView, View, Text} from "react-native";
import LabeledItem from "../components/LabeledItem";
import moment from "moment";
import {Button, Dialog, Paragraph, Portal, Provider} from "react-native-paper";
import {useContext, useState} from "react";
import {AuthContext} from "../auth/AuthContext";
import {BASE_URL} from "../constans";

export default function TicketView({route, navigation}) {
    const [isSuccess, setSuccess] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = useContext(AuthContext);

    const handleDialogCloseAfterSuccess = () => {
        navigation.navigate('Home');
    }

    const handleDialogCloseAfterFailure = () => {
        setSuccess(null);
        setShowDialog(false);
    }

    const handleSubmit = () => {
        setLoading(true);
        fetch(BASE_URL + "/api/ticket", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth.token
            },
            body: route.params
        }).then(res => {
            setLoading(false);
            if(res.ok)
                return res.json()
            else throw new Error(res.status)
        }).then(json => {
            setSuccess(json.success);
            setDialogMessage(json.message)
            setShowDialog(true);
        }).catch(e => {
            setSuccess(false);
            setDialogMessage("Serwer zwrócił błąd " + e.message)
            setShowDialog(true);
        })
    }

    const data = JSON.parse(route.params)

    let ticketData = [
        {
            label: "ID biletu",
            value: data.id
        },
        {
            label: "Typ biletu",
            value: data.type.toLowerCase() === "single" ? "Bilet jednorazowy" : "Karnet"
        },
        {
            label: "Aktywność",
            value: data.activityType
        },
        {
            label: "Cena",
            value: `${data.price} PLN`
        },
        {
            label: "Zniżka",
            value: `${data.discountType.name} (${data.discountType.value*100}%)`
        }
    ]

    if(data.type.toLowerCase() === "single") {
        ticketData.push(
            {
                label: "Wykorzystany?",
                value: data.numberOfUsages === 0 ? "Nie" : "Tak"
            }
        )
    } else {
        ticketData = ticketData.concat([
            {
                label:  "Liczba użyć",
                value: data.numberOfUsages
            },
            {
                label: "Maksymalna liczna użyć",
                value: data.totalUsages
            }
        ])
    }

    ticketData = ticketData.concat([
        {
            label: "Data zakupu",
            value: moment(data.purchasedAt).format('D MMMM YYYY')
        },
        {
            label: "Data ważności",
            value: moment(data.validTill).format('D MMMM YYYY')
        }
    ])

    const userData = [
        {
            label: "Imię i nazwisko",
            value: `${data.firstName} ${data.lastName}`
        },
        {
            label: "Numer pesel",
            value: data.nationalRegistryNumber
        },
        {
            label: "Adres e-mail",
            value: data.email
        },
        {
            label: "Numer telefonu",
            value: data.phoneNumber
        }
    ]

    return (
        <Provider>
            <ScrollView style={styles.container}>
                <Text style={styles.textHeader}>Informacje o bilecie</Text>
                <View style={styles.gutterBottom}>
                    {ticketData.map((item, index) =>
                        <LabeledItem key={item.label} label={item.label} value={item.value} index={index}/>
                    )}
                </View>
                <Text style={styles.textHeader}>Informacje o kliencie</Text>
                <View style={styles.gutterBottom}>
                    {userData.map((item, index) =>
                        <LabeledItem key={item.label} label={item.label} value={item.value} index={index}/>
                    )}
                </View>
                <View style={styles.gutterBottom}>
                    <Button mode="contained" contentStyle={styles.buttonContent}
                            color="#1976d2" style={styles.smallGutterBottom}
                            onPress={handleSubmit}
                            loading={loading}
                    >
                        Sprawdziłem dane i zatwierdzam bilet
                    </Button>
                    <Button mode="contained" contentStyle={styles.buttonContent}
                            color="#7b1fa2" style={styles.smallGutterBottom}
                            onPress={() => navigation.navigate('Home')}
                            disabled={loading}
                    >
                        Powrót do menu
                    </Button>
                </View>
                <Portal>
                    <Dialog visible={showDialog} onDismiss={isSuccess ? handleDialogCloseAfterSuccess : handleDialogCloseAfterFailure}>
                        <Dialog.Title>{isSuccess ? "Udało się" : "Coś poszło nie tak"}</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>
                                {dialogMessage}
                            </Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={isSuccess ? handleDialogCloseAfterSuccess : handleDialogCloseAfterFailure}>
                                Ok
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </ScrollView>
        </Provider>
    )
}

const styles = {
    container: {
        marginTop: 10,
        padding: 10,
    },
    textHeader: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10
    },
    gutterBottom: {
        marginBottom: 50
    },
    smallGutterBottom: {
        marginBottom: 10
    },
    buttonContent: {
        height: 50
    },
}