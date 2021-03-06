import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import './AddItem.css'

class AddItem extends Component{
    constructor(props){
        super(props)

        this.onChangeCodeAlpha = this.onChangeCodeAlpha.bind(this);
        this.onChangeCodeNumeric = this.onChangeCodeNumeric.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeQty = this.onChangeQty.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            itemcodealpha:'',
            itemcodenumeric:'',
            itemcode:'',
            description:'',
            qtyonhand:null,
            cost:null,
            price:null,
            errorAdd:false,
            errorCode:'',
        }
    }


    onChangeCodeAlpha(e){
        this.setState({
            itemcodealpha: e.target.value
        })
    }

    onChangeCodeNumeric(e){
        this.setState({
            itemcodenumeric: e.target.value
        })
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        })
    }

    onChangeQty(e){
        this.setState({
            qtyonhand: e.target.value
        })
    }

    onChangeCost(e){
        this.setState({
            cost: e.target.value
        })
    }

    onChangePrice(e){
        this.setState({
            price: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const newItem = {
            itemcode: `${this.state.itemcodealpha} - ${this.state.itemcodenumeric}`,
            description: this.state.description,
            qtyonhand: this.state.qtyonhand,
            cost: this.state.cost,
            price: this.state.price,
        }
    
    // Method #1
    
    //     axios.post('http://localhost:5000/add', newItem)
    //     .then(function(response){
    //         console.log(response.data)
    //         if (response.data.code === '23505'){
    //             alert('Item Code Already In Use')
    //         } else {
    //             alert('Item Successfully Added to Inventory')
    //             window.location = '/add'
    //         }
    //         return response.data.code;
    //     })
    //     .catch(function(error){
    //         console.log(error.message)
    //     })
    
    // Method #2

        axios.get('http://localhost:5000/add', {params:{itemcode:newItem.itemcode}})
        .then(res => {
            console.log(res.data)
            if (res.data.rowCount > 0){
                alert('Item Code Already In Use')
            } else{
                axios.post('http://localhost:5000/add', newItem)
                alert('Item Successfully Added')
                window.location = '/add'
            }
        })
        .catch(err => {
            console.log(err.message)
        })
    }
        

    render(){
        return(
            <div>
                <h4 className="text-center"> <b>Add New Item</b> </h4>
                <hr />
                <form onSubmit={this.onSubmit}>
                    <div className="text-center">
                        <label> <b>Item Code: (XX - ####)</b> </label>
                        <br />
                        <input 
                            type="text" 
                            pattern="[A-Z]{2}" 
                            maxlength="2"
                            size="2"
                            className="mx-2"
                            required
                            value={this.state.itemcodealpha}
                            onChange={this.onChangeCodeAlpha}/>
                        -
                        <input 
                            type="text" 
                            pattern="[0-9]{4}" 
                            maxlength="4"
                            size="4"
                            className="mx-2"
                            required
                            value={this.state.itemcodenumeric}
                            onChange={this.onChangeCodeNumeric}/>
                        <hr />
                    </div>
                    <div className="text-center">
                        <label> <b>Descriptions:</b> </label>
                        <br />
                        <input 
                            type="text" 
                            className="mx-2"
                            maxlength="30"
                            size="30"
                            required
                            value={this.state.description}
                            onChange={this.onChangeDescription}/>
                        <hr />
                    </div>
                    <div className="text-center">
                        <label> <b>Quantity On Hand:</b> </label>
                        <br />
                        <input 
                            type="number" 
                            className="mx-2"
                            min="0"
                            required
                            value={this.state.qtyonhand}
                            onChange={this.onChangeQty}/>
                        <hr />
                    </div>
                    <div className="text-center">
                        <label> <b>Cost:</b> </label>
                        <br />
                        <input 
                            type="number" 
                            className="mx-2"
                            min="0"
                            step=".01"
                            required
                            value={this.state.cost}
                            onChange={this.onChangeCost}/>
                        <hr />
                    </div>
                    <div className="text-center">
                        <label> <b>Price:</b> </label>
                        <br />
                        <input 
                            type="number" 
                            className="mx-2"
                            min="0"
                            step=".01"
                            required
                            value={this.state.price}
                            onChange={this.onChangePrice}/>
                        <hr />
                    </div>
                    <div className="text-center">
                        <input 
                            type="submit"
                            value="Create Item"
                            className="mx-2 mb-4"
                            />
                        
                            <Link to="/" className="mx-2 mb-4">
                                <a >Cancel</a>
                            </Link>
                        
                    </div>
                </form>
            </div>
        )
    }
}

export default AddItem;