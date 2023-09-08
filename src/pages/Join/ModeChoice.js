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
                        <f.Flex>
                            <ButtonNumbers content={1} isSelected={number === '1'} onClick={() => changeNumber('1')} />
                            <ButtonNumbers content={2} isSelected={number === '2'} onClick={() => changeNumber('2')} />
                            <ButtonNumbers content={3} isSelected={number === '3'} onClick={() => changeNumber('3')} />
                            <ButtonNumbers content={4} isSelected={number === '4'} onClick={() => changeNumber('4')} />
                        </f.Flex>
                        <QuestionMode content={'어떤 모드로 시작할까요?'} marginBottom={'2.84vh'}/>
                        <BoxMode
                            mode={'아우터 모드'} 
                            choose={choose}
                            selected={coordinate}
                            describe={'나만의 코디를 업로드 하고 다른\n피터의 코디도 진행해보세요'}/>
                        <BoxMode
                            mode={'피터 모드'} 
                            choose={choose}
                            selected={user}
                            describe={'옷 고르기 힘들때 아우터에게\n도움을 요청해 보세요'}/>
                    </f.ScreenJoin>
                </f.ScreenComponent> 
            </f.Totalframe>
        </div>
    )
}

export default ModeChoice;