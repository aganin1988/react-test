import "reflect-metadata";
import {} from  'axios'
import { injectable } from 'inversify';
import { EventEmitter } from 'events';

export interface IAuthTokenProvider{
    readonly authToken: string|null;
    readonly isAuthentificated: boolean;
    readonly on: EventEmitter;
}
@injectable()
export class AuthService implements IAuthTokenProvider {
    static readonly IS_AUTH_CHANGED = 'isAuthChanged';
    on: EventEmitter = new EventEmitter();

    private _authToken:string|null = null;
    public get authToken(): string|null{
        return this._authToken;
       // return localStorage.getItem('authToken') as string;
    }
    public get isAuthentificated():boolean{
        return this.authToken !== null;
    }
    public async LogIn(login:string, password:string):Promise<boolean>{
        this._authToken = "test auth Token";
        this.on.emit(AuthService.IS_AUTH_CHANGED, this.isAuthentificated);
        return true;
    }
}