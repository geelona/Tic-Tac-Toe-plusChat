import "./App.scss";
import Chat from "./components/chat/chat";
import GameField from "./components/gameField/gameField";
import Header from "./components/header/header";

function App() {
  return (
    <>
      <div className="container-and-border flex flex-col gap-0.5">
        <Header />
        <div className="playersBoard grid grid-cols-2 gap-0.5">
          <div className="firstUserSide">
            <GameField />
            <Chat />
          </div>
          <div className="secondUserSide">
            <GameField />
            <Chat />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
