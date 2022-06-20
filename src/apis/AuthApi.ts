import { StatusCodes } from "http-status-codes";
import AxiosInstance from "./AxiosInstance";

export interface ILoginRequest {
  user_id: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  expires_in: number;
  user_id: string;
}

export type IRefreshResponse = ILoginResponse;
export type IVerifyResponse = ILoginResponse;

export interface IError {
  code: string;
  message: string;
}

class AuthApi {
  public async issueToken(
    payload: ILoginRequest
  ): Promise<ILoginResponse | IError> {
    try {
      const url = `/auth/issue`;
      const result = await AxiosInstance.post(url, payload);

      if (result.status !== StatusCodes.OK) {
        console.error(`Axios error status: ${result.status}`);
      }
      return result.data as ILoginResponse;
    } catch (error) {
      throw error;
    }
  }

  public async refreshToken(): Promise<IRefreshResponse | IError> {
    try {
      const url = `/auth/refresh`;
      const result = await AxiosInstance.post(url);

      if (result.status !== StatusCodes.OK) {
        console.error(`Axios error status: ${result.status}`);
      }
      return result.data as IRefreshResponse;
    } catch (error) {
      throw error;
    }
  }

  public async verifyToken(): Promise<IVerifyResponse | IError> {
    try {
      const url = `/auth/verify`;
      const result = await AxiosInstance.get(url);

      if (result.status !== StatusCodes.OK) {
        console.error(`Axios error status: ${result.status}`);
      }
      return result.data as IVerifyResponse;
    } catch (error) {
      throw error;
    }
  }

  public async revokeToken(): Promise<void | IError> {
    try {
      const url = `/auth/revoke`;
      const result = await AxiosInstance.post(url);

      if (result.status !== StatusCodes.OK) {
        console.error(`Axios error status: ${result.status}`);
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthApi();
