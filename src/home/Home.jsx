import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => (
  <div className="app">
    <div className="app-title">
      <p>@boomerrogers</p>
    </div>

    <div className="app-link">
      <Link to="/notebook">notebook</Link>
    </div>
    <div className="app-link">
      <a href="https://github.com/herman-rogers" target="_">github</a>
    </div>
    <div className="app-link">
      <a href="https://www.linkedin.com/in/herman-rogers-76513a32" target="_">linkedin</a>
    </div>
    <div className="app-link">
      <a href="https://www.npmjs.com/~face_mcgace" target="_">npm</a>
    </div>

    <div className="app-title">
      <p>projects</p>
    </div>

    <div className="app-link">
      <a href="https://www.gamebuildr.io" target="_">gamebuildr</a>
    </div>
  </div>
);

export default Home;
