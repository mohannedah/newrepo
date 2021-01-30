import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import profileImage from "../images/images.jpg";
import SideBar from "../components/SideBar";
import SideBarSmall from "../components/SideBarSmall";
import Spinner from "../components/Spinner";
import PostsComponent from "../components/PostsComponent";
import { postUserAction, getAllPostsAction } from "../Actions/postsActions";
const NavContainer = styled.div`
  padding: 1rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px #e5e7eb;

  @media only screen and (max-width: 1024px) {
    display: none;
  }
`;

const AnotherNavContainer = styled.div`
  padding: 1.5rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px #e5e7eb;
`;

const PostContainer = styled.div`
  display: flex;
  padding: 1.5rem;
  border-bottom: solid 5px #e5e7eb;
`;

const ImageContainer = styled.div`
  flex: 0 0 8%;

  @media only screen and (max-width: 700px) {
    flex: 0 0 15%;
  }
`;

const Image = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextFieldContainer = styled.div`
  flex: 1;
`;

const TextField = styled.textarea`
  border: none;
  outline: none;
  padding: 0rem 1rem;
  margin-bottom: 1rem;
  border: none;
  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none;
`;

const Button = styled.button`
  font-size: 1rem;
  text-align: center;
  color: white;
  border-radius: 250px;
  padding: 0.5rem 0.8rem;
  width: 75px;
  background-color: rgb(29, 161, 242);
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

const ReplyContainer = styled.div`
  width: 32rem;
  background-color: #fff;
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ReplyButton = styled.button`
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

const HomeScreen = () => {
  const dispatch = useDispatch();
  const getAllPosts = useSelector((state) => state.getAllPosts);
  const userPost = useSelector((state) => state.userPost);
  const userLikePost = useSelector((state) => state.userLikePost);
  const userRetweetPost = useSelector((state) => state.userRetweetPost);
  const userReplyPost = useSelector((state) => state.userReplyPost);
  const { post: replyPost } = userReplyPost;
  const { post: retweet } = userRetweetPost;
  const { post: like } = userLikePost;
  const { post } = userPost;
  const { posts, loading } = getAllPosts;
  const [content, setContent] = useState("");
  const [reply, setReply] = useState(false);
  const [replyState, setReplyState] = useState(false);
  const onClose = () => {
    setReply(false);
  };
  useEffect(() => {
    dispatch(getAllPostsAction());
  }, [dispatch, like, post, retweet, replyPost]);
  const onPost = (e) => {
    dispatch(postUserAction(content));
    e.preventDefault();
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div style={{ minHeight: "100vh", position: "relative" }}>
            {reply && (
              <Container>
                <ReplyContainer>
                  <AnotherNavContainer>
                    <span className='text-2xl font-black'>Reply</span>
                    <i
                      className='fas fa-times cursor-pointer text-red-500'
                      onClick={onClose}
                    ></i>
                  </AnotherNavContainer>
                  <PostContainer style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <ImageContainer style={{ flex: "0 0 12%" }}>
                      <Image src={profileImage} />
                    </ImageContainer>
                    <TextFieldContainer>
                      <Form>
                        <TextField
                          value={content}
                          style={{ fontSize: "1.2rem", fontWeight: "400" }}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder='Type your Reply'
                        />
                      </Form>
                    </TextFieldContainer>
                  </PostContainer>
                  <ButtonContainer>
                    <ReplyButton onClick={(e) => setReplyState(true)}>
                      Reply
                    </ReplyButton>
                    <CancelButton onClick={onClose}>Cancel</CancelButton>
                  </ButtonContainer>
                </ReplyContainer>
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
                    <NavContainer>
                      <span className='text-2xl font-black'>Home</span>
                      <img
                        src='https://img.icons8.com/ios/50/4a90e2/shooting-stars.png'
                        style={{ height: "2rem" }}
                        alt='Shooting Stars'
                      />
                    </NavContainer>
                    <PostContainer>
                      <ImageContainer>
                        <Image src={profileImage} />
                      </ImageContainer>
                      <TextFieldContainer>
                        <Form>
                          <TextField
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder='Write Something.....'
                          />
                          <Button onClick={onPost}>Post</Button>
                        </Form>
                      </TextFieldContainer>
                    </PostContainer>
                    <PostsComponent
                      posts={posts}
                      content={content}
                      setReply={setReply}
                      replyState={replyState}
                      content={content}
                      setReplyState={setReplyState}
                    />
                  </main>
                  <aside className='hidden relative xl:flex xl:flex-col flex-shrink-0 w-60 border-l border-gray-200'></aside>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
