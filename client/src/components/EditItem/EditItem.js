import React, {Component} from 'react';
import SearchBar from './SearchBar';
import Display from './Display';

class EditItem extends Component{
    constructor(props){
        super(props)

        this.handleCode = this.handleCode.bind(this);
        this.handleCost = this.handleCost.bind(this);
        this.handleDesc = this.handleDesc.bind(this);
        this.handleQty = this.handleQty.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.state = {
            editcode:'',
            editdesc:'',
            editqty:0,
            editcost:0,
            editprice:0
        }
    }


    // handleSearch = (cost) => {
    //     this.setState({
    //         editcost:cost
    //     })
    // }
    // handleSearch(e){
    //     this.setState({
    //         cost:e.target.value
    //     })
    // }
    
    handleCode(itemcode){
        this.setState({
            editcode:itemcode
        })
    }

    handleDesc(description){
        this.setState({
            editdesc:description
        })
    }

    handleCost(cost){
        this.setState({
            editcost:cost
        })
    }

    handleQty(qtyonhand){
        this.setState({
            editqty:qtyonhand
        })
    }

    handlePrice(price){
        this.setState({
            editprice:price
        })
    }


    render(){
        return(
            <div>
                <SearchBar 
                    onCodeEdit = {this.handleCode}
                    onDescriptionEdit={this.handleDesc}
                    onCostEdit={this.handleCost}
                    onQtyEdit={this.handleQty}
                    onPriceEdit={this.handlePrice} 
                />
                <Display 
                    itemcode={this.state.editcode}
                    cost={this.state.editcost}
                    price={this.state.editprice}
                    qty={this.state.editqty}
                    desc={this.state.editdesc}
                />
            </div>
        )
    }
}

export default EditItem;