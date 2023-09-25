
const CLIENT_ID = '7f2ea7190047c3ce9cdd64396511fb06'
const REDIRECT_URI = 'https://web-frontend-iciy2almolkc88.sel5.cloudtype.app/oauth/register/kakao'

export const KAKAO_REGISTER_URL =
    `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`
