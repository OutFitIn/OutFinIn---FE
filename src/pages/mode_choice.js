import React, {useState} from 'react';
import * as frame from '../components/CSS/CommonStyle';
import Button_bottom from '../components/Button_bottom';
import Button_numbers from '../components/join/Button_numbers';
import Question_mode from '../components/join/Question_mode';
import BoxMode from '../components/join/Box_mode';

const Modechoice = () =>{
    const [coordinate, setCoordinate] = useState(false);
    const [user, setUser] = useState(false);

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
            <frame.totalframe>
                <frame.screen_component>
                    <frame.screen_join>
                        <Button_numbers content={1} />
                        <Button_numbers content={2} />
                        <Button_numbers content={3} />
                        <Button_numbers content={4} />
                        <Button_numbers content={5} />
                        <Question_mode content={'어떤 모드로 시작할까요?'} />
                        <Button_bottom content={'다음'} />
                    </frame.screen_join>
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
                </frame.screen_component>
            </frame.totalframe>
        </div>
    )
}

export default Modechoice;