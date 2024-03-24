const GameField = () => {
  return (
    <div className="gameField-container flex flex-col items-center">
      <h1>Player</h1>
      <h2 className="my-4">Game started!</h2>
      <div className="field grid grid-cols-3">
        <div className="field-el-1"></div>
        <div className="field-el-2"></div>
        <div className="field-el-3"></div>
        <div className="field-el-4"></div>
        <div className="field-el-5"></div>
        <div className="field-el-6"></div>
        <div className="field-el-7"></div>
        <div className="field-el-8"></div>
        <div className="field-el-9"></div>
      </div>
    </div>
  );
};

export default GameField;
