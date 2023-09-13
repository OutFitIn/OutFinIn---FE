import { useState } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import AWS from 'aws-sdk'
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
    const maxInputLength = 20;
    const [nickname, setNickname] = useState("");
    const [sns_url, setSns_url] = useState("");
    const [image_url, setImage_url] = useState("");
    const [content, setContent] = useState("");
    const [gender, setGender] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");

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

    const handleImageUpload = () => {
        console.log("제대로 된다.");

        async function fetchImage() {
            AWS.config.update({
                region: "ap-northeast-2",
                accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
            });
            try {
                const handleFileInput = async () => {
                    const file = image.image_file;

                    const upload = new AWS.S3.ManagedUpload({
                        params: {
                            Bucket: "seumu-s3-bucket", // 버킷 이름
                            Key: "test.jpeg", // 파일 이름 (버킷 안에서 저장될 파일 이름)
                            Body: file, // 파일 객체
                        },
                    });

                    const promise = upload.promise();   // 반환값을 받음

                    promise.then((data) => {
                        // 여기에 axios 코드 만들어서 백으로 넘기면 됨
                        setImage_url(data.Location);
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }

        async function fetchData() {
            try {
                const res = await axios.post('http://localhost:8080/coordinator/profile', 
                {
                    coordinator_id: 1,
                    nickname: nickname,
                    sns_url: sns_url,
                    image_url: image_url,
                    content: content,
                    gender: male === true ? 'MALE' : 'FEMALE',
                    height: height,
                    weight: weight,
                    total_like: 0,
                    request_count: 0
                },
                {
                    headers: { 'Content-Type': 'application/json'},
                }
                );

                console.log(res);
            } catch (error) {
                console.error(error);
            }
        }

        fetchImage();
        fetchData();
    };

    const changeGender = (g) => {
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
                    <f.Flex>
                        <GetInfo infoName={'닉네임'} changeValue={changeNickname} inputValue={nickname} />
                        <Male
                            onClick={() => changeGender(1)}
                            selected={male}>남</Male>
                        <Female
                            onClick={() => changeGender(2)}
                            selected={female}>여</Female>
                    </f.Flex>
                    <f.Flex>
                        <GetInfo infoName={'키'} unit={'cm'} changeValue={changeHeight} inputValue={height} />
                        <GetInfo infoName={'체중'} unit={'kg'} changeValue={changeWeight} inputValue={weight} />
                    </f.Flex>
                    <f.Flex>
                        <GetInfo infoName={'SNS 링크'} changeValue={changeSns_url} inputValue={sns_url} />
                    </f.Flex>
                    {/*프로필 내용 입력받기 (1/20)-20글자 이내*/}
                    <c.TextContainer>
                        <c.TextArea onChange={changeContent} maxLength={maxInputLength} placeholder="프로필을 간단하게 적어주세요!" />
                        <c.TextCount><span>{inputCount}</span><span>/20 자</span></c.TextCount>
                    </c.TextContainer>
                    <Link to="../getstyle">
                        <ButtonBottom content={'다음'} sendInfo={handleImageUpload} type={'axios'}/>
                    </Link>
                </f.ScreenJoin>
            </f.ScreenComponent>
        </f.Totalframe>
    )
}
export default CoInfo;