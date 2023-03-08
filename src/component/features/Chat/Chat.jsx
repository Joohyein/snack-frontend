import React, { useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import * as StompJs from "@stomp/stompjs";
import Stomp from 'stompjs';
import { useEffect } from 'react';
import styled from 'styled-components';
import { StTitle } from '../SideBar/SideBarStyled';
import {Container,StContainer,StHeader,StIconBox,StMsgBox,  StMsgContainer,  StIconBoxBottom,  StLeft,  StSend,  StChatContainer,  StChatbox,StProfile,StNameMsgBox,StName,StContent,StInput,StChatBoxContainer,StSendTrue,StSendIcon,} from './ChatStyled'
import {BiBold, BiItalic, BiSend, BiStrikethrough, BiAt, BiSmile, BiLink, BiListOl, BiListUl, BiCodeAlt, BiMicrophone, BiCodeBlock, BiPlusCircle, BiVideo} from "react-icons/bi";
import { 
  StChannel, 
  StContainerSide, 
  StDmBox, 
  StHeaderSide, 
  StIconArrow,
  StIconToggleOpen,
  StIconToggleClose,
  StNameSide, 
  StTitleChDm,
  StTitleBox,
} from '../SideBar/SideBarStyled';
import { useQuery } from 'react-query';
import { getDMList, getPrevChat } from '../../../axios/api';


function Chat() {
  // const client = useRef({}); // 속성 값이 변경되어도 재렌더링하지 않고, 다시 렌더링 하더라도 유실되지 않도록 클리이언트를 current속성에 만든다.
  const {isLoading, isError, data} = useQuery("listDm", getDMList);
  
  const [isChat, setIsChat] = useState(true);  // 초깃값: 메인화면(false), 채팅시작(true) - 방을 클릭했을 때 변경
  const [messages, setMessages] = useState([]);  // 화면에 표시될 채팅 기록
  const [inputMsg, setInputMsg] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [isCheck, setIsCheck] = useState(false); 
  const [uuid, setUuid] = useState("");

  const [roomNum, setRoomNum] = useState();

  const [toggleCh, setToggleCh] = useState(false);
  const [toggleDm, setToggleDm] = useState(false);

  const onClickToggleChHandler = () => {
    setToggleCh(!toggleCh);
  }
  const onClickToggleDmHandler = () => {
    setToggleDm(!toggleDm);
  }

  useEffect(()=>{
    const socket = new SockJS(`${process.env.REACT_APP_URL}/stomp/chat`);
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      console.log("connected");
      stompClient.subscribe(`/topic/dm/message/${roomNum}`, (data) => {

        const msgData = JSON.parse(data.body);
        console.log("msgData: ", msgData);

        setMessages((prev) => [...prev, msgData]);
        // setUuid()
      },
      (err) => {}
      );
      setStompClient(stompClient);
    });
    return () => {
      // stompClient.disconnect();
    }
  }, []);
  
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // if(!stompClient.current.connected) return;  // 연결이 끊겼을 때
    // console.log("messages typeof : ", typeof(messages));
    // const username = 'testname'; // 질문
    const username = localStorage.getItem('nickname'); 
    const newMsg = {
      type: 'ENTER',
      dmId: roomNum,
      username, 
      message: inputMsg,
      uuid: roomNum,
    }

    if(inputMsg) {
      stompClient.send('/app/chat/message', {}, JSON.stringify(newMsg));
      setInputMsg('');
    }
  }

  const onChangeInputHandler = (e) => {
    setInputMsg(e.target.value);
  };

  useEffect(()=>{
    if(inputMsg === "") setIsCheck(()=>false);
    else setIsCheck(()=>true);
  },[inputMsg]);

  return (
    <StContainer>
      <StSideBarBox>
        <StContainerSide>
          <StHeaderSide>
            <StNameSide>HangHae99</StNameSide>
            <StIconArrow />
          </StHeaderSide>

          <StChannel>
            <StTitleBox>
              {
                toggleCh
                  ? 
                    <>
                      <StTitleChDm onClick={onClickToggleChHandler}>
                        <StIconToggleOpen />
                        <h3>채널</h3>
                      </StTitleChDm>
                      {/* <ChannelList /> */}

                    </>
                  :  
                    <StTitleChDm onClick={onClickToggleChHandler}>
                      <StIconToggleClose />
                      <h3>채널</h3>
                    </StTitleChDm>
              }
            </StTitleBox>
          </StChannel>

          <StDmBox>
            <StTitleBox>
              {
                toggleDm
                  ? 
                    <>
                      <StTitleChDm onClick={onClickToggleDmHandler}>
                        <StIconToggleOpen />
                        <h3>다이렉트 메시지</h3>
                      </StTitleChDm>
                      {
                        data.map((item)=>{
                          return <StContainerBox>
                          <StImg src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' />
                          <StState></StState>
                          <StTitle
                            key={item.id} 
                            onClick={()=>setRoomNum(item.id)}
                            >{item.title}
                          </StTitle>
                        </StContainerBox>
                        })
                      }

                    </>
                  :  
                    <StTitleChDm onClick={onClickToggleDmHandler}>
                      <StIconToggleClose />
                      <h3>다이렉트 메시지</h3>
                    </StTitleChDm>
              }
            </StTitleBox>
          </StDmBox>
        </StContainerSide>
      </StSideBarBox>
      {
        isChat 
          ? 
          <Container>
            <StChatContainer>
              <StHeader>
                <h3>다이렉트 메시지</h3>
              </StHeader>
              <StChatBoxContainer>
                {
                  messages.map((item)=> 
                    <StChatbox>
                      <StProfile></StProfile>
                      <StNameMsgBox>
                        <StName>{item.username}</StName>
                        <StContent key={item.message}>{item.message}</StContent>
                      </StNameMsgBox>
                    </StChatbox>
                  )
                }
              </StChatBoxContainer>
            </StChatContainer>
            <StMsgContainer onSubmit={onSubmitHandler}>
              <StIconBox>
                <BiBold />
                <BiItalic />
                <BiStrikethrough /> 
                <h3>|</h3>
                <BiLink />
                <h3>|</h3>
                <BiListOl />
                <BiListUl />
                <h3>|</h3>
                <BiCodeAlt />
                <BiCodeBlock />
              </StIconBox>
              <StMsgBox>
                <StInput 
                  value={inputMsg}
                  onChange={onChangeInputHandler}
                  name='msg'
                  placeholder='_12기_공지방에게 메시지 보내기' 
                />
              </StMsgBox>
              <StIconBoxBottom>
              <StLeft>
                <BiPlusCircle />
                <h3>|</h3>
                <BiVideo />
                <BiMicrophone />
                <h3>|</h3>
                <BiSmile />
                <BiAt />
              </StLeft>
              {
                isCheck
                  ?
                  <StSendTrue>
                    <BiSend type='submit'/>
                    <h3>|</h3>
                    <StSendIcon />
                  </StSendTrue>
                  :
                  <StSend>
                    <BiSend type='submit'/>
                    <h3>|</h3>
                    <StSendIcon />
                  </StSend>
              }
              </StIconBoxBottom>
            </StMsgContainer> 
          </Container>
          : null

      }
    </StContainer>
  )
}

export default Chat;

// 메시지 보낼 때(input에 입력) StSend버튼 활성화(style주기)
// StChatBox -> get요청으로 받은 메시지 리스트 중 하나
// StNameMsgBox -> 작성자이름(StName), 내용(StContent) 포함
// StProfile -> 프로필 이미지 

const StSideBarBox = styled.div`
  /* z-index: 1; */
  width: 16%;
  /* height: 100vh;
  padding: 0px;
  box-sizing: border-box;
  margin: 0;
  position: fixed;
  top: 45px; */
  /* min-width: 168px;  */
  @media screen and (max-width:800px) {
    display: none;
  }
`;

const StContainerBox = styled.div`
  display: flex;
  align-items: center;
  gap:8px;
  position: relative;
`;
const StState = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #2AAC76;
  position: absolute;
  top:12px;
  left: 12px;
  border: 2px solid #19171D;
`;
const StImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 2px;
`;