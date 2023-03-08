import React, { useRef, useState } from "react";
// import { useQuery } from "react-query";
// import { getProfile } from "../../../axios/api";
import { StProFile } from "../Header/HeaderStyled";
import * as Modal from "./ProfileModal";
import {
  StModalContent,
  StWhatModal,
  ProfileRowInput,
  ProfileRowBoxInput,
  ProfileRowBoxImage,
  ImageBox,
  ImageInput,
  ImageButton,
  AddressBox,
  OutlineMail,
  ModalButtonBox,
  ModalCloseButton,
  ModalFont,
  ModalEmailFont,
  ModalInput,
} from "./ProfileModalStyled";


function ProfileModalContent() {

  // 프로필 정보 가져오기
  // const { userData } = useQuery('getProfile', getProfile);
  // 이걸로 프로필 정보 채워주기
  // console.log(userData)

  // 파일 input타입 Ref
  const imageInput = useRef();

  // 프로필 사진 useState
  const [ image, setImage ] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')
  
  // 버튼 클릭시 input타입으로 클릭 포커스 => 버튼으로 UI커스텀
  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  // 파일 업로드 함수
  const onImageChange = (event) => {
    console.log(event.target.files[0])
    if(event.target.files[0]) {
      // 업로드한 파일로 useState 업데이트하고 axios로 서버에 보내주기
      setImage(event.target.files[0])
      
    } else {
      // 업로드를 안할 경우 기본으로 
      setImage('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')
    }
    // 화면에 업로드한 프로필 사진 표시
    const imageReader = new FileReader();
    imageReader.onload = () => {
      if(imageReader.readyState === 2) {
        setImage(imageReader.result)
      }
    }
    imageReader.readAsDataURL(event.target.files[0])
  }
  return (
    <Modal.Root>
      <Modal.Trigger asChild>
        <StProFile src={image}></StProFile>
      </Modal.Trigger>
      <Modal.Overlay />
      <StModalContent>
        <StWhatModal>
          <ModalFont fs="24px" fw="900">
            내 프로필 편집
          </ModalFont>
          <ProfileRowInput>
            <ProfileRowBoxInput>
              <ModalFont fs="20px" mt="10px">
                성명
              </ModalFont>
              <ModalInput wd="300px" hg="35px" />
              <ModalFont fs="20px" mt="10px">
                별명
              </ModalFont>
              <ModalInput wd="300px" hg="35px" />
            </ProfileRowBoxInput>
            <ProfileRowBoxImage>
              <ModalFont fs="20px" mt="10px">
                프로필 사진
              </ModalFont>
              <ImageBox src={image}/>
              <ImageInput 
                type="file" 
                ref={imageInput}
                acccept='image/*'
                onChange={onImageChange}/>
              <ImageButton onClick={onClickImageUpload}>
                프로필 업로드
              </ImageButton>
            </ProfileRowBoxImage>
          </ProfileRowInput>
          <br />
          <ProfileRowBoxInput>
            <ModalFont fs="20px">연락처 정보</ModalFont>
            <AddressBox>
              <OutlineMail />
              <div>
                <ModalFont fs="16px">이메일 주소</ModalFont>
                <ModalEmailFont fc="#1E88B6" hg="20px">
                  Test@naver.com
                </ModalEmailFont>
              </div>
            </AddressBox>
          </ProfileRowBoxInput>
        </StWhatModal>
        <ModalButtonBox>
          <Modal.Close asChild>
            <ModalCloseButton bc="#1B1D21" oc="#525357">
              취소
            </ModalCloseButton>
          </Modal.Close>
          <ModalCloseButton bc="#007A5A" oc="#007A5A">
            변경사항 저장
          </ModalCloseButton>
        </ModalButtonBox>
      </StModalContent>
    </Modal.Root>
  );
}


export default ProfileModalContent;
