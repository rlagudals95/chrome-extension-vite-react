// import { ICreateTagPayload, IUpdateTagPayload } from "@redux/modules/explorerActionCreators";
// import { ITag } from "@redux/modules/explorerModule";
// import { ITagResponse, IUpdateTagRequest } from "apis/TagsApi";

// // eslint-disable-next-line @typescript-eslint/no-extraneous-class
// export default class ExpeditionMapper {
//   public static repsonseToState(tag: ITagResponse): ITag {
//     return {
//       name: tag.name,
//       tagId: tag.tag_id,
//       description: tag.description,
//       hexColor: tag.color
//     };
//   }

//   public static createRequestMapper(
//     tag: ICreateTagPayload
//   ): ICreateTagPayload {
//     return {
//       name: tag.name,
//       color: tag.color,
//       description: tag.description
//     };
//   }

//   public static updateRequestMapper(
//     tag: IUpdateTagPayload
//   ): IUpdateTagRequest {
//     return {
//       name: tag.name,
//       tagId: tag.tagId,
//       color: tag.hexColor,
//       description: tag.description
//     };
//   }
// }
