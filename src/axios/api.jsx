import axios from "axios";
import { getCookie } from "../cookies/cookies";

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_URL}`,
    withCredentials: true
});

instance.interceptors.request.use(
  function(config) {
    console.log(config)
    
    const token = getCookie('userCookie')
    if ( token ) {
      config.headers.authorization = token
    }
    return config;
  }
)

// 디엠 바 조회
const getDMList = async () => {
    const response = await instance.get("/api/dm");
    // console.log('dm response', response);w
    return response.data;
};

// 채널 바 조회
const getChannelList = async () => {
    const response = await instance.get("/api/channel");
    console.log('channel response', response)
    return response.data;
};

// 이전 대화 불러오기
const getPrevChat = async (dmId) => {
  const response = await instance.get('/api/dm', {param:{id:dmId}});
  console.log("response", response);
  return response.data;
}

// 회원가입
const postSignUp = async (signUp) => {
  const response = await instance.post('/api/auth/signup', signUp)
  console.log('signup', response.data)
  return response.data;
}

// 로그인
const postLogin = async (login) => {
  const response = await instance.post('/api/auth/login', login);

  const cookies = response.headers.authorization

  return {reponse: response.data, cookies : cookies};
}

// 프로필 정보 get
const getProfile = async () => {
  const response = await instance.get('/api/user/profile')

  return response.data;
}

// 프로필 수정 put
const editProfile = async ( data ) => {
  await instance.put('/api/user/profile', {
    image : data,
    nickname : data
  })
}
export { getDMList, getChannelList, postSignUp, postLogin, getProfile, getPrevChat };
