import "reflect-metadata";
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {resolve, Provider} from 'inversify-react'
import { AuthService, IAuthTokenProvider } from './services/AuthService/auth.service';
import Main from './Components/main';
import { Container } from 'inversify';


export class App extends Component {
  constructor(props: any, context: any) {
    super(props, context);

    this.container = new Container();
    this.container.bind<AuthService>(AuthService).toSelf().inSingletonScope();
  }
  container: Container;
  render(){
    return (
      <Provider container={this.container}>
        <div className="App">
          <Main></Main>
        </div>
      </Provider>
    );
  }
}

export default App;
