import React, {Component} from 'react';
import Datepicker from 'react-date-picker';


class Header2 extends Component{
    constructor(props){
        super(props)

        this.state = {
            curTime : new Date(),
        }
    }


    render(){
        return(
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <Datepicker 
                            value={this.state.curTime}
                            disableCalendar="true"
                            disabled="true"
                            clearIcon=""/>
                    </div>
                    <div className="text-right">
                        User ID:
                    </div>
                </nav>
            </div>
        )
    }
}

export default Header2;