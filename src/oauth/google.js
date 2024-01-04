import { useEffect, useState,} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../App.css'; // Import your CSS file for styling
import logo from "../assets/img/logo.svg"

// CSS 스타일을 JavaScript 내에 직접 작성
const styles = {
    appContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
    },
    centeredContent: {
        textAlign: 'center',
    },
    iconImage: {
        width: '100px', // 원하는 이미지 너비로 조정
        height: 'auto',
        marginBottom: '20px', // 이미지 아래 여백 조정
    },
};

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [sessionValue, setSessionValue] = useState('');
    const [tokenValue, setTokenValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // 현재 페이지 URL에서 코드 추출
        const urlParams = new URLSearchParams(window.location.search);
        const newCode = urlParams.get('code');

        if (newCode) {
            async function fetchData(){
                try {
                    const res = await axios.post(
                        "http://ec2-3-35-152-30.ap-northeast-2.compute.amazonaws.com:8080/oauth/register/testgoogle", newCode);

                    if(res.data === 'coordinator') {
                        localStorage.setItem('mode', 1)
                        //navigate('/outermainpage');
                    }
                    else if(res.data === 'user') {
                        localStorage.setItem('mode', 2)
                        //navigate('/usermainpage');
                    }else {
                        alert("연동된 계정이 없습니다.")
                        //navigate('/');
                    }
                    console.log(res.data)

                    // res.data 가 outer, fiter 로 나눠서 보내줌
                    // 단, 실패 시 이메일이 틀린 경우: Email Not Found  /  비밀번호가 틀린 경우: Password Not Equal
                } catch (error) {
                    console.error(error);
                }
            }

            fetchData();
        }

    }, []);

    return (
        <div style={styles.appContainer}>
            <div style={styles.centeredContent}>
                <img src={logo} alt="앱 아이콘" style={styles.iconImage} />
                <p>잠시만 기다려 주세요~</p>
            </div>
        </div>
    );
}

export default App;
