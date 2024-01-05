import React, { useState, useRef, useEffect } from "react";
import * as f from "../../components/Common/CommonStyle";
import * as c from '../../components/Join/CoInfoStyle';
import styled from "styled-components";
import { Link, useNavigate, useParams } from 'react-router-dom';
import GobackContainer from "../../components/Common/GobackContainer";
import BottomSheetSingle from "../../components/MainPage/BottomSheetSingle";
import Navigation from "../../components/Navigation/Navigation";
import addTag from "../../assets/img/addTag.svg";
import addPost from "../../assets/img/addPost.png";
import AWS from 'aws-sdk';
import axios from 'axios';

// 지울거. 샘플이미지
import logo from "../../assets/img/logo.svg";
import sample from "../../assets/img/sample.svg";
import BigStyleCategoryBox from "../../components/Common/BigStyleCategoryBox";

const TagContainer = styled.div`
  margin: 20px 0 16px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`

const Content = styled.div`
  color: var(--material-theme-ref-neutral-neutral-70, #ADAAAF);
  font-family: Noto Sans CJK KR;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.175px;
`

const PhotoContainer = styled.div`
  position:relative;
  display: flex;
  gap: 14px;
  cursor: pointer;
`

const Photo = styled.img`
  position:relative;
  width: 200px;
  height: 221px;
  border-radius: 18px;
  object-fit: cover;
`
const PostList = styled.div`
  display: flex;
  gap: 16px;  
  cursor: pointer;  
  white-space: nowrap;
  overflow-x : auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar{
    display:none;
  }
`

const TextContainer = styled.div`
  width: 100%;
  position:relative; 
  display:inline-block; 
  margin-bottom: 30px;
  cursor: pointer;
`
const TextArea = styled.textarea`
  padding: 20px 15px 60px 15px;
  justify-content: center;
  align-items: center;
  border-radius: 11px;
  border: 1px solid #C8C5D0;
  background: #FFF;
  width: 100%;
  height: 300px;
  resize: none;
  cursor: pointer;
  &::placeholder{
  color: #C8C5D0;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 0.175px;
  }
  &:focus {
    outline: none;
    border: 2px solid #100069;
  }
`
const TitleContainer = styled.input`
  margin: 16px 0;
  padding: 8px 15px;
  width: 100%;
  border: none;
  border-bottom: 2px solid var(--material-theme-sys-light-outline-variant, #C8C5D0);
  color: #100069;
  font-family: Noto Sans CJK KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.2px;
  cursor: pointer;
  &::placeholder{
    color: var(--material-theme-ref-neutral-neutral-70, #ADAAAF);
    font-family: Noto Sans CJK KR;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.2px;
  }
  &:focus {
    outline: none; 
    border-bottom: 2px solid #100069;
  }
`

const FinishBotton = styled.button`
  display: flex;
  width: 354px;
  height: 60px;
  padding: 5px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: #100069;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  line-height: normal;
  letter-spacing: 0.08px;
  text-decoration: none;
  margin-bottom: 37px;
  cursor: pointer;
`

