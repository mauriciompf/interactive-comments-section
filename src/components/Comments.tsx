import { ChangeEvent, useState } from "react";
import data from "../data.json";

function Comments() {
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [inputComment, setInputComment] = useState(""); // @${replie.replyingTo} ${replie.content}
  const [currentId, setCurrentId] = useState<number | undefined>(0);

  const handleDeleteComment = () => {
    // Find if in one of elements has at least one replie in object
    const commentReplies = data.comments.find((e) => e.replies.length !== 0);

    // Find if one of replies user is the current user
    const currentUserReplie = commentReplies?.replies.find(
      (e) => e.user.username === data.currentUser.username
    );

    // Filter the object replie from data
    setCurrentId(currentUserReplie?.id);

    setDeletePopUp(false);
  };

  const handleEditComment = () => {
    setEditComment(true);
  };

  const handleChangeComment = (
    e: ChangeEvent<HTMLTextAreaElement>,
    replieTo: string
  ) => {
    const value = e.target.value;

    if (!value.startsWith(`@${replieTo} `)) return;

    setInputComment(value);
  };

  const handleUpdateComment = (replieTo: string) => {
    if (inputComment === `@${replieTo} `) return;

    setEditComment(false);
  };

  return (
    <>
      {/* Background overlay */}
      {deletePopUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
      )}

      {/* Delete popup */}
      {deletePopUp && (
        <div className="bg-neutral_white rounded-md p-6 mx-auto w-[90%] grid place-items-center fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 md:w-[20%]">
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

      {/* Main content */}
      <div
        className={`grid gap-4 mx-auto w-[90%] ${
          deletePopUp ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Comments */}
        {data.comments.map((comment) => (
          <div
            key={comment.id}
            className="w-full p-4 bg-neutral_white rounded-md flex items-start gap-6 relative pt-6"
          >
            <div className="grid ml-3 items-center max-md:hidden">
              <button className="bg-very_light_gray grid place-items-center h-[40px] w-[45px] rounded-tr-md rounded-tl-md">
                <img src="/icon-plus.svg" alt="" />
              </button>
              <span className="w-full bg-very_light_gray h-[40px]  text-moderate_blue grid place-items-center font-bold">
                {comment.score}
              </span>
              <button className="bg-very_light_gray grid place-items-center h-[40px] w-[45px] rounded-br-md rounded-bl-md">
                <img src="/icon-minus.svg" alt="" />
              </button>
            </div>

            <div>
              <div className="flex gap-4 items-center">
                <img className="w-[35px]" src={comment.user.image.png} alt="" />
                <span className="font-bold">{comment.user.username}</span>
                <span className="text-dark_blue">{comment.createdAt}</span>
              </div>

              <p className="my-4 text-[16px] text-grayish_blue">
                {comment.content}
              </p>
            </div>

            <button className="max-md:hidden flex items-center gap-4 absolute right-6">
              <img src="/icon-reply.svg" alt="" />
              <span className="font-bold text-moderate_blue">Reply</span>
            </button>

            <div className="flex justify-between md:hidden">
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

        {/*  Replies */}
        <div className="relative">
          <div className="absolute left-12 bg-light_gray rounded-md h-[93%] w-[3px]"></div>
          {data.comments.map(
            (comment) =>
              comment.replies &&
              comment.replies
                .filter((replie) => replie.id !== currentId)
                .map((replie) => (
                  <div
                    key={replie.id}
                    className="ml-auto w-[95%] md:w-[89%] p-4 bg-neutral_white rounded-md mb-4 md:flex items-start gap-6 relative md:pt-6"
                  >
                    <div className="grid ml-3 items-center max-md:hidden">
                      <button className="bg-very_light_gray grid place-items-center h-[40px] w-[45px] rounded-tr-md rounded-tl-md">
                        <img src="/icon-plus.svg" alt="" />
                      </button>
                      <span className="w-full bg-very_light_gray h-[40px]  text-moderate_blue grid place-items-center font-bold">
                        {comment.score}
                      </span>
                      <button className="bg-very_light_gray grid place-items-center h-[40px] w-[45px] rounded-br-md rounded-bl-md">
                        <img src="/icon-minus.svg" alt="" />
                      </button>
                    </div>

                    <div className="w-full">
                      <div className="flex gap-4 items-center">
                        <img
                          className="w-[35px]"
                          src={replie.user.image.png}
                          alt=""
                        />

                        <div className="flex gap-2 items-center">
                          <span className="font-bold">
                            {replie.user.username}
                          </span>
                          {replie.user.username ===
                            data.currentUser.username && (
                            <span className="bg-moderate_blue px-2  text-neutral_white text-[12px] rounded-sm">
                              you
                            </span>
                          )}
                        </div>
                        <span className="text-dark_blue">
                          {replie.createdAt}
                        </span>
                      </div>

                      {replie.user.username === data.currentUser.username &&
                      editComment ? (
                        <>
                          <textarea
                            maxLength={207}
                            rows={3}
                            className="mt-4 text-[16px] px-6 py-4 text-grayish_blue resize-none  w-full rounded-md border border-moderate_blue"
                            value={
                              inputComment ||
                              `@${replie.replyingTo} ${replie.content}`
                            }
                            onChange={(e) =>
                              handleChangeComment(e, replie.replyingTo)
                            }
                          ></textarea>
                          <button
                            onClick={() =>
                              handleUpdateComment(replie.replyingTo)
                            }
                            className="block mt-2 bg-moderate_blue text-neutral_white rounded-md py-2.5 px-7 w-fit ml-auto"
                          >
                            UPDATE
                          </button>
                        </>
                      ) : (
                        <p className="my-4 text-[16px] text-grayish_blue">
                          <span className="cursor-pointer text-moderate_blue font-bold">
                            @{replie.replyingTo}{" "}
                          </span>
                          {replie.user.username === data.currentUser.username
                            ? inputComment.replace(
                                `@${replie.replyingTo} `,
                                " "
                              ) || replie.content
                            : replie.content}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-between">
                      <div className="flex items-center md:hidden">
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

                      {replie.user.username === data.currentUser.username ? (
                        <div className="flex gap-6 absolute right-6">
                          <button
                            onClick={() => setDeletePopUp(true)}
                            className="flex items-center gap-2 text-soft_red font-bold"
                          >
                            <img src="/icon-delete.svg" alt="" />
                            Delete
                          </button>
                          <button
                            onClick={handleEditComment}
                            className="flex items-center gap-2 text-moderate_blue font-bold"
                          >
                            <img src="/icon-edit.svg" alt="" />
                            Edit
                          </button>
                        </div>
                      ) : (
                        <button className="max-md:hidden flex items-center gap-4 absolute right-6">
                          <img src="/icon-reply.svg" alt="" />
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
