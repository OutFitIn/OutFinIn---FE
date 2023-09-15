import React, { useState } from "react";
import styled from "styled-components";
import GetStyleBox from "../../components/Join/GetStyleBox";
import XButton from "../../assets/img/X_button.svg";

const StyledModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
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

function BottomSheet(props) {
    const [selectedStyles, setSelectedStyles] = useState([]);
    const [isClose, setIsClose] = useState(false)
    const handleStyleClick = (style) => {
        // 이미 선택된 스타일이면 제거, 아니면 추가
        if (selectedStyles.includes(style)) {
          setSelectedStyles(selectedStyles.filter((selectedStyle) => selectedStyle !== style));
        } else {
          setSelectedStyles([...selectedStyles, style]);
        }
      }
    
    const styleCategories = [
        "미니멀",
        "이지캐주얼",
        "비즈니스캐주얼",
        "아메카지",
        "스트릿",
        "시티보이",
        "원마일웨어",
        "스포티",
        "유니크",
        "레트로",
        "올드머니룩",
        "하객룩",
        "바캉스룩",
        "힙합",
    ];

    const weatherCategories = [
        ["봄 코디", "여름 코디"],
        ["가을 코디", "겨울 코디"],
    ];

    const situationCategories = ["면접","여행","캠퍼스","데이트","출근","결혼식"]

    const styleCategoryBoxes = styleCategories.map((category, index) => (
        <GetStyleBox
        key={index}
        content={category}
        isSelected={selectedStyles.includes(category)} onClick={() => handleStyleClick(category)}
        />
    ));

    const situationCategoryBoxes = situationCategories.map((category) => (
      <GetStyleBox
        content={category}
        isSelected={selectedStyles.includes(category)} onClick={() => handleStyleClick(category)}
      />
    ))

    const isopenChange = () => {
      props.openState(!props.isOpen)
    }

    return (
    <>
    <StyledModalBackground />
    <StyledBottomSheet>
        <BottomSheetContent>
            <ModalTitle>
                추가하실 스타일<br/>태그를 골라주세요
                <img src={XButton} onClick={isopenChange} />
                {/* <BottomSheet openState={setIsOpen} isOpen={isOpen}/> */}
            </ModalTitle>
            <Category>{styleCategoryBoxes}</Category>
            <Hr/>
            {weatherCategories.map((categoryRow, rowIndex) => (
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
    </>
  );
}

export default BottomSheet;
