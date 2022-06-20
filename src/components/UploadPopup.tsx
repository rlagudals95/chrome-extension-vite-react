// import { MENU_KEY } from "@components/navigations/FolderNavigation";
// import { Color } from "@constants";
// import { IStore } from "@redux/IStore";
// import { addUsedCredit, getLicenseInfo } from "@redux/modules/deductionActionCreators";
// import { searchFiles } from "@redux/modules/explorerActionCreators";
// import { IFolderPath } from "@redux/modules/explorerModule";
// import { setUploadPopupVisible } from "@redux/modules/popupActionCreators";
// import {
//   setUploadFilesInfo,
//   setUploadFolderInfo,
//   uploadFiles
// } from "@redux/modules/uploadActionCreators";
// import {
//   getCountLicenseInfo,
//   getCreditLicenseInfo,
//   getStartLicenseInfo,
//   getTimeLicenseInfo
// } from "@utils/licenseFilter";
// import { em, percent, px, viewHeight, viewWidth } from "csx";
// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState
// } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { authenticationUserId } from "selectors/authenticationSelector";
// import { explorerCurrentFolderPath } from "selectors/explorerSelector";
// import {
//   uploadProgress,
//   uploadUploadFilesInfo,
//   uploadUploadFolderInfo
// } from "selectors/uploadSelector";
// import { classes, stylesheet } from "typestyle";
// import { Confirm, CONFIRM_TYPE } from "./Confirm";
// import { PCUploadPanel } from "./PCUploadPanel";
// import { UrlUploadPanel } from "./UrlUploadPanel";

// import closeImg from "@images/svg/close.svg";
// import dangerImg from "@images/svg/danger.svg";
// import folderBtnImg from "@images/svg/folder_btn.svg";
// import {
//   deductionDeductionInfo,
//   deductionLicenseInfos
// } from "selectors/deductionSelector";

