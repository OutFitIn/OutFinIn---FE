const CLIENT_ID = '9PAoOnLFRBY1wUsb28BA'
const REDIRECT_URI = 'https://ofi-d5e2473eb437.herokuapp.com/oauth/register/naver'

export const NAVER_REGISTER_URL =
    `https://nid.naver.com/oauth2.0/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`;