const WriteNewPost = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [clickPoint, setClickPoint] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedStyles, setSelectedStyles] = useState('');
  const [selectedWeather, setSelectedWeather] = useState('');
  const [selectedSituation, setSelectedSituation] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);     // 선택한 모든 태그들
  const [showTag, setShowTag] = useState(false);
  const [image, setImage] = useState({
    image_file: null,
    preview_URL: null,
  });


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
  const [nickname, setNickname] = useState("");

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
    "올드머니룩",
    "하객룩",
    "바캉스룩",
    "힙합",
  ]);

  const [weatherCategories, setWeatherCategories] = useState([
    ["봄 코디", "여름 코디"],
    ["가을 코디", "겨울 코디"],
  ]);

  const [situationCategories, setSituationCategories] = useState([
    "면접", "여행", "캠퍼스", "데이트", "출근", "결혼식"
  ]);

  // 사진들 스크롤
  const handelMouseDownEvent = (e) => {
    setDragging(true);
    if (containerRef.current) {
      setClickPoint(e.pageX);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handelMouseMoveEvent = (e) => {
    if (!dragging) return;

    e.preventDefault();

    if (containerRef.current) {
      const walk = e.pageX - clickPoint;
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  }

  // 바텀 시트 열기
  const openBottomSheet = () => {
    setIsOpen(true);
  }

  // // 바텀 시트에서 코디 확인하기 버튼 누르면 +버튼이랑 문장 사라지고 태그들 뜨게
  // const showTags=() => {
  //   setShowTag(true);
  //   setIsOpen(false); // 바텀 시트 닫기
  // }

  // 게시물 사진 업로드
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

  useEffect(() => {
    if (nickname == "") return;

    setPhotoName(nickname + formattedDate + ".jpg");
  }, [nickname]);

  // 닉네임 가져오기 axios
  useEffect(() => {
    async function fetchData() {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get("https://ofi-d5e2473eb437.herokuapp.com/coordinator/nickname");
        setNickname(res.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [])

  // 글 작성 axios
  const handlePostUpload = () => {
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
            Key: photoName, // 파일 이름 (버킷 안에서 저장될 파일 이름)
            Body: file, // 파일 객체
          },
     });

    const promise = upload.promise();

    promise.then((data)=>{
      async function fetchData() {
        try {
          axios.defaults.withCredentials=true;
          const res = await axios.post('https://ofi-d5e2473eb437.herokuapp.com/board/create', 
            {
              style: selectedStyles,
              like_count: 0,
              title: title,
              season: selectedWeather,
              situation: selectedSituation,
              content: content,
              image_url: photoName
            }
          );
          if (res.data) {
            navigate(`/postdetail/${res.data}`);
          }
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

  const changeContent = (e) => {
    setContent(e.target.value);
  }

  const changeTitle = (e) => {
    setTitle(e.target.value);
    // setPhotoName(nickname+formattedDate+'.jpg');
  }

  return (
    <f.Totalframe>
      <f.SubScreen>
        <f.ScreenComponent>
          {/* 버튼 부분 */}
          <GobackContainer />
          {/* 태그 */}
          <TagContainer>
            {showTag ? (
              <>
                {selectedTags?.map((data) => (
                  <BigStyleCategoryBox key={data} content={'#' + data} isSelected={true} />
                ))}
                <img src={addTag} onClick={openBottomSheet} />
              </>
            ) : (
              <>
                <img src={addTag} onClick={openBottomSheet} />
                <Content>스타일 코디 태그를 설정해주세요</Content>
              </>
            )}
          </TagContainer>
          {/* 사진 */}
          <input
            type="file"
            id="postImageInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <c.Label htmlFor="postImageInput">
            <PhotoContainer>
              <Photo src={image.preview_URL || addPost}></Photo>
            </PhotoContainer>
          </c.Label>

          {/* <PhotoContainer>
              <PostList>
                <Photo src={addPost}></Photo>
              </PostList> */}
          {/* <PostList ref={containerRef}
                onMouseDown={handelMouseDownEvent}
                onMouseLeave={() => setDragging(false)}
                onMouseUp={() => setDragging(false)}
                onMouseMove={handelMouseMoveEvent}>
                <Photo src={logo}></Photo>
                <Photo src={sample}></Photo>
                <Photo src={logo}></Photo>
                <Photo src={sample}></Photo>
                <Photo src={logo}></Photo>
              </PostList> 
            </PhotoContainer>*/}
          {/* 글 제목 */}
          <TitleContainer onChange={changeTitle} value={title} placeholder="코디 제목을 작성해주세요" />
          {/* 글 작성 */}
          <TextContainer>
            <TextArea onChange={changeContent} value={content} placeholder="아우터님의 코디를 설명해주세요" />
          </TextContainer>

          {/* 글 작성 완료 버튼*/}
          <FinishBotton onClick={handlePostUpload}>작성 완료</FinishBotton>
        </f.ScreenComponent>
      </f.SubScreen>

      {/* 바텀 시트와 네비게이션 바*/}
      {isOpen ? <BottomSheetSingle openState={setIsOpen} isOpen={isOpen} sendData={setShowTag}
        styleCategories={styleCategories} weatherCategories={weatherCategories} situationCategories={situationCategories}
        selectedStyles={selectedStyles} selectedSituation={selectedSituation} selectedWeather={selectedWeather}
        setSelectedStyles={setSelectedStyles} setSelectedSituation={setSelectedSituation} setSelectedWeather={setSelectedWeather}
        addSelectedTag={setSelectedTags} />
        : <Navigation type={'Home'} />}
    </f.Totalframe>
  )
}
export default WriteNewPost;