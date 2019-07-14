import React, {Component} from 'react'
import {
    View,
    FlatList,
    StyleSheet
} from 'react-native'
import Header from '../components/Header'
import Post from '../components/Post'


class Feed extends Component{
    state ={
        post: [{
            id: Math.random(),
            nickname: 'Rafael Pereira Filho',
            email: 'rafaelprrflh@gmail.com',
            image: require('../../assets/imgs/fence.jpg'),
            comment: [{
                nickname: 'John Ray Sheldon',
                commnet: 'Stunning!'
            }, {
                nickname: 'Ana Julia Arruda',
                comment: 'Foto linda! Onde foi tirada?'
            }]
        }, {
            id: Math.random(),
            nickname: 'Francisco Leandro Lima',
            email: 'fllima@gmail.com',
            image: require('../../assets/imgs/bw.jpg'),
            comment:[]
        }]
    }

    render() {
        return(
            <View style={styles.container}>
                <Header />
                <FlatList
                    data={this.state.post}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) =>
                        <Post key={item.id} {...item} />} />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
})


export default Feed