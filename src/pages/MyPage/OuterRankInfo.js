import React from "react";
import styled from "styled-components";
import * as f from '../../components/Common/CommonStyle';
import GobackContainer from "../../components/Common/GobackContainer";
import Navigation from "../../components/Navigation/Navigation";
import rank1 from "../../assets/img/Rank/rank1.svg";
import rank2 from "../../assets/img/Rank/rank2.svg";
import rank3 from "../../assets/img/Rank/rank3.svg";
import rank4 from "../../assets/img/Rank/rank4.svg";
import rank5 from "../../assets/img/Rank/rank5.svg";

const RankName = styled.div`
    margin-top: 16px;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.064px;
`;

const RankDescribe = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.056px;
    margin-top: 5.68vh;
`;

const RankSubDescribe = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ADAAAF;
    margin-top:2.25vh;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.056px;
`;

const TotalRanks = styled.div`
  margin-top: 4.14vh;
`;

const Ranks = styled.div`
  width: 100%;
  display: flex;
  margin-top: 2.19vh;
`;

const RankImg = styled.img`
  margin-left: 31px;
`;
const RankExplain = styled.div`
  margin-left: 17px;
  margin-right: 50px;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.048px;
  width: 176px;
`;

const Price = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.056px;
`

const OuterRankInfo = () => {
  const RankExplains = [
    '코디 0-50회 진행한 아우터에요',
    '코디 51-100회 진행한 아우터에요',
    '코디 101-200회 진행한 아우터에요',
    '코디 201-300회 진행한 아우터에요',
    '코디 301회 이상 진행한 아우터에요'
  ]
  const RankImgs = [
    rank1 , rank2 , rank3 , rank4, rank5
  ]
  return (
    <f.Totalframe>
      <f.SubScreen>
        <f.ScreenComponent>
          <GobackContainer/>
          <RankName>아우터 랭킹별 정찰제</RankName>
          <RankDescribe>원활한 결제와 더 나은 서비스 제공을 위해 OFI의<br/>코디의 가격은 아우터의 랭킹에 따라 결정 됩니다.<br/>아우터의 코디 횟수에 따라 5단계로 나누어 집니다.</RankDescribe>
          <RankSubDescribe>아우터의 랭킹 확인은 프로필 사진 옆을 봐주세요!</RankSubDescribe>
          <TotalRanks>
            {RankExplains.map((rank,index) => (
              <Ranks>
                  <RankImg src={RankImgs[index]}/>
                  <RankExplain>{rank}</RankExplain>
                <Price>{index+1}만원</Price>
              </Ranks>
            ))}
            </TotalRanks>
        </f.ScreenComponent>
      </f.SubScreen>
      <Navigation type={'mypage'}/>
    </f.Totalframe>
  );
};
export default OuterRankInfo;
