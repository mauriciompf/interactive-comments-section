import { useState } from "react";
import data from "../data.json";
import { createPortal } from "react-dom";

function Comments() {
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [commentsData, setCommentsData] = useState(data);

  const handleDeleteComment = () => {
    // Find if in one of elements has at least one replie in object
    const commentReplies = commentsData.comments.find(
      (e) => e.replies.length !== 0
    );

    // console.log(commentReplies);

    // Find if one of replies user is the current user
    const currentUserReplie = commentReplies?.replies.find(
      (e) => e.user.username === commentsData.currentUser.username
    );

    console.log(currentUserReplie?.id);

    // Filter the object replie from data

    // setCommentsData((prev) =>
    //   prev.comments.filter((e) => e.id === currentUserReplie?.id)
    // );

    // commentReplies?.replies.filter(
    //   (e) => e.user.username === commentsData.currentUser.username
    // );

    // console.log(comments);
  };

  return (
    <>
      {deletePopUp && (
        <div className="bg-neutral_white rounded-md p-6 mx-auto w-[90%] grid place-items-center absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
          <div className="grid gap-4">
            <h1 className="text-dark_blue font-bold text-xl">Delete comment</h1>
            <p className="text-dark_blue">
              Are you sure you want to delete this comment? This will remove the
              comment and can't be undone.
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => setDeletePopUp(false)}
                className="bg-dark_blue px-4 py-3 text-neutral_white rounded-md"
              >
                NO, CANCEL
              </button>

              <button
                onClick={handleDeleteComment}
                className="bg-soft_red px-4 py-3 text-neutral_white rounded-md"
              >
                YES, DELETE
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 mx-auto w-[90%]">
        {commentsData.comments.map((comment) => (
          <div
            key={comment.id}
            className="w-full p-4 bg-neutral_white rounded-md"
          >
            <div className="flex gap-4 items-center">
              <img className="w-[35px]" src={comment.user.image.png} alt="" />
              <span className="font-bold">{comment.user.username}</span>
              <span className="text-grayish_blue">{comment.createdAt}</span>
            </div>

            <p className="my-4 text-[16px] text-grayish_blue">
              {comment.content}
            </p>

            <div className="flex justify-between">
              <div className="flex items-center">
                <button className="bg-very_light_gray grid place-items-center h-[40px] w-[45px] rounded-md">
                  <img src="/icon-plus.svg" alt="" />
                </button>
                <span className="bg-very_light_gray h-[40px] w-[20px] text-moderate_blue grid place-items-center font-bold">
                  {comment.score}
                </span>
                <button className="bg-very_light_gray grid place-items-center h-[40px] w-[45px] rounded-md">
                  <img src="/icon-minus.svg" alt="" />
                </button>
              </div>
              <button className="flex gap-2 items-center">
                <div>
                  <img src="/icon-reply.svg" alt="" />
                </div>
                <span className="font-bold text-moderate_blue">Reply</span>
              </button>
            </div>
          </div>
        ))}

        <div className="relative">
          <div className="absolute bg-light_gray rounded-md h-full w-[3px]"></div>
          {commentsData.comments.map(
            (comment) =>
              comment.replies &&
              comment.replies.map((replie) => (
                <div
                  key={replie.id}
                  className="ml-auto w-[95%] p-4 bg-neutral_white rounded-md"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      className="w-[35px]"
                      src={replie.user.image.png}
                      alt=""
                    />

                    <div className="flex gap-2 items-center">
                      <span className="font-bold">{replie.user.username}</span>
                      {replie.user.username ===
                        commentsData.currentUser.username && (
                        <span className="bg-moderate_blue px-2  text-neutral_white text-[12px] rounded-sm">
                          you
                        </span>
                      )}
                    </div>
                    <span className="text-grayish_blue">
                      {replie.createdAt}
                    </span>
                  </div>

                  <p className="my-4 text-[16px] text-grayish_blue">
                    <span className="cursor-pointer text-moderate_blue font-bold">
                      @{replie.replyingTo}
                    </span>{" "}
                    {replie.content}
                  </p>

                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <button className="bg-very_light_gray grid place-items-center h-[40px] w-[45px] rounded-md">
                        <img src="/icon-plus.svg" alt="" />
                      </button>
                      <span className="bg-very_light_gray h-[40px] w-[20px] text-moderate_blue grid place-items-center font-bold">
                        {replie.score}
                      </span>
                      <button className="bg-very_light_gray grid place-items-center h-[40px] w-[45px] rounded-md">
                        <img src="/icon-minus.svg" alt="" />
                      </button>
                    </div>

                    {replie.user.username ===
                    commentsData.currentUser.username ? (
                      <div className="flex gap-4">
                        <button
                          onClick={() => setDeletePopUp(true)}
                          className="flex items-center gap-2 text-soft_red font-bold"
                        >
                          <div>
                            <img src="/icon-delete.svg" alt="" />
                          </div>
                          Delete
                        </button>
                        <button className="flex items-center gap-2 text-moderate_blue font-bold">
                          <div>
                            <img src="/icon-edit.svg" alt="" />
                          </div>
                          Edit
                        </button>
                      </div>
                    ) : (
                      <button className="flex gap-2 items-center">
                        <div>
                          <img src="/icon-reply.svg" alt="" />
                        </div>
                        <span className="font-bold text-moderate_blue">
                          Reply
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </>
  );
}
export default Comments;
