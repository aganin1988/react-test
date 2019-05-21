import {Container} from 'inversify';
import { IAuthTokenProvider, AuthService } from "./services/AuthService/auth.service";

export const container = new Container();
container.bind<IAuthTokenProvider>("IAuthTokenProvider").to(AuthService);