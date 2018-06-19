import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ServerConnectorService} from "./server-connector.service";
import {HttpParams} from "@angular/common/http";

@Injectable()
export class UserDaoService {

  constructor(private serverConnector: ServerConnectorService) { }

  public searchUsers(username?: string, type?: string, isadmin?: string): Observable<any[]> {
    const searchUsersUrl = 'global/users';
    let searchUsersParams =  new HttpParams();

    if (username) {
      searchUsersParams = searchUsersParams.set('username', username);
    }
    if (type) {
      searchUsersParams = searchUsersParams.set('entity_type', type);
    }
    if (isadmin) {
      searchUsersParams = searchUsersParams.set('isadmin', isadmin);
    }

    const params = {params: searchUsersParams};
    return this.serverConnector.getData(searchUsersUrl, params);
  }

  public deleteUser(userId: number, userType: string, entityId: number): Observable<any> {
    const deleteUserUrl = 'global/deleteuser';
    let deleteUserParams =  new HttpParams();
    deleteUserParams = deleteUserParams.set('entity_type', userType);
    deleteUserParams = deleteUserParams.set('user_id', userId.toString());
    deleteUserParams = deleteUserParams.set('entity_id', entityId.toString());
    const params = {params: deleteUserParams};
    return this.serverConnector.deleteData(deleteUserUrl, params);
  }

  public getUsersDeiversity(): Observable<any[]> {
    const usersDiversityUrl = 'global/usersdiversity';
    return this.serverConnector.getData(usersDiversityUrl);
  }
}

