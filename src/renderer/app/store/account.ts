import { observable, action } from 'mobx';

import { IUser, IAuthLoginRes, IAppState } from '~/interfaces';
import { callApi } from '../utils';

export class AccountStore {
  @observable
  public data: IUser = {};

  @action
  public async login(
    username: string,
    password: string,
  ): Promise<IAuthLoginRes> {
    const res = await callApi<IAuthLoginRes>(
      'login',
      {
        username,
        password,
      },
      'post',
    );

    if (res.success) {
      this.data = res.user;
    }

    return res;
  }

  @action
  public inject(state: IAppState) {
    this.data = state.user;
  }

  public get isLogged() {
    return !!this.data;
  }
}
