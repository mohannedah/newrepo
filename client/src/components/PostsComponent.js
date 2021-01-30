import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  likePostAction,
  replyPostAction,
  retweetPost,
} from "../Actions/postsActions";

const UsersPostContainer = styled.div`
  display: flex;
  padding: 1rem;
  border-bottom: solid 1px #e5e7eb;
  @media only screen and (max-width: 500px) {
    padding: 1rem 0.5rem;
  }
`;

const ImageContainer = styled.div`
  flex: 0 0 8%;

  @media only screen and (max-width: 600px) {
    flex: 0 0 12%;
  }
  @media only screen and (max-width: 400px) {
    flex: 0 0 15%;
  }
`;

const Image = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const TypographyContainer = styled.div`
  flex: 1;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.4rem;
`;
const Name = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  margin-right: 0.4rem;
  @media only screen and (max-width: 400px) {
    font-size: 0.8rem;
    margin-right: 0.2rem;
  }
`;

const UserName = styled.span`
  font-size: 0.8rem;
  color: #777;
  margin-right: 0.4rem;
  @media only screen and (max-width: 400px) {
    font-size: 0.7rem;
  }
`;

const PostDate = styled.span`
  font-size: 0.8rem;
  color: #777;
  @media only screen and (max-width: 400px) {
    font-size: 0.7rem;
  }
`;

const Text = styled.p`
  font-size: 1rem;
  align-self: flex-start;
  margin-bottom: 0.8rem;
  @media only screen and (max-width: 400px) {
    font-size: 0.8rem;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Notification = styled.span`
  font-size: 1rem;
  margin-left: 0.1rem;
`;

const RetweetData = styled.div`
  font-size: 0.8rem;
  color: #777;
  font-weight: 500;
  margin-right: 0.4rem;
  @media only screen and (max-width: 400px) {
    font-size: 0.7rem;
  }
`;

const Icon = styled.i``;

const PostsComponent = ({
  posts,
  setReply,
  setReplyState,
  replyState,
  content,
}) => {
  const dispatch = useDispatch();
  const userLoginAndRegister = useSelector(
    (state) => state.userLoginAndRegister
  );

  const [postID, setPostId] = useState("");

  const { user } = userLoginAndRegister;
  const timeDifference = (current, previous) => {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + " months ago";
    } else {
      return Math.round(elapsed / msPerYear) + " years ago";
    }
  };

  useEffect(() => {
    if (replyState) {
      dispatch(replyPostAction(content, postID));
      setReplyState(false);
      setReply(false);
    }
    // eslint-disaple-next-line
  }, [replyState, setReplyState, dispatch, content, postID, setReply]);

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => (
          <UsersPostContainer>
            <ImageContainer>
              <Image src={post.user.profileImage} />
            </ImageContainer>
            <TypographyContainer>
              {post.retweetData && (
                <RetweetData>
                  <Icon className='fas fa-retweet cursor-pointer mr-1'></Icon>
                  <UserName>
                    Retweeted by @
                    {post.retweetData.user.name.toLowerCase().replace(/ /g, "")}
                  </UserName>
                </RetweetData>
              )}
              {post.replyTo && (
                <RetweetData>
                  <Icon className='far fa-comment cursor-pointer mr-1'></Icon>
                  <UserName>
                    Replying to @
                    {post.replyTo.user.name.toLowerCase().replace(/ /g, "")}
                  </UserName>
                </RetweetData>
              )}
              <NameContainer>
                <Name>{post.user.name}</Name>
                <UserName>
                  @{post.user.name.toLowerCase().replace(/ /g, "")}
                </UserName>
                <PostDate>
                  {timeDifference(new Date(), new Date(post.createdAt))}
                </PostDate>
              </NameContainer>
              <Text>
                {post.content
                  ? post.content
                  : post.retweetData.content
                  ? post.retweetData.content
                  : ""}
              </Text>
              <IconsContainer>
                <IconContainer>
                  <Icon
                    onClick={(e) => {
                      setReply(true);
                      setPostId(post._id);
                    }}
                    className='far fa-comment cursor-pointer hover:text-blue-400'
                  ></Icon>
                </IconContainer>
                <IconContainer>
                  <Icon
                    className={
                      post.retweetUsers.includes(user.id)
                        ? "fas fa-retweet cursor-pointer text-green-500"
                        : "fas fa-retweet cursor-pointer hover:text-green-500"
                    }
                    onClick={(e) => dispatch(retweetPost(post._id))}
                  ></Icon>
                  {post.retweetUsers.includes(user.id) ? (
                    <Notification className='text-green-500 cursor-pointer'>
                      {post.retweetUsers.length}
                    </Notification>
                  ) : (
                    <></>
                  )}
                </IconContainer>
                <IconContainer>
                  <Icon
                    className={
                      post.likes.includes(user.id)
                        ? "far fa-heart cursor-pointer text-red-500"
                        : "far fa-heart cursor-pointer hover:text-red-500"
                    }
                    onClick={(e) => dispatch(likePostAction(post._id))}
                  ></Icon>
                  {post.likes.includes(user.id) ? (
                    <Notification className='text-red-500 cursor-pointer'>
                      {post.likes.length}
                    </Notification>
                  ) : (
                    <></>
                  )}
                </IconContainer>
              </IconsContainer>
            </TypographyContainer>
          </UsersPostContainer>
        ))
      ) : (
        <h1>No posts yet</h1>
      )}
    </>
  );
};

export default PostsComponent;
