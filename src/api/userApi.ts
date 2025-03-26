import request from '@/utils/request';

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResult {
  token: string;
  userInfo: {
    id: number;
    username: string;
    nickname: string;
    avatar?: string;
  };
}

export const login = (data: LoginParams) => {
  return request.post('/login', data);
};

export const logout = () => {
  return request.post('/logout');
};

export const getUserInfo = () => {
  return request.get('/user/info');
}; 

const userApi = {
  login,
  logout,
  getUserInfo, 
}
export default userApi;