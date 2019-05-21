import "reflect-metadata";
import * as React from 'react';
import { IAuthTokenProvider, AuthService } from '../services/AuthService/auth.service';
import { resolve } from "inversify-react";

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
  }
  public render() {
    return (
      <div>
        <p>Hello world</p>
      </div>
    );
  }
}
