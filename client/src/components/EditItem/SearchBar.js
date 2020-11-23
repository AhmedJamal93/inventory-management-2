import axios from 'axios';
import React, {Component} from 'react';

class SearchBar extends Component{
    constructor(props){
        super(props)
        
        this.onChangeCodeAlpha = this.onChangeCodeAlpha.bind(this);
        this.onChangeCodeNumeric = this.onChangeCodeNumeric.bind(this);
        this.onSearch = this.onSearch.bind(this);
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

    // onSearch(e){
    //     console.log(this.state.itemcode)

    //     const test = axios.get('http://localhost:5000/items/:id', {params:{itemcode:this.state.itemcode}})
    //     .then(res => {
    //         this.setState({
    //             cost:res.data.cost
    //         })
    //     })
        
    //     // this.setState({
    //     //     itemcode: `${this.state.itemcodealpha} - ${this.state.itemcodenumeric}`,
    //     // }, () => {
    //     //     console.log(this.state.itemcode)
    //     //     const test = axios.get('http://localhost:5000/items/:id', {params:{itemcode:this.state.itemcode}})
    //     //     .then(res => {
    //     //         return res.data
    //     //         // this.setState({
    //     //         //     cost:res.data.cost
    //     //         // })
    //     //     })
    //     // console.log(test)
    //     // })
        
        

    // }

    onSearch(e){
        // const getItem = axios.get('http://localhost:5000/items/:id', {params:{itemcode:this.state.itemcode}})
        //                 .then(res => {
        //                     return res.data.cost
        //                 })
        
        // this.setState({
        //     cost:getItem
        // }, () => {console.log(this.state.cost)})



        axios.get('http://localhost:5000/items/:id', {params:{itemcode:this.state.itemcode}})
            .then(res => {
                this.setState({
                    itemcode:res.data.itemcode,
                    description:res.data.description,
                    qtyonhand:res.data.qtyonhand,
                    cost:res.data.cost,
                    price:res.data.price
                })
            })
            .then(() => {
                this.props.onCodeEdit(this.state.itemcode)
                this.props.onDescriptionEdit(this.state.description)
                this.props.onQtyEdit(this.state.qtyonhand)
                this.props.onCostEdit(this.state.cost)
                this.props.onPriceEdit(this.state.price)      
            })

            console.log(this.state.description)
    }

    render(){
        return(
            <div>
                <b>Search Item Code (XX - ####) to Edit:</b>
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
                <hr />
            </div>
        )
    }
}

export default SearchBar;