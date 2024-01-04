const CLIENT_ID = '913247934733-5ubt084h8ohcpngodtvcmvmu4ucn0rtd.apps.googleusercontent.com'
const REDIRECT_URI = 'https://ec2-3-35-152-30.ap-northeast-2.compute.amazonaws.com:8080/oauth/register/google'

export const GOOGLE_REGISTER_URL =
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile`
