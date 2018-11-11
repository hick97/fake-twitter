import React, {Component} from 'react'

import twitterLogo from '../twitter.svg'
import './Login.css'

export default class Login extends Component {
    //o state sempre que atualizado reinicia a redenrização
    state = {
        usernome:'', 
    };

    handleSubmit = e =>{
        //Evita redirecionamento automatico da página (eu quero controlar para onde a pag será redirecionada)
        e.preventDefault();
        
        const { username } = this.state
        //Caso n tenha username
        if (!username.length) return;
        //salvando o username no storage do browser
        localStorage.setItem('@GoTwitter:username', username)
        //feito automticamente, todo component criado no react router Dom tem acesso a esse método
        this.props.history.push('/timeline')
    }

    //Toda função q n eh padrao do react, deve ser criado como arrow function, para q a gente n perca ro escopo da classe
    handleInputChange = e =>{
      this.setState({ username: e.target.value })  
    }


    render(){
        return (
            <div className="login-wrapper">
                <img src= {twitterLogo} alt="GoTwitter" />
                <form onSubmit={this.handleSubmit}>
                    <input 
                        value={this.state.username}
                        onChange={this.handleInputChange} 
                        placeholder="Nome de usuário" 
                    />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        );
    }
}