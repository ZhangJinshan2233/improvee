import {UserType} from './userType'
export interface User{
    _id:string;
    email:string;
    userType:UserType;
    firstTimeLogin:boolean;
}