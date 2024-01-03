import React, { useState, useRef, useEffect} from "react";
import { Link,useParams } from 'react-router-dom';
import styled from "styled-components";
import Navigation from "../../components/Navigation/Navigation";
import GobackContainer from "../../components/Common/GobackContainer";
import smallFind from "../../assets/img/smallFind.svg";
import UserInfo from "../../components/Chat/UserInfo";
import ChatBubble from "../../components/Chat/ChatBubble";
import * as StompJs from '@stomp/stompjs';
import SockJS from "sockjs-client";
import axios from 'axios';
import { Bootpay } from '@bootpay/client-js'

const Totalframe = styled.div`
    width: 390px;
    height: 100vh;
    border: 1px solid #eceeef;
    margin: 0 auto;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    position: relative; 
`
const SubScreen = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    &::-webkit-scrollbar{
    display:none;
    }
    backround-color: #F3EFFA;
    margin-bottom: 97px;
    background-color: #F3EFFA;
`

const ChatScreen = styled.div`
    height: 100%;
    flex-grow: 1;
`

const Header = styled.div`
    position: sticky;
    top: 0;
    padding: 0px 18px;
    display: flex;
    background-color: white;
`
const NameContainer = styled.div`
    margin-top: 32px;
    width: 100%;
    display: flex;
    justify-content: center;
    color: #000;
    font-family: Noto Sans KR;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.08px;
`

const DateContainer = styled.div`
    padding: 16px 0; 
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
`
const Line = styled.div`
    width: 135px;
    height: 1px;
    background: #ADAAAF;
`

const DateContent = styled.div`
    color: #ADAAAF;
    text-align: center;
    font-family: Noto Sans KR;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.048px;
`
const InputContainer = styled.div`
    height: 98px;
    width: 390px;
    display: flex;
    gap: 12px;
    padding: 8px 10px 48px 10px;
    align-items: flex-start;
    background: #E5E1E6;
    padding: 8px 10px 48px 10px;
    position: fixed;
    bottom: 0;
`
const GetContent = styled.input`
    padding: 8px 10px 8px 12px;
    display: flex;
    width: 263px;
    border-radius: 25px;
    border: none;
    &::placeholder{
        color: #ADAAAF;
        font-family: Noto Sans CJK KR;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: 0.056px;
    }
    &:focus{
        outline: none;
        border: 1px solid #100069;
    }
`
const SendButton = styled.button`
    width: 58px;
    height: 37px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    background: #4F44E2;
    color: #FFF;
    font-family: Noto Sans CJK KR;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.056px;
    border: none;
