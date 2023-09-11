import { useState} from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import axios from "axios";
import * as f from '../../components/Common/CommonStyle';
import * as c from '../../components/Join/CoInfoStyle';
import ButtonBottom from '../../components/Common/ButtonBottom';
import ButtonNumbers from '../../components/Join/NumbersButton';
import QuestionMode from '../../components/Join/QuestionModeBox';
import GetInfo from "../../components/Join/GetInfo";
import profileCircle from '../../assets/img/profileCircle.svg';
import camera from '../../assets/img/camera.svg';

const Male = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 85px;
    height: 38px;
    background-color: ${(props) => (props.selected ? '#100069' : '#fff')};
    border: 1px solid #C8C5D0;
    border-right: 0px solid #fff;
    border-radius: 10px 0px 0px 11px;
    color: #E4E1EC;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.175px;
`

const Female = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 85px;
    height: 38px;
    background-color: ${(props) => (props.selected ? '#100069' : '#fff')};
    border: 1px solid #C8C5D0;
    border-left: 0px solid #fff;
    border-radius: 0px 10px 11px 0px;
    color: #E4E1EC;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.175px;
`

const CoInfo = () => {
    const [male, setMale] = useState(false);
    const [female, setFemale] = useState(false);
    const [inputCount, setInputCount] = useState(0);
    const maxInputLength =20;
    const [image, setImage] = useState({
        image_file: null,
        preview_URL: null,
    });
    
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
    
        if (selectedFile) {
            const reader = new FileReader();
    
            reader.onload = (e) => {
                setImage({
                    image_file: selectedFile,
                    preview_URL: e.target.result,
                });
            };
    
            reader.readAsDataURL(selectedFile);
        }
    };
    
    // const handleImageUpload = async () => {
    //     if (image.image_file) {
    //         const formData = new FormData();
    //         formData.append('image', image.image_file);

    //         try {
    //             await axios.post('/api/upload', formData, {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                 },
    //             });
    //             alert("서버에 이미지 업로드가 완료되었습니다!");
    //         } catch (error) {
    //             alert("이미지 업로드 중 오류가 발생했습니다.");
    //         }
    //     } else {
    //         alert("사진을 등록하세요!");
    //     }
    // };

    const changeGender = (g) => {
        if (g === 1) {
            setMale(true);
            setFemale(false);
        } else if (g === 2) {
            setMale(false);
            setFemale(true);
        }
    }

    const onInputHandler = (e) => {
        const content = e.target.value;
        setInputCount(content.length);

        if (content.length > maxInputLength) {
            alert("최대 20자까지 입력 가능합니다.");
            e.target.value = content.substring(0, maxInputLength);
            setInputCount(maxInputLength);
        }
    };

    return(
        <f.Totalframe>
            <f.ScreenComponent>
                <f.ScreenJoin>
                    <f.Flex>
                        <ButtonNumbers content={1}/>
                        <ButtonNumbers content={2} isSelected={true}/>
                        <ButtonNumbers content={3}/>
                        <ButtonNumbers content={4}/>
                    </f.Flex>
                    <QuestionMode content={'코디네이터 님의\n 프로필을 작성해주세요'} marginBottom={'25px'}/>
                    {/*사진 입력받기*/}
                    <input
                        type="file"
                        id="profileImageInput"
                        accept="image/*" 
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
                    <c.Label htmlFor="profileImageInput">
                        <c.GetPhotoContainer>
                            <c.Profile
                                src={image.preview_URL || profileCircle}
                            />
                            <c.Camera src={camera} />
                        </c.GetPhotoContainer>
                    </c.Label>
                    {/*정보 입력받기*/}
                    <f.Flex>    
                        <GetInfo infoName={'닉네임'}/>
                        <Male 
                            onClick={() => changeGender(1)}
                            selected={male}>남</Male>
                        <Female 
                            onClick={() => changeGender(2)}
                            selected={female}>여</Female>
                    </f.Flex>
                    <f.Flex>
                        <GetInfo infoName={'키'}/>
                        <GetInfo infoName={'체중'}/>
                    </f.Flex>
                    <f.Flex>
                        <GetInfo infoName={'SNS 링크'}/>
                    </f.Flex>
                    {/*프로필 내용 입력받기 (1/20)-20글자 이내*/}
                    <c.TextContainer>
                        <c.TextArea onChange={onInputHandler} maxLength={maxInputLength} placeholder="프로필을 간단하게 적어주세요!"/>
                        <c.TextCount><span>{inputCount}</span><span>/20 자</span></c.TextCount>
                    </c.TextContainer>
                    <Link to="/getstyle">
                        <ButtonBottom content={'다음'} />
                        {/* onClick={handleImageUpload} */}
                    </Link>
                </f.ScreenJoin>
            </f.ScreenComponent>
        </f.Totalframe>
    )
}
export default CoInfo;