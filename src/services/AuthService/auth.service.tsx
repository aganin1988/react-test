import "reflect-metadata";
import {} from  'axios'
import { injectable } from 'inversify';
import { Observable, BehaviorSubject } from 'rxjs'

export interface IAuthTokenProvider{
    readonly authToken: string|null;
    readonly isAuthentificated$: Observable<boolean>;
}
export interface IAuthService{
    LogIn(login: string, password: string): Promise<boolean>
}

@injectable()
export class AuthService implements IAuthTokenProvider {
  
    private _authToken:string|null = null;
    private isAuthentificated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public get authToken(): string|null{
        return this._authToken;
    }

    public readonly isAuthentificated$ = this.isAuthentificated.asObservable();

    public async LogIn(login:string, password:string):Promise<boolean>{

        this.isAuthentificated.next(true);
        this._authToken = "test auth Token";
        return true;
    }
}