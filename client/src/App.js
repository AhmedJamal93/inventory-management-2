import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Header2 from './components/Header/Header2';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import AddItem from './components/AddItem/AddItem';
import EditItem from './components/EditItem/EditItem2';
import DeleteItem from './components/DeleteItem/DeleteItem';

class App extends React.Component{
  constructor(props){
    super(props)


  }


  render(){
    return(
      <Router>
        <div>
        <Header2 />
        <Header />
        <Navbar />
        <Route path='/add' component={AddItem} />
        <Route path='/edit' component={EditItem} />
        <Route path='/delete' component={DeleteItem} />
      </div>
      </Router>
    )
  }
}

export default App;
