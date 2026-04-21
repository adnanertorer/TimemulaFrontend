import { BaseResponse } from '../model/BaseResponse';
import { AuthService } from './auth.service';

// tslint:disable-next-line: typedef
export function appInitializer(authService: AuthService){
    return () =>
        new Promise((resolve: any) => {
            console.log('refresh token on app start up');
            authService.refreshToken().subscribe().add(resolve);
        });
}