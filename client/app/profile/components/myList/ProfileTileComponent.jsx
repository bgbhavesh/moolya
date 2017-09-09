import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

export default class ProfileTileComponent extends Component {

  render(){
    const users=this.props.data || [];

    return (
      <div className="col-md-12">
        {users.map( (data) => {
          let profileTypeMask='provider_mask';
          let profileTypeBlock='provider_block';
          let profileTypeImg='';
          let showImage=false;
          let communityType=data.communityCode;
          switch(communityType){
            case 'IDE':profileTypeBlock='ideator_block';profileTypeMask='ideator_mask'; break;
            case 'FUN':profileTypeBlock='provider_block';profileTypeMask='provider_mask';showImage=true;profileTypeImg='/images/funder_bg.png'; break;
            case 'STU':profileTypeBlock='provider_block';profileTypeMask='provider_mask';showImage=true;profileTypeImg='/images/provider_bg.png'; break;
            case 'CMP':profileTypeBlock='provider_block';profileTypeMask='provider_mask'; break;
            case 'SPS':profileTypeBlock='provider_block';profileTypeMask='provider_mask';showImage=true;profileTypeImg='/images/provider_bg.png'; break;
            case 'INS':profileTypeBlock='provider_block';profileTypeMask='provider_mask'; break;
          }
          return (
            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className={"list_block " + profileTypeBlock}>
                <div className={profileTypeMask}>
                  {showImage&&<img src={profileTypeImg} />}
                  <img src={data.profileImage?data.profileImage:'/images/img2.png'} />
                </div>
                <h3>{data.displayName}<br />
                  {data.countryName}</h3>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
