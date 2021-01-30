import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import profileImage from "../images/images.jpg";
import SideBarSmall from "../components/SideBarSmall";
import SideBar from "../components/SideBar";
import PostsComponent from "../components/PostsComponent";
import { getAllProfilePostsAction } from "../Actions/postsActions";
import { Form } from "react-bootstrap";
import Spinner from "../components/Spinner";
import axios from "axios";
import Cropper from "cropperjs";

// Global Variables
var cropper;
const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FlexItem1 = styled.div`
  flex: 0 0 50%;
  text-align: center;
  color: ${(props) => (props.postsOpen ? "rgb(29, 161, 242)" : "#777")};
  padding: 1rem 0rem;
  border-bottom: ${(props) =>
    props.postsOpen ? "solid 3px rgb(29, 161, 242)" : "none"};
  cursor: pointer;
`;
const FlexItem2 = styled.div`
  flex: 1;
  text-align: center;
  color: ${(props) => (props.repliesOpen ? "rgb(29, 161, 242)" : "#777")};
  padding: 1rem 0rem;
  cursor: pointer;
  border-bottom: ${(props) =>
    props.repliesOpen ? "solid 3px rgb(29, 161, 242)" : "none"};
`;

const NestedTypography = styled.span`
  font-size: 1.3rem;
  font-weight: 500;
`;
const Icon = styled.i`
  font-size: 3rem;
  color: rgba(0, 0, 0, 0.6);
  display: none;
  cursor: pointer;
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.4);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadContainer = styled.div`
  width: 32rem;
  background-color: #fff;
  border-radius: 10px;
`;

const AnotherFlexContainer = styled.div`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 2;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;

  &:hover ${Icon} {
    display: block;
  }
`;
const AnotherFlexContainer2 = styled.div`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover ${Icon} {
    display: block;
  }
`;

const AnotherNavContainer = styled.div`
  padding: 1.5rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px #e5e7eb;
`;

const ButtonContainer = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const SaveButton = styled.button`
  padding: 0.5rem 0.8rem;
  font-size: 1rem;
  color: #fff;
  border-radius: 10px;
  background-color: rgb(29, 161, 242);
  margin-right: 0.8rem;
  text-align: center;
  border: none;
  outline: none;
`;
const CancelButton = styled.button`
  padding: 0.5rem 0.8rem;
  font-size: 1rem;
  border-radius: 10px;
  color: #fff;
  background-color: #333;
  text-align: center;
  border: none;
  outline: none;
`;

const UploadButtonContainer = styled.div`
  display: flex;
  padding: 1.3rem;
  align-items: center;
  justify-cnontent: flex-start;
  border-bottom: 1px solid #e5e7eb;
