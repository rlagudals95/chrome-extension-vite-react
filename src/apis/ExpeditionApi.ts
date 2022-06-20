import { StatusCodes } from "http-status-codes";
import qs from "qs";
import AxiosInstance from "./AxiosInstance";
export interface IExpeditionFileRight {
  user_id: string;
  writable: boolean;
  readable: boolean;
}

export interface IExpeditionFile {
  id: string;
  parent_file_id: string;
  uri: string;
  type: string;
  extension: string;
  size: number;
  width: number;
  height: number;
  name: string;
  path: string;
  thumbnail: string;
  favorite: boolean;
  rights: IExpeditionFileRight[];
  tag_ids: string[];
  create_time: string;
  update_time: string;
  update_user: string;
  create_user: string;
}

export interface IExpeditionFolder {
  id: string;
  parent_file_id: string;
  type: string;
  name: string;
  path: string;
  create_time: string;
  update_time: string;
  update_user: string;
}
export interface IExpeditionFilesResponse {
  files: IExpeditionFile[];
  total_size: number;
  next_page_token: [string, string, string];
}
export interface IExpeditionFoldersResponse {
  folders: IExpeditionFolder[];
  total_size: number;
  next_page_token: string;
}

export interface IExpeditionScrappingResponse {
  images: string[];
  thumbnail: string[];
  sku: string[];
  description: string[];
}
export interface IError {
  code: string;
  message: string;
}

export interface IUploadFileRequest {
  name: string;
  extension: string;
}

export interface IUploadFileResponse {
  fileId: string;
  full_name: string;
  expire: number;
  pre_signed_url: string;
}

export interface IGetTagResponse {
  tag_id: string;
  name: string;
  color: string;
  description: string;
}

export type IGetTagsResponse = IGetTagResponse[];

class ExpeditionApi {
  public async searchFiles(
    fileId: string,
    pageToken: [string, string, string],
    pageSize: number,
    query: string = ""
  ): Promise<IExpeditionFilesResponse | IError> {
    try {
      let url = `/files/${fileId}/search?${qs.stringify(
        { page_token: pageToken },
        { arrayFormat: "repeat" }
      )}`;

      if (pageSize > 0) {
        url += `&page_size=${pageSize}`;
      }

      if (query) {
        url += `&query=${query}`;
      }

      const result = await AxiosInstance.get(url);
      return result.data;
    } catch (error) {
      throw error;
    }
  }

  public async searchFolders(
    fileId: string
  ): Promise<IExpeditionFoldersResponse | IError> {
    try {
      const url = `/files/${fileId}/folders/search`;
      const result = await AxiosInstance.get(url);

      return result.data;
    } catch (error) {
      throw error;
    }
  }

  public async uploadFile(
    fileId: string,
    uploadFileRequest: IUploadFileRequest
  ): Promise<IUploadFileResponse | IError> {
    try {
      const url = `/files/${fileId}/upload`;
      const result = await AxiosInstance.post(url, uploadFileRequest);

      if (result.status !== StatusCodes.CREATED) {
        console.error(`Axios error status: ${result.status}`);
      }
      return result.data as IUploadFileResponse;
    } catch (error) {
      throw error;
    }
  }

  public async uploadFileData(
    preSignedUrl: string,
    data: File
  ): Promise<void | IError> {
    try {
      const result = await AxiosInstance.put(preSignedUrl, data, {
        withCredentials: false,
        //headers: []
      });

      if (result.status !== StatusCodes.OK) {
        console.error(`Axios error status: ${result.status}`);
      }
    } catch (error) {
      throw error;
    }
  }

  public async getTags(): Promise<IGetTagsResponse | IError> {
    try {
      const url = `/tags`;
      const result = await AxiosInstance.get(url);

      if (result.status !== StatusCodes.OK) {
        console.error(`Axios error status: ${result.status}`);
      }
      return result.data as IGetTagsResponse;
    } catch (error) {
      throw error;
    }
  }

  public async getFavoriteFiles(
    pageToken: [string, string, string],
    pageSize: number,
    query: string
  ): Promise<IExpeditionFilesResponse | IError> {
    try {
      let url = `/files/favorite/search?${qs.stringify(
        { page_token: pageToken },
        { arrayFormat: "repeat" }
      )}`;

      if (pageSize > 0) {
        url += `&page_size=${pageSize}`;
      }

      if (query) {
        url += `&query=${query}`;
      }

      const result = await AxiosInstance.get(url);

      if (result.status !== StatusCodes.OK) {
        console.error(`Axios error status: ${result.status}`);
      }
      return result.data as IExpeditionFilesResponse;
    } catch (error) {
      throw error;
    }
  }

  public async getRecentFiles(
    pageToken: [string, string, string],
    pageSize: number,
    query: string
  ): Promise<IExpeditionFilesResponse | IError> {
    try {
      let url = `/files/recent/search?${qs.stringify(
        { page_token: pageToken },
        { arrayFormat: "repeat" }
      )}`;

      if (pageSize > 0) {
        url += `&page_size=${pageSize}`;
      }

      if (query) {
        url += `&query=${query}`;
      }

      const result = await AxiosInstance.get(url);

      if (result.status !== StatusCodes.OK) {
        console.error(`Axios error status: ${result.status}`);
      }
      return result.data as IExpeditionFilesResponse;
    } catch (error) {
      throw error;
    }
  }

  public async scrapping(
    queryUrl: string
  ): Promise<IExpeditionScrappingResponse | IError> {
    try {
      const url = `/scrapping?url=${encodeURIComponent(queryUrl)}`;

      const result = await AxiosInstance.get(url);

      if (result.status !== StatusCodes.OK) {
        console.error(`Axios error status: ${result.status}`);
      }
      return result.data as IExpeditionScrappingResponse;
    } catch (error) {
      throw error;
    }
  }

  public async moveFile(
    fileId: string,
    parentFileId: string
  ): Promise<IExpeditionScrappingResponse | IError> {
    try {
      const url = `/files/${fileId}/move`;
      const paylaod = { parent: parentFileId };

      const result = await AxiosInstance.post(url, paylaod);

      if (result.status !== StatusCodes.OK) {
        console.error(`Axios error status: ${result.status}`);
      }
      return result.data as IExpeditionScrappingResponse;
    } catch (error) {
      throw error;
    }
  }
}

export default new ExpeditionApi();
