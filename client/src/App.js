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
import ReceiptTxn from './components/ReceiptTxn/ReceiptTxn';
import Supplier from './components/Supplier/Supplier';
import IssueTxn from './components/IssueTxn/IssueTxn';




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
          <Route path='/receipt' component={ReceiptTxn} />
          <Route path='/issue' component={IssueTxn} />
          <Route path='/supplier/add' component={Supplier} />
        </div>
      </Router>
    )
  }
}

export default App;
