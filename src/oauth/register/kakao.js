import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.svg";

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
    const [code, setCode] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const newCode = urlParams.get('code');

        if (newCode) {
            setCode(newCode);
        }
    }, []);

    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }

    const token = getCookie('token');

    useEffect(() => {
        if (token && code) { // token과 code 모두 존재할 때만 요청 보냄
            const url = 'https://ofi-d5e2473eb437.herokuapp.com/oauth/register/kakao';
            const headers = {
                'Authorization': token
            };

            setIsLoading(true);

            axios.post(url, code, { headers })
                .then(response => {
                    if (response.data === 'success') {
                        navigate('/');
                    } else {
                        console.log('백엔드 응답:', response.data);
                    }
                })
                .catch(error => {
                    console.error('에러:', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            console.log('토큰 또는 코드가 없습니다.');
        }
    }, [token, code]);

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
