import React, {Component} from 'react';
import axios from 'axios';
import './AddOrder.css';

class AddOrder extends Component{
    constructor(props){
        super(props)

        this.onChangeCodeAlpha = this.onChangeCodeAlpha.bind(this);
        this.onChangeCodeNumeric = this.onChangeCodeNumeric.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onChangeQty = this.onChangeQty.bind(this);
        this.state = {
            itemcodealpha:'',
            itemcodenumeric:'',
            itemcode:'',
            description:'',
            qtyonhand:0,
            cost:0,
            price:0,
            qtyadded:0,
            totalqty:0,
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

    onChangeQty(e){
        e.preventDefault();
        

        this.setState({
            qtyadded:e.target.value,
            qtyonhand:this.state.qtyonhand
        }, () => {

            if(this.state.qtyadded === '' || this.state.qtyadded === undefined){
                this.setState({
                    qtyonhand:this.state.qtyonhand
                })
            }

            let onHand = parseInt(this.state.qtyonhand)
            let added = parseInt(e.target.value)
            let total = onHand+added
            this.setState({
                totalqty:total
            }, () => {
                this.props.onQuantityChange(this.state.totalqty, e)
                
                
            })
        })
    }

    onSearch(e){
        e.preventDefault();
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
            .then(() => {
                this.props.onCodeEdit(this.state.itemcode, e)
                // this.props.onDescriptionEdit(this.state.description, e)
                // this.props.onQtyEdit(this.state.qtyonhand)
                // this.props.onCostEdit(this.state.cost, e)
                // this.props.onPriceEdit(this.state.price, e)  
            })
    }

    render(){
        return(
            <div>
                <table className='ml-auto mr-auto'>
                    <tr>
                        <th style={{'border-spacing':'10px'}}>Itemcode</th>
                        <th style={{padding:'10px'}}>Valid/Not Valid</th>
                        <th>Description</th>
                        <th>Quantity On Hand</th>
                        <th>Quantity Added</th>
                    </tr>
                    <tr>
                        <td>
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
                            <button
                                onClick={this.onSearch}>
                                    Search
                            </button>
                        </td>
                        <td>
                            {this.state.description === undefined && 
                                <p>Please Enter a Valid Itemcode!</p>
                            }
                            {this.state.description === '' &&
                                <p>Please Enter a Valid Itemcode!</p>
                            }
                            {this.state.description !== undefined && this.state.description.length >0 &&
                                <p>Valid Itemcode!</p>
                            }
                        </td>
                        <td>
                            {this.state.description === undefined && 
                                <p>-</p>
                            }
                            {this.state.description === '' &&
                                <p>-</p>
                            }
                            {this.state.description !== undefined && this.state.description.length >0 &&
                                <p>{this.state.description}</p>
                            }
                        </td>
                        <td>
                            {this.state.description === undefined && 
                                <p>-</p>
                            }
                            {this.state.description === '' &&
                                <p>-</p>
                            }
                            {this.state.description !== undefined && this.state.description.length >0 &&
                                <p>{this.state.qtyonhand}</p>
                            }
                        </td>
                        <td>
                            {this.state.description !== undefined && this.state.description.length >0 &&
                                <input 
                                    type="number" 
                                    className="mx-2"
                                    min="0"
                                    required
                                    id={this.state.itemcode}
                                    value={this.state.qtyadded}
                                    onChange={this.onChangeQty}/>
                            }
                        </td>
                    </tr>
                </table>
                <hr />
            </div>
        )
    }
}

export default AddOrder;