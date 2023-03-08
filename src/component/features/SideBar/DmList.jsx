import React from 'react';
import { useQuery } from 'react-query';
import { getDMList, getPrevChat } from '../../../axios/api';
import { StTitle } from './SideBarStyled';
import styled from 'styled-components';

function DmList({setRoom}) {
  const {isLoading, isError, data} = useQuery("listDm", getDMList);
  // const {isLoading:isLoadingChat, isError:isErrorChat, data:dataChat} = useQuery("chat", getPrevChat(data.uuid));
  
  // console.log("dataChat", dataChat);
  // console.log("data", data);

  const onClickRoomHandler = (id) => {
    setRoom = id;
  };

  if(isLoading) return <h3>Loading...</h3>
  if(isError) return <h3>Error...</h3>

  return (
    <>
    {
        data.map((item)=>{
          return <StContainer>
          <StImg src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' />
          <StState></StState>
          <StTitle
            key={item.id} 
            onClick={()=>onClickRoomHandler(item.id)}
            >{item.title}
          </StTitle>
        </StContainer>
        })
        
    }
      
    </>
  )
}

export default DmList

// sidebar에서 방을 클릭하면 방의 채팅룸 연결

const StContainer = styled.div`
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