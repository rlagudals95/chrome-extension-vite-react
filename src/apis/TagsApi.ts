// import {
//   IAssignTagActionPayload,
//   ICreateTagPayload,
//   IReleaseTagActionPayload,
//   IUpdateTagPayload
// } from "@redux/modules/explorerActionCreators";
// import { ITag } from "@redux/modules/explorerModule";
// import { StatusCodes } from "http-status-codes";
// import * as qs from "qs";
// import AxiosInstance from "./AxiosInstance";
// import TagsMapper from "./mapper/tags.mapper";
// import { IError } from "./SlicesApi";

// export interface IUpdateTagRequest {
//   tagId: string;
//   name: string;
//   color?: string;
//   description?: string;
// }

// export interface ICreateTagRequest {
//   name: string;
//   hexColor?: string;
//   description?: string;
// }

// export interface ITagResponse {
//   name: string;
//   tag_id: string;
//   description: string;
//   color: string;
// }

// class TagsApi {
//   public async updateTag(request: IUpdateTagPayload): Promise<void | IError> {
//     try {
//       const url = `/tags/${request.tagId}`;
//       const result = await AxiosInstance.put(url, TagsMapper.updateRequestMapper(request));
//       if (result.status !== StatusCodes.OK) {
//         console.error(`Axios error status: ${result.status}`);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   public async createTag(request: ICreateTagPayload): Promise<ITag | IError> {
//     try {
//       const url = `/tags`;
//       const result = await AxiosInstance.post(url, TagsMapper.createRequestMapper(request));
//       if (result.status !== StatusCodes.CREATED) {
//         console.error(`Axios error status: ${result.status}`);
//       }
//       return TagsMapper.repsonseToState(result.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   public async deleteTag(tagId: string): Promise<void | IError> {
//     try {
//       const url = `/tags/${tagId}`;
//       const result = await AxiosInstance.delete(url);
//       if (result.status !== StatusCodes.OK) {
//         console.error(`Axios error status: ${result.status}`);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   public async assignTag(
//     request: IAssignTagActionPayload
//   ): Promise<void | IError> {
//     try {
//       const url = `/tags/${request.tagId}/files`;
//       const result = await AxiosInstance.post(url, request.fileIds);
//       if (result.status !== StatusCodes.OK) {
//         console.error(`Axios error status: ${result.status}`);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   public async releaseTag(
//     request: IReleaseTagActionPayload
//   ): Promise<void | IError> {
//     try {
//       const url = `/tags/${
//         request.tagId
//       }/files?${qs.stringify(
//         { FileIds: request.fileIds },
//         { arrayFormat: "repeat" }
//       )}`;
//       const result = await AxiosInstance.delete(url);

//       if (result.status !== StatusCodes.OK) {
//         console.error(`Axios error status: ${result.status}`);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }
// export default new TagsApi();
