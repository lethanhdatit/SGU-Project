import {createSelector} from '@ngrx/store';
import * as fromUser from '../_reducers/user.reducer';
import * as User from '../shared/user.model';
import { StoreModule} from '@ngrx/store';
import { from } from 'rxjs';

export interface UserState{
    entitie:fromUser.UserState;
}
export const reducers = {
    entitie:fromUser.userReducer
}
export const getAppLogin = (state:UserState) =>state.entitie;
export const getLogin = createSelector(getAppLogin,(state:fromUser.UserState)=>{
    return state.entities;
})