import React from 'react';
import * as frame from '../components/CSS/CommonStyle';
import Button_bottom from '../components/Button_bottom';
import Button_numbers from '../components/join/Button_numbers';
import Question_mode from '../components/join/Question_mode';

const Modechoice = () =>{
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
                </frame.screen_component>
            </frame.totalframe>
        </div>
    )
}

export default Modechoice;