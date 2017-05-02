import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import {fetchCommunitiesHandler} from '../actions/fetchCommunitiesActionHandler'
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';

export default class MlAppCommunitiesList extends Component {
    constructor(props){
        super(props);
        this.state={communities:[], popoverOpen:false, selectedCommunity:""}
        this.fetchCommunities.bind(this)
        this.setSelectedCommunity.bind(this)
        this.toggle.bind(this);
        return this;
    }

    componentDidMount(){
        this.fetchCommunities();
    }

    setSelectedCommunity(selCommunity, e){
        this.setState({selectedCommunity:selCommunity, popoverOpen : !(this.state.popoverOpen)})
    }

    toggle() {
        this.setState({popoverOpen: !this.state.popoverOpen});
    }

    async fetchCommunities() {
        const communities = await fetchCommunitiesHandler();
        this.setState({communities:communities})
        return communities;
    }

    render(){
        const data = this.state.communities || [];
        const list=  data.map((prop, idx) =>
            <div className="col-lg-2 col-md-4 col-sm-4" key={prop.code}>
                <div className="list_block">
                    {/*<div className={`cluster_status ${prop.isActive?"active":"inactive"}_cl `}></div>*/}
                        <a href="" onClick={this.setSelectedCommunity.bind(this, idx)} id={"selCommunity"+idx}>
                            <div className={"hex_outer"}>
                                <span className={prop.communityImageLink}></span>
                            </div>
                        </a>
                        <h3>{prop.name}</h3>
                </div>
            </div>
        );
        return(
            <div className="app_main_wrap">
                <div className="app_padding_wrap">
                    <h2>Select Community</h2>
                    {list}
                </div>
                <Popover placement="right" isOpen={this.state.popoverOpen} target={"selCommunity"+this.state.selectedCommunity} toggle={this.toggle.bind(this)}>
                    <PopoverContent>
                        <div>Srinag</div>
                    </PopoverContent>
                </Popover>
            </div>
        )
    }
}
