import React, { Component } from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import NewsList from './components/NewsList';
import Card  from './components/Card';
class App extends Component {
  render() {
    return (
      <div className="App">
       <BrowserRouter>
      {/* <Nav/> */}
      <Routes>
        <Route path="/" element={<NewsList/>}/>
        <Route path="/card-swipe/:id" element={<Card/>}/>

      </Routes>
     </BrowserRouter>
     {/* <Footer/> */}
      </div>
    );
  }
}

export default App;
