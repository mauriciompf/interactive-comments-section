import { ChangeEvent, useState } from "react";
import data from "../data.json";

function UserComment() {
  const [comment, setComment] = useState("");

  const handleSendComment = () => {
    // Add new comment in display
  };

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  return (
    <div className="shadow-sm bg-neutral_white mt-2 py-6 px-6 rounded-md mx-auto w-[90%] md:flex items-start gap-4">
      <img
        className="w-[40px] max-md:hidden"
        src={data.currentUser.image.png}
        alt={data.currentUser.username}
      />
      <textarea
        maxLength={207}
        onChange={(e) => handleOnChange(e)}
        className="resize-none focus:border-moderate_blue focus-visible:border-moderate_blue hover:border-moderate_blue w-full border border-light_gray px-6 py-3 h-[75px] rounded-md placeholder:text-dark_blue"
        placeholder="Add a comment..."
      ></textarea>
      <div className="mt-2 md:mt-0 flex justify-between items-center">
        <img
          className="w-[30px] md:hidden"
          src={data.currentUser.image.png}
          alt={data.currentUser.username}
        />
        <button
          onClick={handleSendComment}
          className="bg-moderate_blue text-neutral_white rounded-md py-2.5 px-7"
        >
          SEND
        </button>
      </div>
    </div>
  );
}

export default UserComment;
