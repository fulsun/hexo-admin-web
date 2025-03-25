// 如果 spring 错误，返回的对象格式
export interface SpringError {
    timestamp: string,
    status: number,
    error: string,
    message: string,
    path: string
  }
  
  // 如果 spring 成功，返回 list 情况
  export interface SpringList<T> {
    data: T[],
    message?: string,
    code: number
  }
  
  // 如果 spring 成功，返回 page 情况
  export interface SpringPage<T> {
    data: { list: T[], total: number },
    message?: string,
    code: number
  }
  
  // 如果 spring 成功，返回 string 情况
  export interface SpringString {
    data: string,
    message?: string,
    code: number
  }
  
  import type { AxiosResponse } from 'axios';
  export interface AxiosRespError extends AxiosResponse<SpringError> { }
  export interface AxiosRespList<T> extends AxiosResponse<SpringList<T>> { }
  export interface AxiosRespPage<T> extends AxiosResponse<SpringPage<T>> { }
  export interface AxiosRespString extends AxiosResponse<SpringString> { }