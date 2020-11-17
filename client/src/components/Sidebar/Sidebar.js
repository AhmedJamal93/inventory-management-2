import React, {Component} from 'react';
import './Sidebar.css';



class Sidebar extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal2">
                                Launch demo modal sideout small
                            </button>
                        </div>
                    </div>
                </div>


                
                <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                <div class="modal-dialog modal-dialog-slideout modal-sm" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal sideout small</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }

}

export default Sidebar;