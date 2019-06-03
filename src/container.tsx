import {Container} from 'inversify';
import { IAuthTokenProvider, AuthService, IAuthService } from "./services/AuthService/auth.service";

export class AtmentisContainer extends Container{
    private static _instance: Container;
    public static get Container():Container{
        if(AtmentisContainer._instance == null){
            const container = new AtmentisContainer();
            container.Build();
            AtmentisContainer._instance = container;
        }
        return AtmentisContainer._instance;   
    }
    public Build(){
        this.bind<AuthService>(AuthService).toSelf().inSingletonScope();
        this.bind<IAuthTokenProvider>("IAuthTokenProvider").toService(AuthService);
        this.bind<IAuthService>("IAuthService").toService(AuthService);

    }
    /**
     *
     */
    private constructor() {
        super();
        
    }
}
