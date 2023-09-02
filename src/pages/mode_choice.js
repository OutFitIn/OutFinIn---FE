import React from 'react';
import * as frame from '../components/CSS/CommonStyle';
import Button from '../components/Button';

const Modechoice = () =>{
    return(
        <div>
            <frame.totalframe>
                <frame.screen_component>
                    <Button content={'다음'} />
                </frame.screen_component>
            </frame.totalframe>
        </div>
    )
}

export default Modechoice;