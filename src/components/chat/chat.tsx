const Chat = () => {
  return (
    <div className="chat-container">
      <div className="infoTab">
        <div className="playerIcon"></div>
        <p className="nickname">Player</p>
      </div>
      <div className="chatBox">
        <div className="messages"></div>
        <div
          className="sendMessageContainer
        "
        >
          <input type="text" placeholder="Message" />
          <button>
            <img src="/assets/sendMessage.png" alt="send button" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
