import React from 'react';
import './style.css';

export default function Header({black}) {
 return (
    <header className={black ? 'black' : ''}>
        <div className="header--logo">
            <a href= "/">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="NetflixLogo"/>
            </a>
        </div>
        <div className="header--user">
            <a href="/">
                <img src="https://i.pinimg.com/564x/c3/53/7f/c3537f7ba5a6d09a4621a77046ca926d--soccer-quotes-lineman.jpg" alt="userLogo"/>
            </a>
        </div>
    </header>
  );
}