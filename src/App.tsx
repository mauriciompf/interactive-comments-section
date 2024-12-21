import data from "./data.json";

function App() {
  return (
    <main>
      <div className="">
        {/* COMMENTS */}
        <div className="grid gap-4 mx-auto w-[90%]">
          {data.comments.map((comment) => (
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
            {data.comments.map(
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
                        <span className="font-bold">
                          {replie.user.username}
                        </span>
                        {replie.user.username === data.currentUser.username && (
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

                      {replie.user.username === data.currentUser.username ? (
                        <div className="flex gap-4">
                          <button className="flex items-center gap-2 text-soft_red font-bold">
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

        {/* ADD A COMMENT */}
        <div></div>
      </div>
    </main>
  );
}

export default App;
