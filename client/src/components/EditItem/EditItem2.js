import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'


class EditItem extends Component{
    constructor(props){
        super(props)

        this.onChangeCodeAlpha = this.onChangeCodeAlpha.bind(this);
        this.onChangeCodeNumeric = this.onChangeCodeNumeric.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQty = this.onChangeQty.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.state = {
            itemcodealpha:'',
            itemcodenumeric:'',
            itemcode:'',
            description:'',
            qtyonhand:0,
            cost:0,
            price:0
        }
    }

    onChangeCodeAlpha(e){
        this.setState({
            itemcodealpha: e.target.value
        }, ()=>{
            this.setState({
                itemcode: `${this.state.itemcodealpha} - ${this.state.itemcodenumeric}`
            })
        })
    }

    onChangeCodeNumeric(e){
        this.setState({
            itemcodenumeric: e.target.value
        }, ()=>{
            this.setState({
                itemcode: `${this.state.itemcodealpha} - ${this.state.itemcodenumeric}`
            })
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
        axios.put('http://localhost:5000/items/:id', updateItem)
        .then(res => {
            alert(res.data)
            window.location = '/edit'
        })
    }

    onSearch(e){
        axios.get('http://localhost:5000/items/:id', {params:{itemcode:this.state.itemcode}})
            .then(res => {
                this.setState({
                    itemcode:res.data.itemcode,
                    description:res.data.description,
                    qtyonhand:res.data.qtyonhand,
                    cost:res.data.cost,
                    price:res.data.price
                })

                console.log(this.state.description)
            })
    }

    render(){
        return(
            <div className="text-center">
                <div className="text-center">
                    <b>Search Item Code (XX - ####) to Edit:</b>
                    <br />
                    <br />
                    <input 
                        type="text" 
                        pattern="[A-Z]{2}" 
                        maxlength="2"
                        size="2"
                        className="mx-2"
                        required
                        value={this.state.itemcodealpha}
                        onChange={this.onChangeCodeAlpha}
                    />
                    -
                    <input 
                        type="text" 
                        pattern="[0-9]{4}" 
                        maxlength="4"
                        size="4"
                        className="mx-2"
                        required
                        value={this.state.itemcodenumeric}
                        onChange={this.onChangeCodeNumeric}
                    />
                    <br />
                    <br />
                    <button
                        onClick={this.onSearch}>
                            Search
                    </button>
                    <hr />
                </div>
                {this.state.description === undefined &&
                    <b>There is no entry with that item code! Please try again!</b>
                }
                {this.state.description !== undefined && this.state.description.length >0 &&
                    <form onSubmit={this.onUpdate}>
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
                }
                
            </div>
        )
    }
}

export default EditItem;