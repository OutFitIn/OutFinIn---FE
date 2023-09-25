const CLIENT_ID = '7f2ea7190047c3ce9cdd64396511fb06'
const REDIRECT_URI = 'https://port-0-backend-iciy2almolkc88.sel5.cloudtype.app/oauth/kakao'

export const KAKAO_AUTH_URL =
    `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`
