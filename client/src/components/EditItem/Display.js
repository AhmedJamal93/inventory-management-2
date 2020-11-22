import Axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom'



class Display extends Component{
    constructor(props){
        super(props)

        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQty = this.onChangeQty.bind(this);
        this.onUpdate = this.onUpdate.bind(this);

        this.state = {
            itemcode:this.props.itemcode,
            description:this.props.desc,
            qtyonhand:this.props.qty,
            cost:this.props.cost,
            price:this.props.price
        }
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

    onUpdate(e){
        e.preventDefault();
        const updateItem = {
            itemcode:this.state.itemcode,
            description:this.state.description,
            qtyonhand:this.state.qtyonhand,
            cost:this.state.cost,
            price:this.state.price
        }

        const params = {
            updateItem
        }
        Axios.put('http://localhost:5000/items/:id', {params})
    }


    render(){
        return(
            <div>
                <form 
                    onSubmit={this.onUpdate}
                    >
                    <div className="text-center">
                        <label> <b>Description:</b> </label>
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
                            value="Update"
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

export default Display;