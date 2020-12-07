import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import IssueOrder from './IssueOrder';

function findCode(array, attr, val) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][attr] === val) {
        return i;
      }
    }
  }

class IssueTxn extends Component{
    constructor(props){
        super(props)

        this.onChangeSupplierId = this.onChangeSupplierId.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.onTotalQuantity = this.onTotalQuantity.bind(this)
        this.onHowManyChange = this.onHowManyChange.bind(this)
        this.onChangeCode = this.onChangeCode.bind(this)
        this.onChangeId = this.onChangeId.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            Suppid:null,
            Transid:null,
            id:null,
            name:'',
            location:'',
            date:new Date(),
            totalqty:0,
            howmanychange:1,
            newitemcode:'',
            neworders:[],
            description:'',
            cost:0,
            price:0,
            qtyonhand:0,
        }
    }
    
    onChangeSupplierId(e){
        this.setState({
            Suppid:e.target.value
        })
    }

    onSearch(e){
        axios.get('http://localhost:5000/supplier/:id', {params:{id:this.state.Suppid}})
            .then(res => {
                this.setState({
                    name:res.data.name,
                    location:res.data.location,
                })
            })
    }

    onTotalQuantity(qty, event){
        if(this.state.neworders.some((order) => order.itemcode === event.target.id)){
            let orders = [...this.state.neworders]
            let index = findCode(orders, 'itemcode', event.target.id)
            orders.splice(index,1)

            this.setState({
                neworders:orders
            }, () => {
                this.setState({
                    neworders:[...this.state.neworders, {'itemcode':event.target.id, 'quantity':qty}]
                }, () => {
                    console.log(this.state.neworders)
                })
            })
        } else {
            this.setState({
                neworders:[...this.state.neworders, {'itemcode':event.target.id, 'quantity':qty}]
            }, () => {
                console.log(this.state.neworders)
            })
        }
    }

    onHowManyChange(e){
        if(e.target.value === ''){
            this.setState({
                howmanychange:1
            })
        }else{
            this.setState({
                howmanychange:parseInt(e.target.value)
            })
        }
    }

    onChangeCode(itemcode){
        this.setState({
            newitemcode:itemcode
        })
    }

    onChangeId(id){
        this.setState({
            id:id
        })
    }

    onSubmit(e){
        e.preventDefault();
        const info = {
            date:this.state.date,
            supplier:this.state.Suppid
        }

        axios.post('http://localhost:5000/receipt/:id', info)
        .then(res => {
            console.log(res.data)
            this.setState({
                Transid:res.data.id
            })
        })
        .then(() => {
            const orders = [...this.state.neworders]
            for(let i=0; i<orders.length;i++){
                this.setState({
                    newitemcode:orders[i].itemcode,
                    totalqty:orders[i].quantity
                }, () => {
                    const newtrans = {
                        transaction:this.state.Transid,
                        itemcode:this.state.newitemcode,
                        quantity: this.state.totalqty
                    }
                    
                    axios.post('http://localhost:5000/transaction/:id', newtrans)
                    axios.put('http://localhost:5000/transaction/update/:id', newtrans)
                })
            }
        })
    }

    render(){
        return(
            <div className='text-center'>
                <h4 className="text-center"> <b>Issue Transaction</b> </h4>
                <Link to='/supplier/add'>Add New Supplier</Link>
                <div className="text-center">
                    <b>Search Supplier Code:</b>
                    <br />
                    <br />
                    <input 
                        type="text" 
                        pattern="[0-9]" 
                        // maxlength="2"
                        size="5"
                        className="mx-2"
                        required
                        value={this.state.Suppid}
                        onChange={this.onChangeSupplierId}
                    />
                    <br />
                    <br />
                    <button
                        onClick={this.onSearch}>
                            Search
                    </button>
                    <hr />
                </div>
                {this.state.name === undefined &&
                    <b>There is no supplier with that ID! Please try again!</b>
                }
                {this.state.name !== undefined && this.state.name.length >0 &&
                    <form 
                        onSubmit={this.onSubmit}
                        className='text-center'>
                        <table 
                            className='center ml-auto mr-auto'>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                            </tr>
                            <tr>
                                <td>{this.state.name}</td>
                                <td>{this.state.location}</td>
                            </tr>
                        </table>
                        <hr />
                        <div id='date'>
                            <label> <b>Date:</b> </label>
                            <br />
                            <label>{this.state.date.getDate()}</label>
                            -
                            <label>{this.state.date.getMonth()}</label>
                            -
                            <label>{this.state.date.getFullYear()}</label>
                        </div>
                        <hr />
                        <input
                            type='number'
                            value={this.state.howmanychange}
                            onChange={this.onHowManyChange}
                            min='1' />
                        <hr />
                        {[...Array(this.state.howmanychange)].map((elementInArray, index) => ( 
                            <div className="" key={index}>
                                    <IssueOrder
                                        onCodeEdit={this.onChangeCode}
                                        onQuantityChange={this.onTotalQuantity}
                                        onIdChange={this.onChangeId}
                                    />   
                            </div>
                        ))}
                        <div className="text-center">
                            <input 
                                type="submit"
                                value="Confirm"
                                className="mx-2 mb-4"
                            />
                            <Link to="/" className="mx-2 mb-4">
                                <a >Cancel</a>
                            </Link>
                        </div>
                    </form>
                }
            </div>
        )
    }
}

export default IssueTxn;