import { ITokenPayload } from '~/interfaces';

export interface IToken {
  type: 'ACCESS_TOKEN';
  data: ITokenPayload;
}
