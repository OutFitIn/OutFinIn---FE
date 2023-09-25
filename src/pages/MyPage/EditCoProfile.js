import { useState, useRef, useEffect } from "react";
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import AWS from 'aws-sdk'
import axios from "axios";
import * as f from '../../components/Common/CommonStyle';
import * as c from '../../components/Join/CoInfoStyle';
import GobackContainer from "../../components/Common/GobackContainer";
import BigStyleCategoryBox from "../../components/Common/BigStyleCategoryBox";
import ButtonBottom from '../../components/Common/ButtonBottom';
import BottomSheetStyles from "../../components/MainPage/BottomSheetStyles";
import GetInfo from "../../components/Join/GetInfo";
import profileCircle from '../../assets/img/profileCircle.svg';
import addTag from "../../assets/img/addTag.svg";
import camera from '../../assets/img/camera.svg';
import { AiOutlineCheckCircle } from 'react-icons/ai';

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
    cursor: pointer;
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
    cursor: pointer;
`

const HashTag = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 27px;
  cursor: pointer;  
  white-space: nowrap;
  overflow-x : auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar{
    display:none;
  }
`

const InputContaier = styled.div`
    display: flex;
    align-items: center;
`

const EditCoProfile = () => {
    const navigate = useNavigate();
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
    const [dragging, setDragging] = useState(false);
    const [clickPoint, setClickPoint] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const containerRef = useRef(null);
    const [checkNickname, setCheckNickname] = useState("");
    const nicknameRef = useRef(null);
    const [pass, setPass] = useState(true);
    const [styles, setStyles] = useState([]); //초기에 가입 시 지정한 스타일들 저장
    const [isOpen, setIsOpen] = useState(false); //바텀시트 열기
    const [showTag, setShowTag] = useState(false); //태그들 보여주기
    const [selectedStyles, setSelectedStyles] = useState([]);  //편집 후 스타일들 저장
    const [nowSelected, setNowSelected] = useState([]);
    const [firstNickname, setFirstNickname] = useState("");

    // 사진 네이밍을 위한 포매팅
    const today = new Date();
    const year = today.getFullYear(); // 연도
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 1을 더하고 두 자리로 포맷팅)
    const day = String(today.getDate()).padStart(2, '0'); // 일 (두 자리로 포맷팅)
    const hours = String(today.getHours()).padStart(2, '0'); // 시간 (두 자리로 포맷팅)
    const minutes = String(today.getMinutes()).padStart(2, '0'); // 분 (두 자리로 포맷팅)
    const seconds = String(today.getSeconds()).padStart(2, '0'); // 초 (두 자리로 포맷팅)
    const formattedDate = `${year}${month}${day}${hours}${minutes}${seconds}`;
    const [photoName, setPhotoName] = useState('');
    const [firstImage, setFirstImage] = useState("");
    // after filter
    const [styleCategories, setStyleCategories] = useState([
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
        "러블리",
        "올드머니룩",
        "하객룩",
        "바캉스룩",
        "힙합",
    ]);

    // 코디네이터 프로필 편집 초기 정보 지정 상태
    const [initialInfo, setInitialInfo] = useState({
        nickname: "",
        height: "",
        weight: "",
        gender: "",
        shape: "",
        styles: [],
    });

    // 코디네이터 프로필 편집 들어가면 정보 보내기
    useEffect(() => {
        async function fetchShowData() {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get("https://port-0-backend-iciy2almolkc88.sel5.cloudtype.app/coordinator/info");
                setInitialInfo(res.data);
                // 여기서 받아온 정보를 해당 입력창에 설정해줄 수 있습니다.
                setNickname(res.data.nickname);
                setHeight(res.data.height);
                setWeight(res.data.weight);
                setImage_url(res.data.image_url);
                setSns_url(res.data.sns_url);
                setContent(res.data.content);
                //setPhotoName(res.data.nickname+formattedDate+'jpg');
                setPhotoName(res.data.image_url);
                setFirstNickname(res.data.nickname);
                setFirstImage(res.data.image_url);
                // 성별 설정
                if (res.data.gender === 'MALE') {
                    setMale(true);
                } else if (res.data.gender === 'FEMALE') {
                    setFemale(true);
                }
                // 스타일 설정
                setStyles(res.data.styles);

                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchShowData();
    }, []);

    useEffect(() => {
        setSelectedStyles([...styles]);
    }, [styles])

    useEffect(() => {
        if (photoName === '') return;

        setImage_url(photoName);
    }, [photoName])

    useEffect(() => {
        setPhotoName(nickname+formattedDate+".jpg");
    }, [nickname])

    // 닉네임 중복 검사 
    const handleClickOutside = async ({ target }) => {
        console.log(nickname);

        if (firstNickname === nickname) {
            setPass(true);
        }

        else if (nicknameRef.current && !nicknameRef.current.contains(target) && checkNickname !== nickname && firstNickname !== nickname) {
            // axios 코드 작성 하면 됨
            async function fetchNickname() {
                try {
                    axios.defaults.withCredentials = true;
                    const res = await axios.get("https://port-0-backend-iciy2almolkc88.sel5.cloudtype.app/check/nickname?nickname=" + nickname);

                    if (res.data === 'available') {
                        setPass(true);
                        setCheckNickname(nickname); // 검사를 완료한 닉네임
                        //setPhotoName(nickname+formattedDate+'.jpg');
                    } else {
                        setPass(false);
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

    const handelMouseDownEvent = (e) => {
        setDragging(true);
        if (containerRef.current) {
            setClickPoint(e.pageX);
            setScrollLeft(containerRef.current.scrollLeft);
        }
    };

    // 태그들 스크롤
    const handelMouseMoveEvent = (e) => {
        if (!dragging) return;

        e.preventDefault();

        if (containerRef.current) {
            const walk = e.pageX - clickPoint;
            containerRef.current.scrollLeft = scrollLeft - walk;
        }
    }

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
            //setPhotoName(nickname+formattedDate+".jpg");            
            reader.readAsDataURL(selectedFile);
        }
    };

    // 사진 업로드
    const handleImageUpload = () => {
        console.log("제대로 된다.");

        // 코디네이터 프로필 편집-수정
        async function fetchData() {
            try {
                axios.defaults.withCredentials=true;
                const res = await axios.post("https://port-0-backend-iciy2almolkc88.sel5.cloudtype.app/coordinator/edit",
                    {
                        id: 1,
                        nickname: nickname,
                        height: height,
                        weight: weight,
                        gender: male === true ? 'MALE' : 'FEMALE',
                        sns_url: sns_url,
                        image_url: photoName,
                        content: content,
                        styles: selectedStyles
                    },
                );
                if (res.data === 'success') {
                    navigate(-1);
                }
            } catch (error) {
                console.error(error);
            }
        }

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
                            Key: photoName, // 파일 이름 (버킷 안에서 저장될 파일 이름)
                            Body: file, // 파일 객체
                        },
                    });

                    const promise = upload.promise();   // 반환값을 받음

                    promise.then((data) => {
                        // 여기에 axios 코드 만들어서 백으로 넘기면 됨                        
                        fetchData();
                    });
                }

                handleFileInput();
            } catch (e) {
                console.log(e);
            }
        }

        // async function fetchAllData() {
        //     async function changePhotoName() {
        //         setPhotoName(nickname+formattedDate+".jpg");
        //     }

        //     try {
        //         await changePhotoName();
        //         await fetchImage();
        //     }catch(error) {
        //         console.error(error);
        //     }
        // }

        // 처음 가져온 이미지와 같은거면 사진 업로드 안함
        if (photoName === firstImage) {
            fetchData();
        }
        else {
            fetchImage();
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

    //바텀시트
    const openBottomSheet = () => {
        setIsOpen(true);
        setNowSelected([...selectedStyles]);
        //setSelectedStyles([]); //+버튼 누를 때마다 선택된 배열 초기화
    }

    // '코디 확인하기' 버튼
    const TagHandler = () => { //태그 모두 선택 이후, 바텀시트 닫고 선택한 태그들 보여주기 위한 상태 관리
        setIsOpen(false);
        setShowTag(true);
        setSelectedStyles([...nowSelected]);
    }

    //x버튼
    const cancelHandler = () => {
        setNowSelected([]);
        setIsOpen(false);
    }

    return (
        <f.Totalframe>
            <f.ScreenComponent>
                <GobackContainer />
                {/*사진 수정하기*/}
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
                            src={image.preview_URL || "https://seumu-s3-bucket.s3.ap-northeast-2.amazonaws.com/" + image_url}
                        />
                        <c.Camera src={camera} />
                    </c.GetPhotoContainer>
                </c.Label>
                {/*태그 수정하기*/}
                <HashTag ref={containerRef}
                    onMouseDown={handelMouseDownEvent}
                    onMouseLeave={() => setDragging(false)}
                    onMouseUp={() => setDragging(false)}
                    onMouseMove={handelMouseMoveEvent}>
                    {/* {showTag? (
                        <>
                        {selectedStyles?.map((data) => (
                            <BigStyleCategoryBox key={data} content={'#' + data} isSelected={true} />
                        ))}
                        <img src={addTag} onClick={openBottomSheet}/>
                        </>
                    ):(
                        <>
                        {styles?.map((data)=> (
                            <BigStyleCategoryBox content={data} isSelected={true}/>
                        ))}
                        <img src={addTag} onClick={openBottomSheet}/>
                        </>
                    )} */}
                    <>
                        {selectedStyles?.map((data) => (
                            <BigStyleCategoryBox key={data} content={'#' + data} isSelected={true} />
                        ))}
                        <img src={addTag} onClick={openBottomSheet} />
                    </>
                </HashTag>
                {/*정보 수정하기*/}
                <InputContaier>
                    <GetInfo infoName={'닉네임'} changeValue={changeNickname} inputValue={nickname} check={nicknameRef} click={()=>setIsClicked('닉네임')} nowinput={isClicked==='닉네임'}/>
                    <AiOutlineCheckCircle fill={pass ? '#4F44E2' : '#C9C5CA'} />
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
                    <c.TextArea onChange={changeContent} maxLength={maxInputLength} value={content} placeholder="프로필을 간단하게 적어주세요!" onClick={()=>setIsClicked('설명')}/>
                    <c.TextCount><span>{inputCount}</span><span>/20 자</span></c.TextCount>
                </c.TextContainer>
            </f.ScreenComponent>
            {/* 바텀 시트와 네비게이션 바*/}
            {isOpen ? <BottomSheetStyles openState={cancelHandler} isOpen={isOpen} sendData={TagHandler}
                styleCategories={styleCategories} selectedStyles={selectedStyles}
                setSelectedStyles={setSelectedStyles} nowSelected={nowSelected} setNowSelected={setNowSelected}/>
                : <f.ScreenComponent>
                    <ButtonBottom content={'저장'} sendInfo={handleImageUpload} type={'axios'} />
                </f.ScreenComponent>}
        </f.Totalframe>
    )
}

export default EditCoProfile;