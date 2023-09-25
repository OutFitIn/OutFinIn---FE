import React, { useState } from "react";
import styled from "styled-components";
import GetStyleBox from "../../components/Join/GetStyleBox";
import XButton from "../../assets/img/X_button.svg";
import axios from 'axios';

const StyledModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 390px;
  height: calc(100vh - 15.04vh);
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.5;
  z-index: 1;
`;

const StyledBottomSheet = styled.div`
  z-index: 2;
  position: fixed;
  width: 390px;
  left: 50%;
  transform: translateX(-50%);
  height: 59.24vh;
  white-space: wrap;
  bottom: 15.04vh;
  border-radius: 20px 20px 0px 0px;
  background: #fff;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BottomSheetContent = styled.div`
  margin: 28px 21px 0px 21px;
`;
const ModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Category = styled.div`
  margin-top: 2.96vh;
`;

const Hr = styled.div`
  height: 1px;
  background: #e5e1e6;
  margin: 3.55vh 0px;
`;

const FooterBottomSheet = styled.div`
  padding: 1.6vh 21px 2.72vh 21px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom:0;
  height: 15.04vh;
  width: 390px;
`;

const Clear = styled.div`
  color: #ADAAAF;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.175px;
  cursor: pointer;
  margin-right: 30px;
`

const ApplyCodi = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  width: 253px;
  height: 6.73vh;
  background: #100069;
  color: #FFF;
  font-size: 14px;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.175px;
`;

function BottomSheet(props) {
    const [selectedStyles, setSelectedStyles] = useState([]);
    const [isClose, setIsClose] = useState(false)

    const handleStyleClick = (style, type) => {
        // 이미 선택된 스타일이면 제거, 아니면 추가
        if (selectedStyles.includes(style)) {
          setSelectedStyles(selectedStyles.filter((selectedStyle) => selectedStyle !== style));
          if(type === 'style'){
            props.setSelectedStyles(
              props.selectedStyles.filter((selected) => selected !== style));
          }

          else if(type === 'situation') {
            props.setSelectedSituation(
              props.selectedSituation.filter((selected) => selected !== style));
          }

          else if(type === 'weather') {
            props.setSelectedStyles(
              props.selectedStyles.filter((selected) => selected !== style));
          }
        } else {
          setSelectedStyles([...selectedStyles, style]);

          if(type === 'style'){
            props.setSelectedStyles([...props.selectedStyles, style]);
          }

          else if(type === 'situation') {
            props.setSelectedSituation([...props.selectedSituation, style]);
          }

          else if(type === 'weather') {
            props.setSelectedSituation([...props.selectedWeather, style]);
          }
        }
    }   

    const styleCategoryBoxes = props.styleCategories.map((category, index) => (
        <GetStyleBox
        key={index}
        content={category}
        isSelected={selectedStyles.includes(category)} onClick={() => handleStyleClick(category, 'style')}
        />
    ));

    const situationCategoryBoxes = props.situationCategories.map((category) => (
      <GetStyleBox
        content={category}
        isSelected={selectedStyles.includes(category)} onClick={() => handleStyleClick(category, 'situation')}
      />
    ))

    // 선택해제
    const resetCategories = () => {
      setSelectedStyles([])
    }

    return (
    <>
    <StyledModalBackground />
    <StyledBottomSheet>
        <BottomSheetContent>
            <ModalTitle>
                추가하실 스타일<br/>태그를 골라주세요
                <img src={XButton} onClick={props.openState} />  
            </ModalTitle>
            <Category>{styleCategoryBoxes}</Category>
            <Hr/>
            {props.weatherCategories.map((categoryRow, rowIndex) => (
                <div key={rowIndex}>
                {categoryRow.map((category, index) => (
                    <GetStyleBox
                    key={index}
                    content={category}
                    isSelected={selectedStyles.includes(category)} onClick={() => handleStyleClick(category)}
                    />
                ))}
                </div>
            ))}
            <Hr/>
            {situationCategoryBoxes}
        </BottomSheetContent>
    </StyledBottomSheet>
    <FooterBottomSheet>
      <Clear onClick={resetCategories}>선택 해제</Clear>
      <ApplyCodi onClick={props.sendData}>코디 확인하기</ApplyCodi>
    </FooterBottomSheet>
    </>
  );
}

export default BottomSheet;
