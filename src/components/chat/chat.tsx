import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { useEffect, useRef, useState } from "react";
import { addMessage } from "../../state/chat/chatSlice";

const Chat = ({ PlayerID }: { PlayerID: number }) => {
  const dispatch = useDispatch();
  const playerIconRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const inputMessageRef = useRef<HTMLInputElement>(null);

  const messages = useSelector((state: RootState) => state.chat.messages);
  const firstPlayerSymbol = useSelector(
    (state: RootState) => state.gameField.firstPlayerSymbol
  );

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    messageContainerRef.current!.innerHTML = messages
      .map((message) => {
        return `
        <div class="selfmessage--${PlayerID === Number(message[0])}">
        <p >${
          message[1]
        }</p>
        <p class="message-time">${message[2]}</p>
        </div>`;
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
    if (inputValue.trim() === "") {
      return;
    }
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const timeString = `${hours < 10 ? "0" + hours : hours}:${ minutes < 10 ? "0" + minutes : minutes}`;
    dispatch(
      addMessage({ message: [PlayerID, inputValue, timeString] })
    );
    setInputValue("");
  }

  document.onkeydown = (e) => {
    if (e.key === "Enter") {
      if (document.activeElement === inputMessageRef.current) {
        handleSendMessage();
      }
    }
  };

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
          <input ref={inputMessageRef} type="text" placeholder="Message" value={inputValue} onChange={(e) => {setInputValue(e.target.value)}} />
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
