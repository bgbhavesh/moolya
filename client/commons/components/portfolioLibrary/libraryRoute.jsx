import PortfolioLibrary from './PortfolioLibrary'
import React from 'react';

export default class  Library extends React.Component {
  constructor(props){
    super(props)
  }
render(){
  return(
    <div className="app_main_wrap">
      <div className="app_padding_wrap">
           <PortfolioLibrary client={this.props.client} isAdmin={false} />
      </div>
    </div>
  )
  }
}
