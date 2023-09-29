export interface JwtModel {
    token: string;
    type: string;
    email: string;
    authorities: string[];
}