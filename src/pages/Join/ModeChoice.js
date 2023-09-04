import React, {useState} from 'react';
import * as f from '../../components/Common/CommonStyle';
import ButtonBottom from '../../components/Common/ButtonBottom';
import ButtonNumbers from '../../components/Join/NumbersButton';
import QuestionMode from '../../components/Join/QuestionModeBox';
import BoxMode from '../../components/Join/BoxMode';

const ModeChoice = () =>{
    const [number, setNumber] = useState('1');
    const [coordinate, setCoordinate] = useState(false);
    const [user, setUser] = useState(false);

    const changeNumber = (num)=>{
        setNumber(num.toString());
    }

    const choose = (x) => {
        if(x === 1){
            setUser(false);
            setCoordinate(true);
        }else{
            setUser(true);
            setCoordinate(false);
        }
    }

    return(
        <div>
            <f.Totalframe>
                <f.ScreenComponent>
                    <f.ScreenJoin>
                        <ButtonNumbers content={1} isSelected={number === '1'} onClick={() => changeNumber('1')} />
                        <ButtonNumbers content={2} isSelected={number === '2'} onClick={() => changeNumber('2')} />
                        <ButtonNumbers content={3} isSelected={number === '3'} onClick={() => changeNumber('3')} />
                        <ButtonNumbers content={4} isSelected={number === '4'} onClick={() => changeNumber('4')} />
                        <ButtonNumbers content={5} isSelected={number === '5'} onClick={() => changeNumber('5')} />
                        <QuestionMode content={'어떤 모드로 시작할까요?'} />
                        <ButtonBottom content={'다음'} />
                    </f.ScreenJoin>
                    <BoxMode
                        mode={'코디네이터 모드'} 
                        choose={choose}
                        selected={coordinate}
                        describe={'나만의 코디를 업로드 하고 다른 사용자의 코디도 진행해보세요'}/>
                    <BoxMode
                        mode={'사용자 모드'} 
                        choose={choose}
                        selected={user}
                        describe={'옷 고르기 힘들때 코디네이터에게 도움을 요청해보세요'}/>
                </f.ScreenComponent>
            </f.Totalframe>
        </div>
    )
}

export default ModeChoice;