import { StatusCodes } from "http-status-codes";
import AxiosInstance from "./AxiosInstance";
import { IError } from "./SlicesApi";

class FavoriteApi {
  public async createFavorite(fileId: string): Promise<void | IError> {
    try {
      const url = `/files/${fileId}/favorite`;
      const result = await AxiosInstance.post(url);
      if (result.status !== StatusCodes.OK) {
        console.error(`Axios error status: ${result.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async deleteFavorite(fileId: string): Promise<void | IError> {
    try {
      const url = `/files/${fileId}/favorite`;
      const result = await AxiosInstance.delete(url);
      if (result.status !== StatusCodes.OK) {
        console.error(`Axios error status: ${result.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
export default new FavoriteApi();
