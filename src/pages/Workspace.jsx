import React from 'react'
import Chat from '../component/features/Chat/Chat'
import Header from '../component/ui/Header/Header';
import styled from 'styled-components';

function WorkSpace() {
  return (
    <>
      <StHeaderBox>
        <Header />
      </StHeaderBox>
      <StChatBox>
        <Chat />
      </StChatBox>
    </>
  )
}

export default WorkSpace;

const StHeaderBox = styled.div`
  position: relative;
  z-index: 1;
`;

const StChatBox = styled.div`
  z-index: 0;
  position: fixed;
  box-sizing: border-box;
  top: 0px;
  right: 0px;
  height: 100%;
  width: 100%;
`;