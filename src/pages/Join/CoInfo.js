import { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import AWS from 'aws-sdk'
import axios from "axios";
import Session from 'react-session-api';
import * as f from '../../components/Common/CommonStyle';
import * as c from '../../components/Join/CoInfoStyle';
import ButtonBottom from '../../components/Common/ButtonBottom';
import ButtonNumbers from '../../components/Join/NumbersButton';
import QuestionMode from '../../components/Join/QuestionModeBox';
import GetInfo from "../../components/Join/GetInfo";
import profileCircle from '../../assets/img/profileCircle.svg';
import {AiOutlineCheckCircle} from 'react-icons/ai';
import camera from '../../assets/img/camera.svg';

const Male = styled.div`
    margin-left: 7px;
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
    cursor: pointer
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
    cursor: pointer
`


const NickName=styled.div`
    display: flex;
`

const InputContaier=styled.div`
    display: flex;
    align-items: center;
`

const CoInfo = () => {
    AWS.config.update({
        region: "ap-northeast-2",
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    });
    const [isClicked, setIsClicked]=useState('');
    const [male, setMale] = useState(false);
    const [female, setFemale] = useState(false);
    const [inputCount, setInputCount] = useState(0);
    const maxInputLength = 20;
    const [nickname, setNickname] = useState("");
    const [sns_url, setSns_url] = useState("");
    const [image_url, setImage_url] = useState("");
    const [content, setContent] = useState("");
    const [gender, setGender] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pass, setPass] = useState(false);

    const [checkNickname, setCheckNickname] = useState("");
    const nicknameRef = useRef(null);
    const navigate = useNavigate();
    // 사진 네이밍을 위한 포매팅
    const today = new Date();
    const year = today.getFullYear(); // 연도
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 1을 더하고 두 자리로 포맷팅)
    const day = String(today.getDate()).padStart(2, '0'); // 일 (두 자리로 포맷팅)
    const hours = String(today.getHours()).padStart(2, '0'); // 시간 (두 자리로 포맷팅)
    const minutes = String(today.getMinutes()).padStart(2, '0'); // 분 (두 자리로 포맷팅)
    const seconds = String(today.getSeconds()).padStart(2, '0'); // 초 (두 자리로 포맷팅)
    const formattedDate = `${year}${month}${day}${hours}${minutes}${seconds}`;
    const [photoName,setPhotoName] = useState('');

    const handleClickOutside = async ({ target }) => {
        console.log("handleClickOutside 실행");
        console.log(nickname);

        if (nicknameRef.current && !nicknameRef.current.contains(target) && checkNickname !== nickname) {
            // axios 코드 작성 하면 됨
            async function fetchNickname(){
                try {
                    axios.defaults.withCredentials=true;
                    const res = await axios.get("https://ofi-d5e2473eb437.herokuapp.com/check/nickname?nickname="+ nickname);
    
                    if(res.data === 'available') {
                        setPass(true);
                        setCheckNickname(nickname); // 검사를 완료한 닉네임
                        setPhotoName(nickname+formattedDate+'.jpg');
                    } else {
                        setPass(false);
                        setCheckNickname('');
                    }
                  } catch (error) {
                    console.error(error);
                  }
            }
    
            fetchNickname();
        }
    };
    

    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [nickname]);

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

    // 사진 s3에 업로드 후 링크받아와서, 백엔드에 코디네이터 정보들 넘겨주기
    const handleImageUpload = () => {
        AWS.config.update({
            region: "ap-northeast-2",
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        });

        try {
            const file = image.image_file;
            const upload = new AWS.S3.ManagedUpload({
                params: {
                    Bucket: "seumu-s3-bucket", // 버킷 이름
                    Key:  photoName, // 파일 이름 (버킷 안에서 저장될 파일 이름)
                    Body: file, // 파일 객체
                },
            });

            const promise = upload.promise();   // 반환값을 받음

            // 코디네이터 중간 정보
            promise.then((data) => {
                async function fetchData() {
                    try {
                        axios.defaults.withCredentials=true;
                        const res = await axios.post('https://ofi-d5e2473eb437.herokuapp.com/coordinator/profile',
                            {
                                email: email,
                                password: password,
                                nickname: nickname,
                                sns_url: sns_url,
                                image_url: photoName,
                                content: content,
                                gender: male === true ? 'MALE' : 'FEMALE',
                                height: height,
                                weight: weight,
                                total_like: 0,
                                request_count: 0,
                                styles: []
                            }
                        );
                        if (res.data === 'success') {
                            navigate('/getstyle');
                        }
                        // 다음으로 넘어가게
                        console.log(res);
                    } catch (error) {
                        console.error(error);
                    }
                }

                fetchData();
            });
        } catch (e) {
            console.log(e);
        }
    };

    const changeGender = (g) => {
        setIsClicked('성별');
        if (g === 1) {
            setMale(true);
            setFemale(false);
        } else if (g === 2) {
            setMale(false);
            setFemale(true);
        }
    }

    const changeNickname = (e) => {
        setNickname(e.target.value);
    }

    const changeSns_url = (e) => {
        setSns_url(e.target.value);
    }

    const changeContent = (e) => {
        setContent(e.target.value);
        setInputCount(e.target.value.length);

        if (content.length > maxInputLength) {
            alert("최대 20자까지 입력 가능합니다.");
            e.target.value = content.substring(0, maxInputLength);
            setInputCount(maxInputLength);
        }
    }

    const changeHeight = (e) => {
        setHeight(e.target.value);
    }

    const changeWeight = (e) => {
        setWeight(e.target.value);
    }

    return (
        <f.Totalframe>
            <f.ScreenComponent>
                <f.ScreenJoin>
                    <f.Flex>
                        <ButtonNumbers content={1} />
                        <ButtonNumbers content={2} isSelected={true} />
                        <ButtonNumbers content={3} />
                        <ButtonNumbers content={4} />
                    </f.Flex>
                    <QuestionMode content={'코디네이터 님의\n 프로필을 작성해주세요'} marginBottom={'25px'} />
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
                    <InputContaier>
                        <GetInfo infoName={'닉네임'} changeValue={changeNickname} inputValue={nickname} check={nicknameRef} click={()=>setIsClicked('닉네임')} nowinput={isClicked==='닉네임'}/>
                        <AiOutlineCheckCircle fill={pass ? '#4F44E2' : '#C9C5CA'}/>
                        <Male
                            onClick={() => changeGender(1)}
                            selected={male}>남</Male>
                        <Female
                            onClick={() => changeGender(2)}
                            selected={female}>여</Female>
                    </InputContaier>
                    <f.Flex>
                        <GetInfo infoName={'키'} unit={'cm'} changeValue={changeHeight} inputValue={height} click={()=>setIsClicked('키')} nowinput={isClicked==='키'}/>
                        <GetInfo infoName={'체중'} unit={'kg'} changeValue={changeWeight} inputValue={weight} click={()=>setIsClicked('체중')} nowinput={isClicked==='체중'}/>
                    </f.Flex>
                    <f.Flex>
                        <GetInfo infoName={'SNS 링크'} changeValue={changeSns_url} inputValue={sns_url} click={()=>setIsClicked('SNS 링크')} nowinput={isClicked==='SNS 링크'}/>
                    </f.Flex>
                    {/*프로필 내용 입력받기 (1/20)-20글자 이내*/}
                    <c.TextContainer>
                        <c.TextArea onChange={changeContent} maxLength={maxInputLength} placeholder="프로필을 간단하게 적어주세요!" onClick={()=>setIsClicked('설명')}/>
                        <c.TextCount><span>{inputCount}</span><span>/20 자</span></c.TextCount>
                    </c.TextContainer>
                    

                        <ButtonBottom content={'다음'} sendInfo={handleImageUpload} type={pass ? 'axios' : 'none'}/>
                   
                </f.ScreenJoin>
            </f.ScreenComponent>
        </f.Totalframe>
    )
}
export default CoInfo;