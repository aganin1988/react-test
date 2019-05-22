import "reflect-metadata";
import * as React from 'react';
import { IAuthTokenProvider, AuthService } from '../services/AuthService/auth.service';
import { resolve } from "inversify-react";
import AuthComponent from "./AuthComponent/auth";

export interface IMainState {
    readonly isAuth:boolean;
}

export default class Main extends React.Component<{}, IMainState> {
  @resolve(AuthService) private readonly _authSevice!: AuthService;

  constructor(props:{}) {
    super(props);

    this.state = {
        isAuth:false,
    }
  }

  componentWillMount(){
      this.setState({ isAuth: this._authSevice.isAuthentificated})
      this._authSevice.on.addListener(AuthService.IS_AUTH_CHANGED, (value)=>{
        this.setState({isAuth:value});
      });
  }
  public render() {
      return (
        <div>
            { !this.state.isAuth &&          
            <AuthComponent/>
            }
            { this.state.isAuth && 
            <p>Hello world</p>
            }
        </div>
      );
    }
}
