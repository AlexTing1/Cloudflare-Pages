import React from 'react';
import './css/nav.css';

function NavBar() {

  return (
    <nav className="nav">
      <div className="iconLinks">
        <a href="https://www.linkedin.com/in/alexanderting1998/" className="websiteLink">
          <button type="button" className="linkedInButton">LinkedIn</button>
        </a>
        <a href="http://alexting.me" className="websiteLink">
          <button type="button" className="websiteButton">Portfolio Website</button>
        </a>
        <a href="https://github.com/AlexTing1" className="websiteLink">
          <button type="button" className="githubButton">Github</button>
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
