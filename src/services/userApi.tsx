import { apiClient } from './articlesApi'
import { User, RegisterRequest,  LoginRequest, UpdateUserRequest } from '../types/UserInterfaces'

interface UserResponse {
    user: User;
}

export const loginUserApi = async (data: LoginRequest): Promise<UserResponse> => {
    const response = await apiClient.post<UserResponse>('/users/login', {
        user: {
            email: data.email,
            password: data.password,
        }
    });
    return response.data;
};

export const registerUserApi = async(data: RegisterRequest) : Promise<UserResponse> => {
    const res = await apiClient.post<UserResponse>('/users', {
        user: {
            username: data.username,
            email: data.email,
            password: data.password,
        }
    })
    return res.data
};

export const getCurrentUserApi = async (): Promise<UserResponse> => {
  const response = await apiClient.get<UserResponse>('/user');
  return response.data;
};

export const updateUserApi = async (data: UpdateUserRequest): Promise<UserResponse> => {
  const response = await apiClient.put<UserResponse>('/user', { user: data });
  return response.data;
};