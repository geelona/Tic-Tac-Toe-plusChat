import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { useEffect, useRef } from "react";
import { addMessage } from "../../state/chat/chatSlice";

const Chat = ({ PlayerID }: { PlayerID: number }) => {
  const dispatch = useDispatch();
  const playerIconRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const messages = useSelector((state: RootState) => state.chat.messages);
  const firstPlayerSymbol = useSelector(
    (state: RootState) => state.gameField.firstPlayerSymbol
  );

  useEffect(() => {
    messageContainerRef.current!.innerHTML = messages
      .map((message) => {
        return `<p class="selfmessage--${PlayerID === Number(message[0])}">${
          message[1]
        }</p>`;
      })
      .join("");
  }, [messages]);

  useEffect(() => {
    if (
      (PlayerID === 1 && firstPlayerSymbol === "x") ||
      (PlayerID === 2 && firstPlayerSymbol === "o")
    ) {
      playerIconRef.current!.innerHTML = "X";
    } else if (
      (PlayerID === 1 && firstPlayerSymbol === "o") ||
      (PlayerID === 2 && firstPlayerSymbol === "x")
    ) {
      playerIconRef.current!.innerHTML = "O";
    } else {
      playerIconRef.current!.innerHTML = "";
    }
  }, [firstPlayerSymbol]);

  function handleSendMessage() {
    if (messageInputRef.current!.value.trim() === "") {
      return;
    }
    dispatch(
      addMessage({ message: [PlayerID, messageInputRef.current!.value] })
    );
    messageInputRef.current!.value = "";
  }

  return (
    <div className="chat-container">
      <div className="infoTab">
        <div ref={playerIconRef} className="playerIcon"></div>
        <p className="nickname">Player</p>
      </div>
      <div className="chatBox">
        <div ref={messageContainerRef} className="messages"></div>
        <div
          className="sendMessageContainer
        "
        >
          <input ref={messageInputRef} type="text" placeholder="Message" />
          <button>
            <img
              src="/assets/sendMessage.png"
              alt="send button"
              onClick={handleSendMessage}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
