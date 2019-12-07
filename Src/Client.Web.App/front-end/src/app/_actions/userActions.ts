import { Action } from '@ngrx/store';
import {User} from '../shared/user.model';
 
export const ActionTypes = {
    CHECK_LOGIN:"CHECK LOGIN",
    LOGOUT:"LOGOUT"
}
export class CheckLoginAction implements Action{
    type = ActionTypes.CHECK_LOGIN;
    constructor(public payload:User){}
}
export class LogoutLoginAction implements Action{
    type = ActionTypes.LOGOUT;
    constructor(){}
}
 
export type Actions = CheckLoginAction
