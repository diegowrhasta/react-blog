import './Header.css';

export function Header() {
  return (
    <header>
      <div className="header-container">
        <h3>Diego Balderrama</h3>
        <nav>
          <a href="#recent">Recent</a>
          <a href="#all">All</a>
          <a href="#about">About</a>
          <a href="#">Mode</a>
        </nav>
      </div>
      <div className="title">
        THE BLOG
      </div>
    </header>
  );
}
