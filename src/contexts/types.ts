export interface Iclient {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface IloginClient {
  accessToken: string;
}
