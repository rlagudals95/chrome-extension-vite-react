import { FILE_TYPE } from "../redux/modules/explorerModule";
import { StatusCodes } from "http-status-codes";
import AxiosInstance from "./AxiosInstance";
import { ISliceResponse } from "./SlicesApi";

export interface ILayerResponse {
  layer_id: string;
  parent_file_id: string;
  parent_slice_id: string;
  name: string;
  z_order: number;
  left: number;
  top: number;
  width: number;
  height: number;
  rotation: number;
  background: { uri?: string; file_id?: string };
  line: {
    dash_style: string;
    fore_color: string;
    weight: number;
    transparency: number;
  };
  fill: {
    fore_color: string;
    transparency: number;
  };
  text_frame: {
    margin_bottom: number;
    margin_left: number;
    margin_right: number;
    margin_top: number;
    vertical_anchor: string;
    text: string;
    paragraphs?: {
      start: number;
      end: number;
      horizontal_anchor: string;
      font: {
        size: number;
        name: string;
        bold: boolean;
        italic: boolean;
        underline: boolean;
        strike_through: boolean;
        fore_color: string;
        back_color: string;
      };
    }[];
  };
  create_time?: Date;
  update_time?: Date;
  update_user?: string;
}

export type GetLayerListResponse = ILayerResponse[];

export interface IGetSliceResponse extends ISliceResponse {
  layers?: GetLayerListResponse;
}
export interface IFileResponse {
  parent_file_id?: string;
  id: string;
  source_id?: string;
  uri?: string;
  type?: string;
  extension?: string;
  size?: number;
  name: string;
  path: string;
  thumbnail?: {
    uri?: string;
    file_id?: string;
  };
  create_user?: string;
  create_time?: string;
  update_time?: string;
  update_user?: string;
  writable?: string[];
  readable?: string[];
}
export interface IGetFileResponse extends IFileResponse {
  slices?: IGetSliceResponse[];
  width?: number;
  height?: number;
}
export interface IError {
  code: string;
  message: string;
}

export interface ICreateFileRequest {
  type: FILE_TYPE;
  name: string;
  extension: string;
  path: string;
  thumbnail: {
    file_id?: string
  };
}

export type ICreateFileResponse = IFileResponse;

export interface IUpdateFileRequest {
  name: string;
  extension: string;
  path: string;
  thumbnail: {
    file_id?: string
  };
  source_id: string;
}
class FilesApi {
  public async createFile(fileId: string, request: ICreateFileRequest): Promise<ICreateFileResponse | IError> {
    const url = `/files/${fileId}`;

    const result = await AxiosInstance.post(url, request);

    if (result.status !== StatusCodes.CREATED) {
      console.error(`Axios error status: ${result.status}`);
    }

    return result.data;
  }

  public async updateFile(fileId: string, request: IUpdateFileRequest): Promise<string | IError> {
    const url = `/files/${fileId}`;

    const result = await AxiosInstance.put(url, request);

    if (result.status !== StatusCodes.OK) {
      console.error(`Axios error status: ${result.status}`);
    }

    return result.data;
  }

  public async deleteFile(fileId: string): Promise<void | IError> {
    const url = `/files/${fileId}`;

    const result = await AxiosInstance.delete(url);

    if (result.status !== StatusCodes.OK) {
      console.error(`Axios error status: ${result.status}`);
    }
    return result.data;
  }
}

export default new FilesApi();
