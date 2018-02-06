import React from 'react';
import { Route } from 'react-router-dom';
import Home from './home/Home';
import Notebook from './notebook/Notebook';

const App = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/notebook" component={Notebook} />
  </div>
);

export default App;
