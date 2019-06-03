import "reflect-metadata";
import React, { Component } from 'react';
import './App.css';
import {Provider} from 'inversify-react'
import Main from './Components/main';
import { AtmentisContainer } from "./container";


export class App extends Component {
  render(){
    return (
      <Provider container={AtmentisContainer.Container}>
        <div className="App">
          <Main></Main>
        </div>
      </Provider>
    );
  }
}

export default App;
