// import { IExpeditionFile, IExpeditionFilesResponse } from "apis/ExpeditionApi";
// import { ActionType, getType } from "typesafe-actions";
// import { IBaseState } from "./baseModule";
// import * as explorerActionCreators from "./explorerActionCreators";

export enum FILE_TYPE {
  FOLDER = "folder",
  FILE = "file"
}


// export enum VIEW_MODE {
//   LIST_VIEW = "LIST_VIEW",
//   GRID_VIEW = "GRID_VIEW"
// }
// export interface IFolderPath {
//   parent_file_id: string;
//   file_id: string;
//   name: string;
//   path: string;
//   subFolders: IFolderPath[];
// }
// export interface ITag {
//   tagId: string;
//   name: string;
//   hexColor?: string;
//   description?: string;
// }
// export interface IShare {
//   userId: string;
//   writable: boolean;
//   readable: boolean;
// }


// export enum FILE_EXTENSION {
//   PROJECT = "proj",
//   FOLDER = "folder",
//   JPG = "jpg",
//   JPEG = "jpeg",
//   PNG = "png"
// }

// export interface IScrapImages {
//   images: string[];
//   thumbnail: string[];
//   sku: string[];
//   description: string[];
// }

// export type ISize = explorerActionCreators.IFileListViewSizePayload;
// export interface IExplorerState extends IBaseState {
//   previewFile: IExpeditionFile;
//   previewVisible: boolean;
//   viewMode: VIEW_MODE;
//   currentFolderPath: IFolderPath[];
//   files: IExpeditionFile[];
//   selectedFiles: IExpeditionFile[];
//   filteredFiles: IExpeditionFile[];
//   scrappedFiles: IScrapImages;
//   tags: ITag[];
//   selectedTags: ITag[];
//   selectedTagRows: ITag[];
//   pageToken: [string, string, string];
//   pageSize: number;
//   totalSize: number;
//   progress: number;
// }

// const initialState: IExplorerState = {
//   error: "",
//   loaded: false,
//   pending: false,
//   previewFile: null,
//   previewVisible: false,
//   viewMode: VIEW_MODE.GRID_VIEW,
//   currentFolderPath: [],
//   files: [],
//   selectedFiles: [],
//   filteredFiles: [],
//   scrappedFiles: null,
//   tags: [],
//   selectedTags: [],
//   selectedTagRows: [],
//   pageToken: null,
//   pageSize: 1000,
//   totalSize: 0,
//   progress: 0
// };

// export function explorerReducer(
//   state: IExplorerState = initialState,
//   action: ActionType<typeof explorerActionCreators>
// ): IExplorerState {
//   switch (action.type) {
//     case getType(explorerActionCreators.setPageToken):
//       return {
//         ...state,
//         pageToken: action.payload
//       };
//     case getType(explorerActionCreators.setPageSize):
//       return {
//         ...state
//         // pageSize: action.payload
//       };
//     case getType(explorerActionCreators.setPreviewFile):
//       return {
//         ...state,
//         previewFile: action.payload
//       };
//     case getType(explorerActionCreators.setPreviewVisible):
//       return {
//         ...state,
//         previewVisible: action.payload
//       };
//     case getType(explorerActionCreators.setViewMode):
//       return {
//         ...state,
//         viewMode: action.payload
//       };
//     case getType(explorerActionCreators.setFolderPath):
//       return {
//         ...state,
//         currentFolderPath: action.payload
//       };
//     case getType(explorerActionCreators.setProgress):
//       return {
//         ...state,
//         progress: action.payload
//       };
//     case getType(explorerActionCreators.setFiles): {
//       /**
//        * 1.폴더가 가장 먼저 나옴
//        * 2.프로젝트 파일이 그다음 나옴
//        * 3.이름 순으로 정렬
//        */
//       const sortedFiles = Array.from(action.payload).sort((a, b) => {
//         if (a.type !== b.type) {
//           if (a.type === FILE_TYPE.FOLDER) {
//             return -1;
//           } else {
//             return 1;
//           }
//         }

//         if (a.extension !== b.extension) {
//           if (a.extension === FILE_EXTENSION.PROJECT) {
//             return -1;
//           } else {
//             return 1;
//           }
//         }

//         const nameA = a.name.toUpperCase();
//         const nameB = b.name.toUpperCase();

//         if (nameA < nameB) {
//           return -1;
//         }
//         if (nameA > nameB) {
//           return 1;
//         }

//         return 0;
//       });