`

const UserChatRoom = () => {
    const [content, setContent] = useState(''); //input창의 메시지 저장
    const [isSend, setIsSend] = useState(false);
    const [text, setText] = useState(''); //확정메시지 (말풍선)
    // 채팅방 날짜 포메팅
    const today = new Date();
    const year = today.getFullYear(); // 연도
    const month = today.toLocaleString('default', { month: 'long' }); // 월 (긴 형식으로)
    const day = today.getDate(); // 일
    const formattedDate = `${year}년 ${month} ${day}일`;

    const handleInput = (e) => {
        setContent(e.target.value);
    }

    const handleSend = () => {
        setIsSend(true);
        setText(content);
        setContent('');
    }

    // 추가 - 준형    

    useEffect(() => {
        connect();
        async function fetchChatRoom() {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get("https://ofi-ofi.koyeb.app/chat/messages?roomId=" + chatRoomId + "&nickname=" + otherNickname);
                setChatList(res.data.chatHistories);
                console.log(res.data.chatHistories);
            } catch (error) {
                console.error(error);
            }
        }

        fetchChatRoom();

        return () => disconnect();
    }, []);

    const { chatRoomId, myNickname, otherNickname } = useParams();
    const client = useRef();

    const handleClick = () => {
        async function fetch() {
            try {
                const response = await Bootpay.requestPayment({
                    "application_id": "651149f2e57a7e001dc6882d",
                    "price": 1000,
                    "order_name": "코디 이용권",
                    "order_id": "TEST_ORDER_ID",
                    "pg": "케이씨피",
                    "method": "카드",
                    "tax_free": 0,
                    "user": {
                        "id": "회원아이디",
                        "username": "test_user",
                        "phone": "01000000000",
                        "email": "test@test.com"
                    },
                    "items": [
                        {
                            "id": "item_id",
                            "name": "Outer" + " 코디",
                            "qty": 1,
                            "price": 1000
                        }
                    ],
                    "extra": {
                        "open_type": "iframe",
                        "card_quota": "0,2,3",
                        "escrow": false,
                        "separately_confirmed": true // 분리 결제 설정(백엔드에서 내부 비지니스 로직 수행하기 위함)
                    }
                })

                switch (response.event) {
                    case 'issued':
                        // 가상계좌 입금 완료 처리
                        break
                    case 'confirm':
                        try {
                            // 내부 비지니스 로직(쿠폰, 등급, 할인 같은)
                            const res = await axios.post("https://ofi-ofi.koyeb.app/pay/confirm", { 
                                receipt_id: response.receipt_id,
                                status: response.status,
                                price: response.price 
                            });
                        } catch (e) {
                            console.log(e);
                        }
                        Bootpay.destroy(); // 결제창 종료          
                        break
                    default:
                        console.log(response);
                        break
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetch();
    }

    const connect = () => {
        client.current = new StompJs.Client({
            brokerURL: 'ws://port-0-backend-iciy2almolkc88.sel5.cloudtype.app/ws-stomp',
            onConnect: () => {
                subscribe();
            }
        });

        client.current.webSocketFactory = function () {
            return new SockJS("https://ofi-ofi.koyeb.app/ws-stomp");
        };

        client.current.activate();
    };

    const publish = () => {
        if (!client.current.connected) return;

        client.current.publish({
            destination: '/pub/chat/message',
            body: JSON.stringify({
                roomId: chatRoomId,
                sender: myNickname,
                message: content,
                createAt: null
            }),
        });

        setContent('');
    };

    const [chatList, setChatList] = useState([]);

    const subscribe = () => {
        client.current.subscribe(`/sub/chatroom/${chatRoomId}`, (body) => {
            const json_body = JSON.parse(body.body);
            setChatList((_chat_list) => [
                ..._chat_list, json_body
            ]);
        });
    };

    const disconnect = () => {
        client.current.deactivate();
    };

    return (
        <Totalframe>
            <SubScreen>
                {/* 헤더 */}
                <Header>
                    <GobackContainer />
                    <NameContainer>{otherNickname}</NameContainer>
                </Header>
                {/* 채팅 방 화면 */}
                <ChatScreen>
                    {/* 날짜 표시-고정 */}
                    <DateContainer>
                        <Line></Line>
                        <DateContent>{formattedDate}</DateContent>
                        <Line></Line>
                    </DateContainer>
                    {chatList.map((data) => (
                        <ChatBubble
                            name={data.senderId == myNickname ? myNickname : otherNickname}
                            isCurrentUser={myNickname == data.senderId}
                            message={data.message} />
                    ))}
                    {/* 메시지 내용 */}
                    {/* <ChatBubble name={'뉴비피터'} isCurrentUser={false} message={'요즘 어떤 옷을 입어야 할 지 고민이에요. 추천해주실 수 있나요? 아우터님?'} />
                    <ChatBubble name={null} isCurrentUser={true} message={'안녕하세요 000 아우터 입니다! 원하시는 코디가 따로 없으시다고 했는데, 제가 안내를 도와드려도 될까요?'} />
                    <ChatBubble name={null} isCurrentUser={true} message={'이제 9월이니까 피터님은 가을 코디를 준비해두면 좋을 것 같습니다! 저는 트렌치 코트와 청바지 조합을 추천드립니다. 저의 코디 게시물을 공유해드릴테니, 마음에 드는 코디가 있으시면 말씀해주세요! 그 코디와 유사한 방향으로 도와드리겠습니다.'} />
                    <ChatBubble name={'뉴비피터'} isCurrentUser={false} message={'넵 감사합니다.'} /><ChatBubble name={'뉴비피터'} isCurrentUser={false} message={'요즘 어떤 옷을 입어야 할 지 고민이에요. 추천해주실 수 있나요? 아우터님?'} /> */}
                    {isSend ?
                        (<ChatBubble name={null} isCurrentUser={true} message={text} />)
                        : null
                    }

                </ChatScreen>
            </SubScreen>
            {/* 입력 창 띄어주기 */}
            <InputContainer>
                <SendButton onClick={handleClick}>결제</SendButton>
                <GetContent placeholder="메세지 보내기" value={content} onChange={handleInput} />
                <SendButton onClick={publish}>전송</SendButton>
            </InputContainer>
        </Totalframe>
    );
};

export default UserChatRoom;
