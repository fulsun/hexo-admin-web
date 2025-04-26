import request from '@/utils/request';

export interface LoginParams {
  telephone: string;
  password: string;
}

export const login = (data: LoginParams) => {
  return request.post('/auth/login', data);
};

export const register = (data: LoginParams) => {
  return request.post('/user/register',data);
}; 

const userApi = {
  login,
  register,
}
export default userApi;