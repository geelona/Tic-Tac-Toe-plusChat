const Header = () => {
  return (
    <header className="header-container flex items-center justify-evenly py-6">
      <div className="score-container flex items-center gap-4 text-3xl">
        <p>
          Score: <span className="firstPlayerScore">0</span>:
          <span className="secondPlayerScore">0</span>
        </p>
        <button className="score-container__reset-button text-sm">Reset</button>
      </div>
    </header>
  );
};

export default Header;