//       return {
//         ...state,
//         files: sortedFiles
//       };
//     }
//     case getType(explorerActionCreators.setFilteredFiles):
//       return {
//         ...state,
//         filteredFiles: action.payload
//       };
//     case getType(explorerActionCreators.setSelectedFiles):
//       return {
//         ...state,
//         selectedFiles: action.payload
//       };
//     case getType(explorerActionCreators.getTags.setFulfilled):
//       return {
//         ...state,
//         tags: action.payload
//       };
//     case getType(explorerActionCreators.favoriteFiles.setPending):
//     case getType(explorerActionCreators.recentFiles.setPending):
//     case getType(explorerActionCreators.searchFiles.setPending):
//     case getType(explorerActionCreators.moveFiles.setPending):
//       return {
//         ...state,
//         progress: 0,
//         loaded: false,
//         pending: true
//       };
//     case getType(explorerActionCreators.recentFiles.setFulfilled):
//     case getType(explorerActionCreators.favoriteFiles.setFulfilled):
//     case getType(explorerActionCreators.searchFiles.setFulfilled):
//       const response = action.payload as IExpeditionFilesResponse;
//       const sortedFiles: IExpeditionFile[] = Array.from(
//         response.files.filter(file => {
//           return file;
//         }) || []
//       )
//         .sort((a, b) => {
//           /**
//            * 1.폴더가 가장 먼저 나옴
//            * 2.프로젝트 파일이 그다음 나옴
//            * 3.이름 순으로 정렬
//            */
//           if (a.type !== b.type) {
//             if (a.type === FILE_TYPE.FOLDER) {
//               return -1;
//             } else {
//               return 1;
//             }
//           }

//           if (a.extension !== b.extension) {
//             if (a.extension === FILE_EXTENSION.PROJECT) {
//               return -1;
//             } else {
//               return 1;
//             }
//           }

//           const nameA = a.name.toUpperCase();
//           const nameB = b.name.toUpperCase();

//           if (nameA < nameB) {
//             return -1;
//           }
//           if (nameA > nameB) {
//             return 1;
//           }

//           return 0;
//         });
//       return {
//         ...state,
//         files: sortedFiles,
//         pageToken: response.next_page_token,
//         totalSize: response.total_size,
//         error: "",
//         loaded: true,
//         pending: false
//       };
//     case getType(explorerActionCreators.favoriteFiles.setRejected):
//     case getType(explorerActionCreators.recentFiles.setRejected):
//     case getType(explorerActionCreators.searchFiles.setRejected):
//     case getType(explorerActionCreators.moveFiles.setRejected):
//       return {
//         ...state,
//         error: action.message,
//         loaded: true,
//         pending: false
//       };
//     case getType(explorerActionCreators.updateTag.setFulfilled): {
//       const targetTag = { ...action.payload };
//       const tags = Array.from(state.tags).map(tag =>
//         tag.tagId === targetTag.tagId ? targetTag : tag
//       );
//       return {
//         ...state,
//         tags
//       };
//     }
//     case getType(explorerActionCreators.createTag.setFulfilled): {
//       return {
//         ...state,
//         tags: [...state.tags, ...[action.payload]]
//       };
//     }
//     case getType(explorerActionCreators.deleteTag.setFulfilled): {
//       const index = state.tags.findIndex(tag => tag.tagId === action.payload);
//       state.tags.splice(index, 1);
//       return {
//         ...state,
//         tags: [...state.tags]
//       };
//     }
//     case getType(explorerActionCreators.setSelectedTagRows): {
//       return {
//         ...state,
//         selectedTagRows: action.payload
//       };
//     }
//     case getType(explorerActionCreators.assignTag.invoke): {
//       // @todo
//       return {
//         ...state
//       };
//     }
//     case getType(explorerActionCreators.releaseTag.invoke): {
//       // @todo
//       return {
//         ...state
//       };
//     }
//     case getType(explorerActionCreators.createFavorite.setFulfilled): {
//       const index = state.files.findIndex(
//         file => file.id === action.payload
//       );
//       const files = [...state.files];
//       files[index].favorite = true;
//       return {
//         ...state,
//         files
//       };
//     }
//     case getType(explorerActionCreators.deleteFavorite.setFulfilled): {
//       const index = state.files.findIndex(
//         file => file.id === action.payload
//       );
//       const files = state.files;
//       files[index].favorite = false;
//       return {
//         ...state,
//         files
//       };
//     }
//     case getType(explorerActionCreators.scrappingFiles.setPending): {
//       return {
//         ...state,
//         loaded: false,
//         pending: true
//       };
//     }
//     case getType(explorerActionCreators.scrappingFiles.setRejected): {
//       return {
//         ...state,
//         error: action.message,
//         loaded: true,
//         pending: false
//       };
//     }
//     case getType(explorerActionCreators.scrappingFiles.setFulfilled): {
//       const response = action.payload;

//       return {
//         ...state,
//         error: "",
//         loaded: true,
//         pending: false,
//         scrappedFiles: {
//           images: response.images,
//           thumbnail: response.thumbnail,
//           sku: response.sku,
//           description: response.description
//         }
//       };
//     }
//     case getType(explorerActionCreators.moveFiles.setFulfilled): {
//       return {
//         ...state,
//         error: "",
//         loaded: true,
//         pending: false,
//         progress: 100
//       };
//     }
//     default:
//       return state;
//   }
// }
