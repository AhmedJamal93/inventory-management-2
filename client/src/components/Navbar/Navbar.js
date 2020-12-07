import React, {Component} from 'react';
import './Navbar.css'
import {Link} from 'react-router-dom'

class Navbar extends Component{
    constructor(props){
        super(props)

        this.onAddNewItem = this.onAddNewItem.bind(this);
    }

    onAddNewItem(e){
        window.location = '/add'
    }

    onEditItem(e){
        window.location = '/edit'
    }

    onDeleteItem(e){
        window.location = '/delete'
    }

    onReceiptTxn(e){
        window.location = '/receipt'
    }

    onIssueTxn(e){
        window.location = '/issue'
    }

    render(){
        return(
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item"> 
                            <Link to='/'><a class="nav-link" href="#">Home</a></Link>
                        </li>
                        <li class="nav-item"> 
                            <a class="nav-link" href="#" data-toggle="modal" data-target="#exampleModal2">Master File</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-toggle="modal" data-target="#exampleModal3">Transaction</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-toggle="modal" data-target="#exampleModal4">Reports</a>
                        </li>
                    </ul>
                </div>


                <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                <div class="modal-dialog modal-dialog-slideout modal-sm" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Master File</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <Link to='/add' ><a href="#" data-dismiss="modal" onClick={this.onAddNewItem} >Add New Item</a></Link>
                        <hr />
                        <Link to='/edit' ><a href="#" data-dismiss="modal" onClick={this.onEditItem} >Edit an Item</a></Link>
                        <hr />
                        <Link to='/add' ><a href="#" data-dismiss="modal" onClick={this.onDeleteItem} >Delete an Item</a></Link>
                        <hr />
                    </div>
                    </div>
                </div>
                </div>

                <div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel3" aria-hidden="true">
                <div class="modal-dialog modal-dialog-slideout modal-sm" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Transactions</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <Link to='/receipt' ><a href="#" data-dismiss="modal" onClick={this.onReceiptTxn} >Receipt Transaction</a></Link>
                        <hr />
                        <Link to='/receipt' ><a href="#" data-dismiss="modal" onClick={this.onIssueTxn} >Issue Transaction</a></Link>
                        <hr />
                        <a href="#">Return Transaction</a>
                        <hr />
                    </div>
                    </div>
                </div>
                </div>

                <div class="modal fade" id="exampleModal4" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel4" aria-hidden="true">
                <div class="modal-dialog modal-dialog-slideout modal-sm" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Reports</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <a href="#">Master List</a>
                        <hr />
                        
                    </div>
                    </div>
                </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;