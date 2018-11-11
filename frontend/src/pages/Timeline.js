import React, {Component} from 'react'
import api from '../services/api'
import socket from 'socket.io-client'

import twitterLogo from '../twitter.svg'
import './Timeline.css'

import Tweet from '../components/Tweet'



export default class Timeline extends Component {

    state = {
        tweets: [],
        newTweet: ''
    }
    //executado automaticamente quando a página é exibida em tela
    async componentDidMount(){
        this.subscribeToEvents()
        //pegando todos os tweets
        const response = await api.get('tweets')
        //inserindo no meu arrray
        this.setState({ tweets: response.data})
    }
    //usando sockt.io (yarn add socket.io-client) --> real time
    subscribeToEvents = () =>{
        const io = socket("http://localhost:3000")
        //spread operator (...) pega todos os tweets restantes
        io.on('tweet', data => {
            this.setState({ tweets: [data, ...this.state.tweets] })
        })

        io.on('like', data => {
            //Se o id da iteração é igual == o do evento(ou seja o tweet em q o like foi alterado), atulizo com as novas informações.
            this.setState({ tweets: this.state.tweets.map(
                tweet => (tweet._id === data._id ? data : tweet)
            )})
        })
    }

    handleInputChange = e =>{
        this.setState({ newTweet: e.target.value })
    }
    handleNewTweet = async e =>{
        // meu e vai retornar o código da tecla (keyCode)
        if(e.keyCode !== 13) return;

        const content = this.state.newTweet;
        const author = localStorage.getItem('@GoTwitter:username')

        await api.post('tweets', {content, author})
        //zerar o valor da textarea
        this.setState({newTweet:''})
    }

    render(){
        return (
            <div className="timeline-wrapper">
                <img height={24} src={twitterLogo} alt="GoTwitter" />
                <form>
                    <textarea 
                        value={this.state.newTweet} 
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleNewTweet}
                        placeholder="O que está acontecendo?"
                    />
                </form>
                <ul className="tweet-list">
                    {this.state.tweets.map(tweet => (
                        <Tweet key={tweet._id} tweet={tweet} />
                    ))}
                </ul>
            </div>
        );
    }
}