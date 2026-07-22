export interface IUser {
  id?: string;
  username?: string;
  email: string;
  password?: string;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
}
