import styled from "styled-components";

export const Label=styled.label`
    display: flex;
    justify-content: center;
    position: relative;
`

export const GetPhotoContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4.14vh;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
`

export const Profile = styled.img`
    display: block;
    margin: 0 auto;
    width: 100%; /* 이미지를 동그라미 안에 꽉 차도록 지정 */
    height: 100%;
    object-fit: cover;
`

export const Camera=styled.img`
    position: absolute;
    bottom: 30px;
    right: 120px;
`


export const TextContainer = styled.div`
    margin-top: 2.96vh;
    position:relative; 
    display:inline-block; 
    margin-bottom: 13.62vh;
`

export const TextArea = styled.textarea`
    display: inline-flex;
    padding: 20px 15px 60px 15px;
    justify-content: center;
    align-items: center;
    border-radius: 11px;
    border: 1px solid #C8C5D0;
    background: #FFF;
    width: 100%;
    &::placeholder{
		color: #C8C5D0;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.175px;
	}
`
export const TextCount = styled.div`
    position:absolute; 
    right:20px; 
    bottom:20px; 
    color:#666; 
    font-size:15px;
`