import { StatusCodes } from "http-status-codes";
import AxiosInstance from "./AxiosInstance";

export enum TAX_TYPE {
  SURTAX_PERCENT = "SURTAX_PERCENT" // 부가세
}

export enum PROMOTION_TYPE {
  BONUS_AMOUNT = "BONUS_AMOUNT", // 정량 보너스
  BONUS_PERCENT = "BONUS_PERCENT", // 퍼센트 보너스
  BONUS_FEATURE = "BONUS_FEATURE", // 기능 보너스
  DISCOUNT_AMOUNT = "DISCOUNT_AMOUNT", // 정량 할인
  DISCOUNT_PERCENT = "DISCOUNT_PERCENT" // 퍼센트 할인
}

export enum PROMOTION_CONDITION_TYPE {
  BILLING_CYCLE = "BILLING_CYCLE", // 결제 주기
  LICENSE_PERIOD = "LICENSE_PERIOD" // 라이센스 유효기간
}

export enum LICENSE_FEATURE {
  EDITOR = "EDITOR",
  API = "API",
  HOSTING = "HOSTING"
}

export enum LICENSE_LIMIT_TYPE {
  TIME = "TIME",
  CREDIT = "CREDIT",
  COUNTS = "COUNT",
  MEGABYTES = "MEGABYTES"
}

export enum PLAN_OBJECTIVE {
  STARTER = "STARTER",
  PURCHASE = "PURCHASE",
  COMPENSATION = "COMPENSATION"
}

export enum PLAN_SCOPE {
  STUDIO = "STUDIO"
}

export interface ILicenseLimit {
  type: LICENSE_LIMIT_TYPE;
  force: boolean;
  period: number;
  value: number;
}

export interface ILicense {
  // 라이센스
  features: LICENSE_FEATURE[];
  period: number;
  exceedCharge: number;
  limits: ILicenseLimit[];
}

export interface IPromotion {
  // 할인
  type: PROMOTION_TYPE;
  value: number;
  condition: {
    type: PROMOTION_CONDITION_TYPE;
    value: number;
  }[];
}

export interface ITax {
  // 세금
  type: TAX_TYPE;
  value: number;
}

export interface ISubscription {
  period: number;
  cycles: number[];
}

export interface ICompensation {
  activationTime: number;
  type: LICENSE_LIMIT_TYPE;
  value: number;
}

export interface IPlan {
  id: string; // 요금제 ID
  title: string; // 요금제 이름
  descriptions: string[]; // 요금제 설명
  amount: number; // 요금제 단가 (부가세 제외)
  period: number; // 요금제 기본 갱신 기간
  countryCode: string; // 요금제 적용 지역 (국가코드 ISO 3166-1 2자리)
  currencyCode: string; // 통화 코드 (국가별 통화 기호 ISO-4217 3자리)
  objective: PLAN_OBJECTIVE; // 요금제 목표
  scopes: PLAN_SCOPE[]; // 요금제 공개 범위
  taxes: ITax[]; // 세금
  licenses: ILicense[]; // 라이센스
  promotions: IPromotion[]; // 할인
  subscriptions: ISubscription[]; // 구독
  activationTime: number; // 요금제 활성화 시각
  expirationTime: number; // 요금제 만료 시각
}

export interface IActivePlan {
  id: string; // 활성화 요금제 ID
  licenses: ILicense[]; // 라이센스
  subscriptions: ISubscription[]; // 구독 정보
  compensations: ICompensation[]; // 일시 보상 내용
  activationTime: number; // 요금제 활성화 시각
  expirationTime: number; // 요금제 만료 시각
}

export interface ILimitLicense {
  id: string; // 라이센스 제한 ID
  feature: LICENSE_FEATURE; // 기능
  type: LICENSE_LIMIT_TYPE; // 제한 유형
  limit: number; // 한도값
  usage: number; // 사용값
  activationTime: number;
  expirationTime: number;
}

export interface ILicenseInfo {
  plan: IPlan;
  activePlan: IActivePlan;
  limitLicense: ILimitLicense;
}

export interface IDeductionInfo {
  ToBeDeduction: number;
}
export interface ILicenseInfoResponse {
  licenses: ILicenseInfo[];
  deduction: IDeductionInfo;
}

export interface IError {
  code: string;
  message: string;
}

class DeductionApi {
  public async getLicenseInfo(
    userId: string
  ): Promise<ILicenseInfoResponse | IError> {
    try {
      const url = `/deductions/license/${userId}`;
      const result = await AxiosInstance.get(url);

      if (result.status !== StatusCodes.OK) {
        console.error(`Axios error status: ${result.status}`);
      }
      return result.data as ILicenseInfoResponse;
    } catch (error) {
      throw error;
    }
  }
}

export default new DeductionApi();
