import "reflect-metadata";
import * as React from 'react';
import { IAuthTokenProvider} from '../services/AuthService/auth.service';
import { resolve } from "inversify-react";
import {Subscription } from 'rxjs';
import * as Login from "./Login/Login";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Content from "./Content/Content";

export interface IMainState {
    readonly isAuth:boolean;
}

export default class Main extends React.Component<{}, IMainState> {
  @resolve('IAuthTokenProvider') private readonly _authSevice!: IAuthTokenProvider;
  private sub!: Subscription;

  componentWillMount(){
    this.sub = this._authSevice.isAuthentificated$.subscribe(val => this.setState({ isAuth: val }));
  }
  componentWillUnmount(){
    this.sub.unsubscribe();
  }
  public render() {
      return !this.state.isAuth ? 
              <Login/> :
              <Content/>
      ;
    }
}
