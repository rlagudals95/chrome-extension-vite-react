/* eslint-disable @typescript-eslint/tslint/config */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from "react";
import styled from "styled-components";
import { COLOR_V2 } from "../constants/ColorV2";
import Arrow from "../images/popup_arrow.png";

interface StyleCustom {
  border?: string;
  backgroud?: string;
  hoverColor?: string;
  color?: string;
  requiredColor?: string;
  infoColor?: string;
  fontWeight?: string;
}

interface IProps {
  children?: string;
  title: string;
  checked: boolean;
  onClick?: React.Dispatch<React.SetStateAction<any>>;
  onMouseUp?: (e: React.MouseEvent) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  isPopup?: boolean;
  isRequired?: boolean;
  styleCustom?: StyleCustom;
  isTerms?: boolean;
  isBorder?: boolean;
  viewModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckBoxV2 = (props: IProps) => {
  const {
    title,
    checked,
    onClick,
    onMouseUp,
    onMouseDown,
    isPopup,
    isRequired,
    styleCustom,
    isTerms,
    isBorder, // border가 적용된 CheckBox 스타일
    viewModal,
  }: IProps = props;

  return (
    <>
      {isBorder ? (
        <BorderCheckBoxContainer styleCustom={styleCustom}>
          <CheckBoxLeft
            onClick={onClick}
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}
          >
            <CheckBoxWrapper>
              <HiddenCheckBox type="checkbox" {...props} />
              <StyledBorderNoneCheckBox
                hoverColor={COLOR_V2.PRIMARY1}
                backgroudColor={COLOR_V2.PRIMARY3}
                color={COLOR_V2.GRAY2}
                checked={checked}
              >
                <Icon viewBox="0 0 24 24">
                  <polyline points="19 7 10 17 5 12" />
                </Icon>
              </StyledBorderNoneCheckBox>
            </CheckBoxWrapper>
            <CheckTitle styleCustom={styleCustom} color={COLOR_V2.GRAY3}>
              <CheckInfo>{title}</CheckInfo>
              {isTerms && (
                <PopupButton>
                  <RequiredInfo
                    RequiredColor={COLOR_V2.PRIMARY3}
                    defaultColor={COLOR_V2.GRAY2}
                    isRequired={isRequired}
                  >
                    &nbsp;
                    {isRequired ? "(필수)" : "(선택)"}
                  </RequiredInfo>
                </PopupButton>
              )}
            </CheckTitle>
          </CheckBoxLeft>
          {isPopup && (
            <CheckBoxRight onClick={viewModal} color={COLOR_V2.PRIMARY3}>
              약관보기 <img src={Arrow} />
            </CheckBoxRight>
          )}
        </BorderCheckBoxContainer>
      ) : (
        <CheckBoxContainer>
          <CheckBoxLeft
            onClick={onClick}
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}
          >
            <CheckBoxWrapper>
              <HiddenCheckBox type="checkbox" {...props} />
              <StyledCheckBox
                hoverColor={COLOR_V2.PRIMARY1}
                backgroudColor={COLOR_V2.PRIMARY3}
                color={COLOR_V2.GRAY2}
                checked={checked}
              >
                <Icon viewBox="0 0 24 24">
                  <polyline points="19 7 10 17 5 12" />
                </Icon>
              </StyledCheckBox>
            </CheckBoxWrapper>
            <CheckTitle styleCustom={styleCustom} color={COLOR_V2.GRAY3}>
              <CheckInfo>{title}</CheckInfo>
              {isTerms && (
                <PopupButton>
                  <RequiredInfo
                    RequiredColor={COLOR_V2.PRIMARY3}
                    defaultColor={COLOR_V2.GRAY2}
                    isRequired={isRequired}
                  >
                    &nbsp;
                    {isRequired ? "(필수)" : "(선택)"}
                  </RequiredInfo>
                </PopupButton>
              )}
            </CheckTitle>
          </CheckBoxLeft>
          {isPopup && (
            <CheckBoxRight onClick={viewModal} color={COLOR_V2.PRIMARY3}>
              약관보기 <img src={Arrow} />
            </CheckBoxRight>
          )}
        </CheckBoxContainer>
      )}
    </>
  );
};

const CheckBoxContainer = styled.div`
  margin: 0px;
  display: flex;
  align-items: center;
  margin-top: 12px;
  justify-content: space-between;
`;

const BorderCheckBoxContainer = styled.div`
  margin: 0px;
  display: flex;
  align-items: center;
  margin-top: 12px;
  justify-content: space-between;
  border-radius: 8px;
  padding: 10px 16px;
  border: ${(props) => props.styleCustom?.border ?? ""};
`;

const CheckBoxLeft = styled.div`
  margin: 0px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CheckBoxRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.color ?? ""};
  cursor: pointer;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: -0.02em;

  @media screen and (max-width: 728px) {
    font-size: 13px;
  }
`;

const CheckBoxWrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
  align-items: center;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const StyledCheckBox = styled.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  background: ${(props) => (props.checked ? props.backgroudColor : "")};
  vertical-align: middle;
  transition: all 150ms;
  border: ${(props) => (props.checked ? "none" : `1px solid ${props.color}`)};
  box-sizing: border-box;
  border-radius: 4px;
  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
    border: none;
    outline: none;
  }

  &:hover {
    border: 1px solid ${(props) => props.backgroudColor ?? ""};
    background: ${(props) =>
      props.checked ? props.backgroudColor : props.hoverColor};
  }
`;

const StyledBorderNoneCheckBox = styled.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  background: ${(props) => (props.checked ? props.backgroudColor : "")};
  vertical-align: middle;
  transition: all 150ms;
  border: ${(props) => (props.checked ? "none" : `1px solid ${props.color}`)};
  box-sizing: border-box;
  border-radius: 4px;
  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
    border: none;
    outline: none;
  }

  &:hover {
    border: 1px solid ${(props) => props.backgroudColor ?? ""};
    background: ${(props) =>
      props.checked ? props.backgroudColor : props.hoverColor};
  }
`;

const CheckTitle = styled.div`
  padding-top: 2px;
  font-weight: ${(props) => props.styleCustom?.fontWeight ?? "400"};
  font-size: 14px;
  line-height: 130%;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${(props) => props.color ?? ""};
  order: 1;
  flex-grow: 0;
  margin: 0px 8px;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const HiddenCheckBox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const PopupButton = styled.div``;

const CheckInfo = styled.p``;

const RequiredInfo = styled.p`
  //color: ${(props) =>
    props.isRequired ? props.RequiredColor : props.defaultColor};
  color: ${(props) =>
    props.isRequired ? props.defaultColor : props.defaultColor};
`;

export default CheckBoxV2;
