const CLIENT_ID = '9PAoOnLFRBY1wUsb28BA'
const REDIRECT_URI = 'https://ec2-3-35-152-30.ap-northeast-2.compute.amazonaws.com:8080/oauth/naver'

export const NAVER_AUTH_URL =
    `https://nid.naver.com/oauth2.0/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`;
