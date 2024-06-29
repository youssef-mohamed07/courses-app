import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

const Header = (props) => {
    return (
        <View
            style={styles.view}
        >
            <Text
                style={styles.text}
            >
                React Native Tutorial
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        width:'100%',
        height: 50,
        backgroundColor: '#00fa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontSize: 25,
        fontWeight:'bold',
        color:'#0CBB95',
        
        textAlign: 'center',
    }
})

export default Header;