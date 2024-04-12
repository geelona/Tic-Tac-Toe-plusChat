import "./App.scss";
import Chat from "./components/chat/chat";
import GameField from "./components/gameField/gameField";
import Header from "./components/header/header";
import Timer from "./components/timer/timer";

function App() {
  return (
    <>
      <div className="container-and-border flex flex-col gap-0.5">
        <Header />
        <div className="playersBoard grid grid-cols-2 gap-0.5">
          <div className="firstUserSide">
            <GameField playerID={1} />
            <Chat PlayerID={1} />
          </div>
          <div className="secondUserSide">
            <GameField playerID={2} />
            <Chat PlayerID={2} />
          </div>
        </div>
        <Timer />
      </div>
    </>
  );
}

export default App;
