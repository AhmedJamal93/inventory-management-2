import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom'


class Supplier extends Component{
    constructor(props){
        super(props)
        this.onLocationChange = this.onLocationChange.bind(this)
        this.onNameChange = this.onNameChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            name:'',
            location:''
        }
    }

    onNameChange(e){
        this.setState({
            name:e.target.value
        })
    }

    onLocationChange(e){
        this.setState({
            location:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const newSupplier = {
            name:this.state.name.toLowerCase(),
            location:this.state.location
        }

        axios.get('http://localhost:5000/supplier/add', {params:{name:newSupplier.name, location:newSupplier.location}})
        .then(res => {
            console.log(res.data)
            if (res.data.rowCount > 0){
                alert('Supplier already exists')
            } else{
                axios.post('http://localhost:5000/supplier/add', newSupplier)
                alert('Item Successfully Added')
                window.location = '/receipt'
            }
        })
        .catch(err => {
            console.log(err.message)
        })

    }


    render(){
        return(
            <div>
            <h4 className="text-center"> <b>Add New Supplier</b> </h4>
            <hr />
            <form onSubmit={this.onSubmit}>
                <div className="text-center">
                    <label> <b>Name:</b> </label>
                    <br />
                    <input 
                        type="text" 
                        className="mx-2"
                        maxlength="30"
                        size="30"
                        required
                        value={this.state.name}
                        onChange={this.onNameChange}/>
                    <hr />
                </div>
                <div className="text-center">
                    <label> <b>Address:</b> </label>
                    <br />
                    <input 
                        type="text" 
                        className="mx-2"
                        maxlength="30"
                        size="30"
                        required
                        value={this.state.location}
                        onChange={this.onLocationChange}/>
                    <hr />
                </div>
                
                <div className="text-center">
                    <input 
                        type="submit"
                        value="Add Supplier"
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

export default Supplier;