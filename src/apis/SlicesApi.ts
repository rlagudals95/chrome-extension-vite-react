import { StatusCodes } from "http-status-codes";
import AxiosInstance from "./AxiosInstance";

export interface ISliceResponse {
  parent: string;
  slice_id: string;
  name: string;
  index: number;
  width: number;
  height: number;
  background: {
    file_id: string;
    uri: string;
  };
  paint_objects: (
    | {
      points: { x: number; y: number }[];
      strokeStyle: string;
      lineJoin: string;
      lineWidth: number;
      globalCompositeOperation: string;
    }
    | {
      sourceId: string;
      dx: number;
      dy: number;
      dWidth: number;
      dHeight: number;
    }
  )[];
  create_time: string;
  update_time: string;
  update_user: string;
}

export interface IError {
  code: string;
  message: string;
}

export interface ICreateSliceRequest {
  name: string;
  index: number;
  width: number;
  height: number;
  background: {
    file_id: string;
  };
  paint_objects: (
    | {
      points: { x: number; y: number }[];
      strokeStyle: string;
      lineJoin: string;
      lineWidth: number;
      globalCompositeOperation: string;
    }
    | {
      sourceId: string;
      dx: number;
      dy: number;
      dWidth: number;
      dHeight: number;
    }
  )[];
}

class SlicesApi {
  public async createSlice(
    fileId: string,
    request: ICreateSliceRequest
  ): Promise<ISliceResponse | IError> {
    const url = `/files/${fileId}/slices`;

    const result = await AxiosInstance.post(url, request);

    if (result.status !== StatusCodes.CREATED) {
      console.error(`Axios error status: ${result.status}`);
    }

    return result.data;
  }
}

export default new SlicesApi();
