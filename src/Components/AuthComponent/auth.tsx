import * as React from 'react';
import { resolve } from 'inversify-react';
import { AuthService } from '../../services/AuthService/auth.service';

export interface AuthProps {
}

export interface AuthState {
    model:{
        login:string;
        password:string;
    };
    submitError:string|null;
    isLoading:boolean;
}

export default class AuthComponent extends React.Component<AuthProps, AuthState> {
    @resolve(AuthService) private authService!:AuthService;

    private handleSubmit = async (e:React.FormEvent<HTMLFormElement>) : Promise<void> =>
    {
        e.preventDefault();
        const state = this.state;
        this.setState({isLoading:true});
        try{
            const result = await this.authService.LogIn(state.model.login, state.model.password);
            if(result)
                return;
            if(!result)
                this.setState({submitError:"Wrong login or password"});
        }
        catch(e){
            this.setState({submitError:e.message});
        }
        // finally{
        //     this.setState({isLoading:false});

        // }
    }

  constructor(props: AuthProps) {
    super(props);
    this.state = {
        model:{
            login : "",
            password: ""
        },
        submitError: null,
        isLoading:false
    };
  }

  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
         <label>
             login:
             <input name="login" type="text" value={this.state.model.login} onChange={
                (e: React.ChangeEvent<HTMLInputElement>) =>
                    this.setState({model:{login:e.target.value, password:this.state.model.password}})
            }></input>
         </label>
         <label>
             password:
             <input name="password" type="text" value={this.state.model.password} onChange={
                (e: React.ChangeEvent<HTMLInputElement>) =>
                    this.setState({model:{password:e.target.value, login:this.state.model.login}})
            }></input>
         </label>
         <button type="submit">OK</button>
      </form>
    );
  }
}