`;

const ImageContainer = styled.div``;

const ProfileScreen = ({ match }) => {
  const [postsOpen, setPostsOpen] = useState(true);
  const [repliesOpen, setRepliesOpen] = useState(false);
  const [uploadProfileImageOpen, setUploadProfileImageOpen] = useState(false);
  const userLoginAndRegister = useSelector(
    (state) => state.userLoginAndRegister
  );
  const { user } = userLoginAndRegister;
  const dispatch = useDispatch();
  const profilePosts = useSelector((state) => state.profilePosts);
  const { userPosts, userReplyPosts, loading, profileUser } = profilePosts;
  const inPosts = postsOpen ? userPosts : userReplyPosts;
  const [Image, setImage] = useState("");
  const handlePostsClick = (e) => {
    e.preventDefault();
    setPostsOpen(true);
    setRepliesOpen(false);
  };
  const handleRepliesClick = (e) => {
    e.preventDefault();
    setRepliesOpen(true);
    setPostsOpen(false);
  };

  const onUploadProfileImage = () => {
    setUploadProfileImageOpen(true);
  };

  useEffect(() => {
    dispatch(getAllProfilePostsAction(match.params.id));
  }, [dispatch, match]);

  const onClose = () => {
    setUploadProfileImageOpen(false);
    setImage(false);
  };

  const uploadFileHandler = async (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
      let image = document.getElementById("profileImage");
      image.src = reader.result;
      if (cropper !== undefined) {
        cropper.destroy();
      }
      cropper = new Cropper(image, {
        aspectRatio: 1 / 1,
        background: false,
      });
      return cropper;
    };

    reader.readAsDataURL(e.target.files[0]);

    try {
    } catch (error) {
      console.error(error);
    }
  };

  const onUploadingProfileImage = async (e) => {
    try {
      let canvas = cropper.getCroppedCanvas();
      if (canvas !== null) {
        canvas = canvas.toBlob(async (blob) => {
          const formData = new FormData();
          formData.append("profileImageBlob", blob);
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
          const { data } = await axios.post(
            "/api/uploadImage",
            formData,
            config
          );
          setImage(data);
          console.log(Image);
          setUploadProfileImageOpen(false);
        });
      } else {
        console.log("Please upload an image");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      {!loading ? (
        <div style={{ minHeight: "100vh" }}>
          {user.id && user.id === profileUser._id && uploadProfileImageOpen && (
            <Container>
              <UploadContainer>
                <AnotherNavContainer>
                  <span className='text-2xl font-bold'>
                    Update your profile Image
                  </span>
                  <i
                    className='fas fa-times cursor-pointer text-red-500'
                    onClick={onClose}
                  ></i>
                </AnotherNavContainer>
                <UploadButtonContainer>
                  <div>
                    <Form.File
                      id='image-file'
                      onChange={uploadFileHandler}
                      custom
                    ></Form.File>
                  </div>
                </UploadButtonContainer>
                <ImageContainer>
                  <img
                    src={Image}
                    alt=''
                    className='profileImage'
                    id='profileImage'
                  />
                </ImageContainer>
                <ButtonContainer>
                  <SaveButton onClick={onUploadingProfileImage}>
                    Save
                  </SaveButton>
                  <CancelButton onClick={onClose}>Cancel</CancelButton>
                </ButtonContainer>
              </UploadContainer>
            </Container>
          )}

          <div
            className='h-screen flex overflow-hidden bg-white'
            data-todo-x-data='{ sidebarOpen: false }'
            data-todo-x-init="$watch('sidebarOpen', value => { if (value) { $nextTick(() => $refs.sidebar.focus()) } })"
            data-todo-at-keydown-window-escape='sidebarOpen = false'
          >
            <SideBar />
            <div className='flex flex-col min-w-0 flex-1 overflow-hidden'>
              <SideBarSmall />

              <div className='flex-1 relative z-0 flex overflow-hidden'>
                <main
                  className='flex-1 relative z-0 overflow-y-auto focus:outline-none'
                  tabIndex={0}
                  data-todo-x-data=''
                  data-todo-x-init='$el.focus()'
                >
                  <div>
                    <div style={{ display: "block", position: "relative" }}>
                      <img
                        className='h-32 w-full object-cover lg:h-48'
                        src={profileUser.coverImage}
                        alt=''
                      />
                      {user.id && user.id === profileUser._id && (
                        <AnotherFlexContainer2>
                          <Icon className='fas fa-camera'></Icon>
                        </AnotherFlexContainer2>
                      )}
                    </div>
                    <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
                      <div className='-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5'>
                        <div>
                          <div
                            style={{ position: "relative" }}
                            className='h-24 w-24 sm:h-32 sm:w-32'
                          >
                            <img
                              className='h-100 w-100 rounded-full ring-4 ring-white sm:h-32 sm:w-32'
                              src={profileUser.profileImage}
                              alt=''
                            />
                            {user.id && user.id === profileUser._id && (
                              <AnotherFlexContainer
                                onClick={onUploadProfileImage}
                              >
                                <Icon className='fas fa-camera'></Icon>
                              </AnotherFlexContainer>
                            )}
                          </div>
                        </div>
                        <div className='mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1'>
                          <div className='sm:hidden 2xl:block mt-6 min-w-0 flex-1'>
                            <h1 className='text-2xl font-bold text-gray-900 truncate'>
                              {profileUser.name}
                            </h1>
                            <span className='text-lg text-gray-600 '>
                              @
                              {profileUser.name.toLowerCase().replace(/ /g, "")}
                            </span>
                            <div className='flex items-center'>
                              <span className='text-md text-gray-600 mr-4'>
                                <span className='text-gray-900 font-bold'>
                                  5
                                </span>{" "}
                                Following
                              </span>
                              <span className='text-md text-gray-600'>
                                <span className='text-gray-900 font-bold'>
                                  1
                                </span>{" "}
                                Followers
                              </span>
                            </div>
                          </div>
                          <div className='mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4'>
                            {user.id !== profileUser._id && (
                              <button
                                type='button'
                                className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
                              >
                                <span>Follow</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className='hidden sm:block 2xl:hidden mt-2 min-w-0 flex-1'>
                        <h1 className='text-2xl font-bold text-gray-900 truncate'>
                          {profileUser.name}
                        </h1>
                        <span className='text-md text-gray-600 '>
                          @{profileUser.name.toLowerCase().replace(/ /g, "")}
                        </span>
                        <div className='flex items-center'>
                          <span className='text-md text-gray-600 mr-4'>
                            <span className='text-gray-900 font-bold'>5</span>{" "}
                            Following
                          </span>
                          <span className='text-md text-gray-600'>
                            <span className='text-gray-900 font-bold'>1</span>{" "}
                            Followers
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <FlexContainer>
                    <FlexItem1 onClick={handlePostsClick} postsOpen={postsOpen}>
                      <NestedTypography>Posts</NestedTypography>
                    </FlexItem1>
                    <FlexItem2
                      onClick={handleRepliesClick}
                      repliesOpen={repliesOpen}
                    >
                      <NestedTypography>Replies</NestedTypography>
                    </FlexItem2>
                  </FlexContainer>
                  <PostsComponent
                    posts={inPosts}
                    // content={content}
                    // setReply={setReply}
                    // replyState={replyState}
                    // content={content}
                    // setReplyState={setReplyState}
                  />
                </main>
                <aside className='hidden relative xl:flex xl:flex-col flex-shrink-0 w-60 border-l border-gray-200'></aside>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ minHeight: "100vh" }}>
          <Spinner />
        </div>
      )}
    </>
  );
};

export default ProfileScreen;
