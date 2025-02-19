import React, { useEffect, useState } from "react";
import classes from "./Feed.module.scss";
import { RightSidebar } from "../../components/RightSidebar/RightSidebar";
import { LeftSidebar } from "../../components/LeftSidebar/LeftSidebar";
import { Button } from "../../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../../authentication/contexts/AuthenticationContextProvider";
import { Post } from "../../components/Post/Post";
import { Modal } from "../../components/Modal/Modal";
export function Feed() {
  const navigate = useNavigate();
  const authContext = useAuthentication();
  const [showPostingModal, setShowPostingModal] = useState(false);
  const [feedContent, setFeedContent] = useState<"all" | "connecxions">(
    "connecxions"
  );
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL +
            "/api/v1/feed" +
            (feedContent === "connecxions" ? "" : "/posts"),
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          const { message } = await response.json();
          throw new Error(message);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occured. Please try again later.");
        }
      }
    };
    fetchPosts();
  }, [feedContent]);
  const user = authContext?.user;
  function handlePost(content: string, picture: string): Promise<void> {
    throw new Error("Function not implemented.");
  }

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <LeftSidebar />
      </div>
      <div className={classes.center}>
        <button
          onClick={() => {
            navigate(`/profile/${user?.id}`);
          }}
        >
          <img
            className={`${classes.top} ${classes.avatar}`}
            src={user?.profilePicture || "/avatar.png"}
            alt=""
          />
        </button>
        <Button outline onClick={() => setShowPostingModal(true)}>
          start a post
        </Button>
        <Modal
          onSubmit={handlePost}
          showModal={showPostingModal}
          setShowModal={setShowPostingModal}
          title={""}
        />
      </div>
      <div className={classes.right}>
        <RightSidebar />
      </div>
      {error && <div className={classes.error}>{error}</div>}
      <div className={classes.header}>
        <button
          className={feedContent === "all" ? classes.active : ""}
          onClick={() => setFeedContent("all")}
        >
          All
        </button>
        <button
          className={feedContent === "connecxions" ? classes.active : ""}
          onClick={() => setFeedContent("connecxions")}
        >
          Feed
        </button>
      </div>
      <div className={classes.feed}>
        {posts.map((post) => (
          <Post key={post.id} post={post} setPosts={setPosts} />
        ))}
      </div>
    </div>
  );
}
