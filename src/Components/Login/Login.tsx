import * as React from 'react';
import { resolve } from 'inversify-react';
import { IAuthService } from '../../services/AuthService/auth.service';
import {Formik, FormikActions, FormikProps, Form, Field, FieldProps} from 'formik'

interface IAuthFormValues{
    login:string,
    password:string
}

interface AuthState {
    model:{
        login:string;
        password:string;
    }
    submitError:string|null;
    isLoading:boolean;
}

export default class Login extends React.Component<{}, {}> {
    @resolve('IAuthService') private authService!:IAuthService;

    constructor(props: Readonly<{}>){
        super(props);
    }
    private handleSubmit = async (values: IAuthFormValues, actions: FormikActions<IAuthFormValues>) =>
    {
        try{
            const result = await this.authService.LogIn(values.login, values.password);
            if(!result){
                actions.setError("Wrong login or password");
                actions.setSubmitting(false);
            }
        }
        catch(e){
            actions.setError("Wrong login or password")
            actions.setSubmitting(false);
        }
    }
 
    initialValues = { login: "", password: "" }
    public render() {
        return (
            <Formik initialValues={{ login: '', password:'' }}
                onSubmit={this.handleSubmit}
                render={(props:FormikProps<IAuthFormValues>) => (
                    <Form>
                        <Field
                            name="login"
                            render={({ field, form }: FieldProps<IAuthFormValues>) => (
                                <div>
                                    <input type="text" {...field} placeholder="Login" />
                                </div>
                            )}
                        />
                        <Field
                            name="password"
                            render={({ field, form }: FieldProps<IAuthFormValues>) => (
                                <div>
                                    <input type="password" {...field} placeholder="Password" />
                                </div>
                            )}
                        />
                        <button type="submit">Submit</button>
                    </Form>
                )}>
            </Formik>
        );
    }
}