// export const classNames = stylesheet({
//   overlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: viewWidth(100),
//     height: viewHeight(100),
//     background: `rgba(128, 128, 128, 0.5)`
//   },
//   upload_popup: {
//     "&.url": {
//       width: px(1283)
//     },
//     "&.pc": {
//       width: px(780)
//     },
//     width: px(970),
//     position: "absolute",
//     height: px(744),
//     top: percent(50),
//     left: percent(50),
//     fontWeight: 400,
//     fontSize: px(13),
//     lineHeight: px(16),
//     letterSpacing: em(-0.04),
//     transform: `translate(${percent(-50)}, ${percent(-50)})`,
//     transition: `width .5s`,
//     background: Color.PRIMARY_WHITE,
//     boxShadow: `${px(0)} ${px(6)} ${px(16)} rgba(0, 0, 0, 0.1)`,
//     borderRadius: px(6),
//     overflow: "hidden",
//     display: "flex",
//     flexDirection: "column"
//   },
//   upload_popup_header: {
//     "& .tabs": {
//       "& .tab": {
//         "&:hover": {
//           background: Color.GRAY_1
//         },
//         "&.active": {
//           "&:hover": {
//             background: Color.PRIMARY_WHITE
//           },
//           "&::after": {
//             position: "absolute",
//             width: percent(100),
//             height: percent(100),
//             content: "''",
//             borderBottom: `3px solid ${Color.PRIMARY_3}`
//           },
//           color: Color.PRIMARY_3,
//           background: Color.SECONDARY_1
//         },
//         fontWeight: 600,
//         position: "relative",
//         cursor: "pointer",
//         width: px(160),
//         height: percent(100),
//         color: Color.GRAY_3,
//         background: Color.SECONDARY_1,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center"
//       },
//       height: percent(100),
//       display: "flex",
//       flexDirection: "row",
//       justifyContent: "flex-start"
//     },
//     "& .closebtn": {
//       marginRight: px(22)
//     },
//     width: percent(100),
//     height: px(56),
//     background: Color.SECONDARY_1,
//     borderRadius: `6px 6px 0 0`,
//     borderBottom: `1px solid ${Color.GRAY_2}`,
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center"
//   },
//   upload_popup_body: {
//     width: percent(100),
//     height: px(610),
//     display: "flex",
//     flexDirection: "row"
//   },
//   upload_popup_bottom: {
//     "&::before": {
//       position: "absolute",
//       content: "''",
//       top: 0,
//       width: percent(100),
//       height: px(1),
//       borderTop: `1px solid ${Color.GRAY_2}`
//     },
//     position: "relative",
//     width: percent(100),
//     height: px(82),
//     display: "flex",
//     flexDirection: "row"
//   },
//   upload_popup_progress: {
//     position: "absolute",
//     width: percent(100),
//     height: px(4),
//     background: Color.GRAY_2,
//     overflow: "hidden"
//   },
//   upload_popup_progress_bar: {
//     "&.complete": {
//       backgroundColor: Color.THEME_TOAST_COMPLETE
//     },
//     "&.error": {
//       backgroundColor: Color.THEME_TOAST_ERROR
//     },
//     height: percent(100),
//     width: percent(100),
//     backgroundColor: Color.THEME_TOAST_PROCESSING,
//     transition: `transform 500ms, background-color 600ms`
//   },
//   upload_popup_deduction: {
//     "& .up": {
//       "& .left": {
//         margin: `0px 10px`,
//         color: Color.GRAY_4,
//         fontSize: px(12),
//         lineHeight: px(16),
//         letterSpacing: em(-0.04)
//       },
//       "& .right": {
//         margin: `0px 2px`,
//         color: Color.PRIMARY_3,
//         fontSize: px(18),
//         lineHeight: px(22),
//         letterSpacing: em(-0.04),
//         fontWeight: "bold"
//       },
//       width: percent(100),
//       height: px(30),
//       display: "flex",
//       flexDirection: "row",
//       justifyContent: "space-between",
//       alignItems: "center"
//     },
//     "& .down": {
//       "& .failed-count": {
//         "& .icon": {
//           marginRight: px(2),
//           width: px(18),
//           height: px(18),
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center"
//         },
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         fontSize: px(10),
//         lineHeight: px(16),
//         letterSpacing: em(-0.04),
//         color: Color.GRAY_4
//       },
//       width: percent(100),
//       height: px(18),
//       display: "flex",
//       flexDirection: "row",
//       justifyContent: "flex-end",
//       alignItems: "center"
//     },
//     flex: `0 0 ${px(320)}`,
//     height: percent(100),
//     borderRight: `1px solid ${Color.GRAY_2}`,
//     background: Color.PRIMARY_1,
//     borderRadius: `0 0 0 6px`,
//     padding: `${px(17)} ${px(30)}`,
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   upload_popup_path: {
//     "& .path": {
//       "& .guidance": {
//         display: "flex",
//         justifyContent: "flex-start",
//         color: Color.GRAY_3,
//         fontSize: px(10),
//         lineHeight: px(12)
//       },
//       "& .folder": {
//         "& .icon": {
//           width: px(18),
//           height: px(18),
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center"
//         },
//         "& input": {
//           "&::placeholder": {
//             color: Color.GRAY_3
//           },
//           "&:focus": {
//             outline: "none",
//             border: `1px solid ${Color.SECONDARY_2}`,
//             boxSizing: "border-box"
//           },
//           padding: `0px 5px`,
//           height: px(18),
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           color: Color.GRAY_4,
//           background: "transparent"
//         },
//         marginTop: px(4),
//         display: "flex",
//         justifyContent: "flex-start",
//         color: Color.GRAY_3,
//         fontSize: px(10),
//         lineHeight: px(12)
//       },
//       display: "flex",
//       flexDirection: "column"
//     },
//     "& .buttons": {
//       "& button": {
//         "&:nth-child(n+2)": {
//           marginLeft: px(10)
//         },
//         height: px(36)
//       },
//       display: "flex",
//       flexDirection: "row",
//       justifyContent: "space-between"
//     },
//     width: percent(100),
//     height: percent(100),
//     background: Color.PRIMARY_WHITE,
//     borderRadius: `0 0 6px 0`,
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: `0 ${px(30)}`
//   }
// });

// export interface IUploadFolderInfo {
//   folderFileId?: string;
//   folderName: string;
// }

// export interface IUploadFileInfo {
//   uploadId: string;
//   fileName: string;
//   checked: boolean;
//   src?: string;
//   file?: File;
//   uploaded: boolean;
//   uploading: boolean;
//   error: string;
//   width?: number;
//   height?: number;
//   size?: number;
//   progress?: number;
// }

// enum UPLOAD_MODE {
//   URL = "url",
//   PC = "pc"
// }

// enum UPLOAD_STATE {
//   READY = "ready",
//   UPLOADING = "uploading",
//   FINISHED = "finished"
// }

// export function UploadPopup(): JSX.Element {
//   const [data, setData] = useState<IUploadFileInfo[]>([]);
//   const [cachedData, setCachedData] = useState<IUploadFileInfo[]>([]);
//   const [mode, setMode] = useState<UPLOAD_MODE>(UPLOAD_MODE.URL);
//   const [uploadState, setUploadState] = useState<UPLOAD_STATE>(
//     UPLOAD_STATE.READY
//   );
//   const [disabledFolderNameInput, setDisabledFolderNameInput] = useState<
//   boolean
//   >(false);
//   const [creditConfirmVisible, setCreditConfirmVisible] = useState<boolean>(
//     false
//   );
//   const [
//     uploadUnCompleteConfirmVisible,
//     setUploadUnCompleteConfirmVisible
//   ] = useState<boolean>(false);
//   const [uploadFolderName, setUploadFolderName] = useState<string>(null);
//   const uploadFilesInfo = useSelector(uploadUploadFilesInfo);
//   const uploadFolderInfo = useSelector(uploadUploadFolderInfo);
//   const progress = useSelector(uploadProgress);
//   const deductionInfo = useSelector(deductionDeductionInfo);
//   const licenseInfos = useSelector(deductionLicenseInfos);

//   const [availableCredit, setAvailableCredit] = useState<number | string>(0);
//   const isUploading = useSelector(
//     (state: Pick<IStore, "upload">) => state.upload.uploading
//   );
//   const sortedFolderPath: IFolderPath[] = useSelector(
//     explorerCurrentFolderPath
//   );
//   const userId = useSelector(authenticationUserId);
//   const pageSize = useSelector(
//     (state: Pick<IStore, "explorer">) => state.explorer.pageSize
//   );
//   const lastPath = sortedFolderPath[sortedFolderPath.length - 1];

//   const prevState = useRef({ isUploading, data }).current;
//   const uploadCompleteCount = useMemo(() => {
//     return Array.from(data || []).filter(item => item.uploaded || !!item.error)
//       .length;
//   }, [data]);
//   const uploadFailedCount = useMemo(() => {
//     return Array.from(uploadFilesInfo || []).filter(
//       fileInfo => !!fileInfo.error
//     ).length;
//   }, [uploadFilesInfo]);
//   const selectedOnlyUploadFailedItem = useMemo(() => {
//     const selectedFiles = Array.from(data || []).filter(item => item.checked);
//     const selectedErrorFiles = Array.from(selectedFiles || []).filter(
//       item => !!item.error
//     );

//     return (
//       selectedErrorFiles.length > 0 &&
//       selectedFiles.length === selectedErrorFiles.length
//     );
//   }, [data]);
//   const selectedFilesCount = useMemo(
//     () => Array.from(data).filter(item => item.checked).length,
//     [data]
//   );
//   const totalUploadFilsCount = useMemo(() => uploadFilesInfo.length, [
//     uploadFilesInfo
//   ]);
//   const deductionCredit = useMemo(
//     () =>
//       Array.from(data || [])
//         .filter(item => !item.uploaded && item.checked)
//         .reduce((acc, cur) => (acc += Math.ceil(cur.height / 1200)), 0),
//     [data, isUploading]
//   );
//   const usedCredit = useMemo(() =>
//     Array.from(uploadFilesInfo || [])
//       .filter(fileInfo => !fileInfo.error)
//       .reduce((acc, cur) => (acc += Math.ceil(cur.height / 1200)), 0),
//   [uploadFilesInfo, isUploading]
//   );

//   const dispatch = useDispatch();

//   useEffect(() => {
//     const starterLicense = getStartLicenseInfo(licenseInfos);
//     const creditLicense = getCreditLicenseInfo(licenseInfos);
//     const timeLicense = getTimeLicenseInfo(licenseInfos);
//     const countsLicense = getCountLicenseInfo(licenseInfos);

//     if (timeLicense || starterLicense) {
//       setAvailableCredit("&&");
//     } else if (countsLicense) {
//       setAvailableCredit(
//         countsLicense.limitLicense.limit -
//           countsLicense.limitLicense.usage -
//           deductionInfo.ToBeDeduction
//       );
//     } else if (creditLicense) {
//       setAvailableCredit(
//         creditLicense.limitLicense.limit -
//           creditLicense.limitLicense.usage -
//           deductionInfo.ToBeDeduction
//       );
//     } else {
//       setAvailableCredit(0);
//     }
//   }, [deductionInfo, licenseInfos]);

//   useEffect(() => {
//     if (uploadState === UPLOAD_STATE.FINISHED && uploadFailedCount) {
//       // 무제한 요금제가 업로드 도중 만료되는 경우
//       // 업로드 실패 후, 실제 잔여 코인 조회
//       dispatch(getLicenseInfo.invoke(userId));
//     }
//   }, [uploadState, uploadFailedCount]);

//   useEffect(() => {
//     const folderFileId =
//       lastPath.file_id === MENU_KEY.HOME ? userId : lastPath.file_id;
//     const folderName =
//       lastPath.file_id === MENU_KEY.HOME ? "모든 파일" : lastPath.name;

//     dispatch(setUploadFolderInfo({ folderFileId, folderName }));
//     dispatch(getLicenseInfo.invoke(userId));

//     return () => {
//       Array.from(prevState.data).map(item => {
//         if (item.file && item.src) {
//           // PC Upload 시에 URL.createObjectURL를 해주고 있는데, 여기서 메모리 해제를 수행함
//           URL.revokeObjectURL(item.src);
//         }
//       });

//       setData([]);
//       dispatch(setUploadFilesInfo([]));
//       dispatch(setUploadFolderInfo({ folderName: "" }));
//       dispatch(
//         searchFiles.invoke({ fileId: folderFileId, pageToken: null, pageSize })
//       );
//     };
//   }, []);

//   useEffect(() => {
//     return () => {
//       prevState.data = data;
//     };
//   }, [data]);

//   useEffect(() => {
//     Array.from(uploadFilesInfo).map(fileInfo => {
//       const target = Array.from(data).find(
//         item => item.uploadId === fileInfo.uploadId
//       );

//       if (target) {
//         target.uploading = fileInfo.uploading;
//         target.uploaded = fileInfo.uploaded;
//         target.error = fileInfo.error;
//       }
//     });

//     setData([...data]);
//   }, [uploadFilesInfo, uploadState]);

//   /** Start UploadState 업데이트 */
//   useEffect(() => {
//     if (prevState.isUploading && !isUploading) {
//       // 업로드 완료
//       setUploadState(UPLOAD_STATE.FINISHED);

//       dispatch(addUsedCredit(usedCredit));
//     } else if (isUploading) {
//       // 업로드 중
//       setUploadState(UPLOAD_STATE.UPLOADING);
//     }

//     return () => {
//       prevState.isUploading = isUploading;
//     };
//   }, [isUploading, usedCredit]);

//   useEffect(() => {
//     if (uploadState === UPLOAD_STATE.FINISHED) {
//       const uploadFileItem = Array.from(uploadFilesInfo).find(
//         fileInfo => !!fileInfo.error
//       );

//       if (uploadFileItem) {
//         setUploadUnCompleteConfirmVisible(true);
//       }
//     }
//   }, [uploadState, uploadFilesInfo]);

//   /** End UploadState 업데이트 */

//   const onOKUploadUnCompleteConfirm = useCallback(() => {
//     setUploadUnCompleteConfirmVisible(false);
//   }, []);

//   const onClickModeButton = useCallback(
//     (e: React.MouseEvent<HTMLDivElement>) => {
//       const target = e.target;

//       if (
//         uploadState === UPLOAD_STATE.UPLOADING ||
//         (target as HTMLDivElement).id === mode
//       ) {
//         return;
//       }

//       if ((target as HTMLDivElement).id === UPLOAD_MODE.PC) {
//         setMode(UPLOAD_MODE.PC);
//       } else if ((target as HTMLDivElement).id === UPLOAD_MODE.URL) {
//         setMode(UPLOAD_MODE.URL);
//       }

//       setCachedData([...data]);
//       setData([...cachedData]);
//     },
//     [uploadState, cachedData, mode, data]
//   );

//   const onClickCloseButton = useCallback(
//     () => dispatch(setUploadPopupVisible(false)),
//     []
//   );

//   /** Start : 폴더 이름 변경 로직  */

//   const onChangeFolderNameInput = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       setUploadFolderName(e.target.value);
//     },
//     []
//   );

//   const onBlurFolderNameInput = useCallback(
//     (e: React.FocusEvent<HTMLInputElement>) => {
//       const folderFileId =
//         lastPath.file_id === MENU_KEY.HOME ? userId : lastPath.file_id;
//       const folderName =
//         lastPath.file_id === MENU_KEY.HOME ? "모든 파일" : lastPath.name;

//       if (e.target.value !== uploadFolderInfo.folderName) {
//         if (folderName === e.target.value) {
//           dispatch(setUploadFolderInfo({ folderFileId, folderName }));
//         } else {
//           dispatch(
//             setUploadFolderInfo({
//               folderName: e.target.value
//             })
//           );
//         }
//       }
//     },
//     [uploadFolderInfo]
//   );

//   useEffect(() => {
//     setUploadFolderName(uploadFolderInfo.folderName);
//   }, [uploadFolderInfo]);

//   /** End : 폴더 이름 변경 로직  */

//   const onSelectData = useCallback(
//     (_: IUploadFileInfo, items: IUploadFileInfo[]) => {
//       setData(items);

//       if (uploadState === UPLOAD_STATE.FINISHED) {
//         setUploadState(UPLOAD_STATE.READY);
//       }
//     },
//     [uploadState]
//   );

//   const onSelectAllData = useCallback(
//     (items: IUploadFileInfo[]) => {
//       setData(items);

//       if (uploadState === UPLOAD_STATE.FINISHED) {
//         setUploadState(UPLOAD_STATE.READY);
//       }
//     },
//     [uploadState]
//   );

//   const onDeleteData = useCallback(
//     (_: IUploadFileInfo[], items: IUploadFileInfo[]) => {
//       setData([...items]);
//     },
//     [data]
//   );

//   const onLoadData = useCallback(
//     (items: IUploadFileInfo[]) => {
//       // 로딩한 데이터 모두 체크 선택
//       if (mode === UPLOAD_MODE.PC) {
//         Array.from(items).map(item => (item.checked = true));
//       }

//       setData([...data, ...items]);
//     },
//     [data, mode]
//   );

//   const onLoadMetadataData = useCallback(
//     (file: IUploadFileInfo) => {
//       const target = Array.from(data).find(
//         item => item.uploadId === file.uploadId
//       );

//       target.width = file.width;
//       target.height = file.height;
//       target.size = file.size;

//       setData([...data]);
//     },
//     [data]
//   );

//   const onRetryData = useCallback(
//     (file: IUploadFileInfo) => {
//       dispatch(uploadFiles.invoke({ items: [file] }));
//     },
//     [data]
//   );

//   const onClickUpload = useCallback(() => {
//     const starterLicense = getStartLicenseInfo(licenseInfos);
//     const creditLicense = getCreditLicenseInfo(licenseInfos);
//     const timeLicense = getTimeLicenseInfo(licenseInfos);
//     const countsLicense = getCountLicenseInfo(licenseInfos);

//     if (creditLicense || countsLicense
//     ) {
//       if (availableCredit < deductionCredit) {
//         setCreditConfirmVisible(true);
//       } else {
//         const items = Array.from(data).filter(
//           item => !item.uploaded && item.checked
//         );
//         dispatch(uploadFiles.invoke({ items }));
//       }
//     } else if (starterLicense || timeLicense) {
//       const items = Array.from(data).filter(
//         item => !item.uploaded && item.checked
//       );
//       dispatch(uploadFiles.invoke({ items }));
//     } else {
//       // 요금제가 없는 경우
//       setCreditConfirmVisible(true);
//     }
//   }, [data, availableCredit, deductionCredit, licenseInfos]);

//   const onClickStop = useCallback(() => {
//     dispatch(uploadFiles.invoke({ items: [] }));
//   }, []);

//   const onOKCreditConfirm = useCallback(() => {
//     window.open("https://studio.ohoolabs.com/payments");
//   }, []);

//   const onCancelCreditConfirm = useCallback(() => {
//     setDisabledFolderNameInput(true);
//     setCreditConfirmVisible(false);
//   }, [data]);

//   return (
//     <div className={classNames.overlay}>
//       <div className={classes(classNames.upload_popup, mode)}>
//         <div className={classNames.upload_popup_header}>
//           <div className={"tabs"} onClick={onClickModeButton}>
//             <div
//               className={classes("tab", mode === UPLOAD_MODE.URL && "active")}
//               id={UPLOAD_MODE.URL}
//             >
//               URL 업로드
//             </div>
//             <div
//               className={classes("tab", mode === UPLOAD_MODE.PC && "active")}
//               id={UPLOAD_MODE.PC}
//             >
//               PC에서 업로드
//             </div>
//           </div>
//           <div className={"closebtn"}>
//             <button onClick={onClickCloseButton}>
//               <img src={closeImg} />
//             </button>
//           </div>
//         </div>
//         <div className={classNames.upload_popup_body}>
//           {mode === UPLOAD_MODE.PC ? (
//             <PCUploadPanel
//               disabled={isUploading}
//               items={data}
//               onLoad={onLoadData}
//               onSelect={onSelectData}
//               onSelectAll={onSelectAllData}
//               onDelete={onDeleteData}
//               onRetry={onRetryData}
//             />
//           ) : (
//             <UrlUploadPanel
//               disabled={isUploading}
//               items={data}
//               onLoad={onLoadData}
//               onSelect={onSelectData}
//               onSelectAll={onSelectAllData}
//               onLoadMetadata={onLoadMetadataData}
//               onDelete={onDeleteData}
//               onRetry={onRetryData}
//             />
//           )}
//         </div>
//         <div className={classNames.upload_popup_bottom}>
//           {uploadState !== UPLOAD_STATE.READY && (
//             <div className={classNames.upload_popup_progress}>
//               <div
//                 className={classes(
//                   classNames.upload_popup_progress_bar,
//                   uploadFailedCount > 0 && "error",
//                   uploadState === UPLOAD_STATE.FINISHED &&
//                     uploadFailedCount === 0 &&
//                     "complete"
//                 )}
//                 style={{ transform: `translate(-${100 - progress}%)` }}
//               />
//             </div>
//           )}
//           <div className={classNames.upload_popup_deduction}>
//             {uploadState === UPLOAD_STATE.READY && (
//               <React.Fragment>
//                 <div className={"up"}>
//                   <div className={"left"}>
//                     {`${availableCredit} 장 업로드 가능`}
//                     <br />
//                     {`${deductionCredit} 장 업로드 예정`}
//                   </div>
//                   <div className={"right"}>
//                     {`${selectedFilesCount} 개 선택됨`}
//                   </div>
//                 </div>
//               </React.Fragment>
//             )}
//             {uploadState === UPLOAD_STATE.UPLOADING && (
//               <React.Fragment>
//                 <div className={"up"}>
//                   <div className={"left"}>
//                     {`${uploadFolderName} 로`}
//                     <br />
//                     {"업로드 중"}
//                   </div>
//                   <div className={"right"}>
//                     {`${uploadCompleteCount} / ${totalUploadFilsCount} 개 완료`}
//                   </div>
//                 </div>
//               </React.Fragment>
//             )}
//             {uploadState === UPLOAD_STATE.FINISHED && (
//               <React.Fragment>
//                 <div className={"up"}>
//                   <div className={"left"}>{uploadFolderName}</div>
//                   <div className={"right"}>
//                     {`${uploadCompleteCount} / ${totalUploadFilsCount} 개 완료`}
//                   </div>
//                 </div>
//                 {uploadFailedCount > 0 && (
//                   <div className={"down"}>
//                     <div className={"failed-count"}>
//                       <div className={"icon"}>
//                         <img src={dangerImg} />
//                       </div>
//                       {`${uploadFailedCount}개 항목 업로드 실패`}
//                     </div>
//                   </div>
//                 )}
//               </React.Fragment>
//             )}
//           </div>
//           <div className={classNames.upload_popup_path}>
//             <div className={"path"}>
//               <div className={"guidance"}>항목을 업로드 할 경로 지정</div>
//               <div className={"folder"}>
//                 <div className={"icon"}>
//                   <img src={folderBtnImg} />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="+ 폴더 이름을 입력하세요"
//                   disabled={disabledFolderNameInput}
//                   value={uploadFolderName}
//                   onChange={onChangeFolderNameInput}
//                   onBlur={onBlurFolderNameInput}
//                 />
//               </div>
//             </div>
//             <div className={"buttons"}>
//               {uploadState !== UPLOAD_STATE.UPLOADING && (
//                 <button
//                   data-type={"solid"}
//                   style={{
//                     width: selectedOnlyUploadFailedItem ? px(100) : px(120)
//                   }}
//                   disabled={deductionCredit === 0 || !uploadFolderName}
//                   onClick={onClickUpload}
//                 >
//                   {selectedOnlyUploadFailedItem
//                     ? "업로드 재시도"
//                     : "업로드 하기"}
//                 </button>
//               )}
//               {uploadCompleteCount > 0 && (
//                 <button
//                   data-type={"default"}
//                   style={{ width: px(78) }}
//                   onClick={onClickCloseButton}
//                   disabled={uploadState === UPLOAD_STATE.UPLOADING}
//                 >
//                   완료
//                 </button>
//               )}
//               {uploadState === UPLOAD_STATE.UPLOADING && (
//                 <React.Fragment>
//                   <button
//                     data-type={"default"}
//                     style={{ width: px(78) }}
//                     onClick={onClickCloseButton}
//                   >
//                     숨기기
//                   </button>
//                   <button
//                     data-type={"danger"}
//                     style={{ width: px(62) }}
//                     onClick={onClickStop}
//                   >
//                     중단
//                   </button>
//                 </React.Fragment>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Confirm
//         type={CONFIRM_TYPE.WARNING}
//         visible={creditConfirmVisible}
//         okText="충전하고 계속하기"
//         cancelText="나중에 할게요"
//         okButtonType="primary"
//         cancelButtonType="default"
//         onOK={onOKCreditConfirm}
//         onCancel={onCancelCreditConfirm}
//       >
//         <p>이용 가능한 이미지 장수가 부족해요 😭</p>
//       </Confirm>
//       <Confirm
//         type={CONFIRM_TYPE.INFO}
//         visible={uploadUnCompleteConfirmVisible}
//         okText="확인 완료!"
//         okButtonType="default"
//         onOK={onOKUploadUnCompleteConfirm}
//       >
//         <p>업로드 실패 항목은</p>
//         <p>차감 되지 않으니 안심하세요 🤗</p>
//       </Confirm>
//     </div>
//   );
// }
