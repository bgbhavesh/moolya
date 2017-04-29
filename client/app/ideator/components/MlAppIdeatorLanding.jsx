import React from "react";
import {render} from "react-dom";
import ideatorListRoutes from '../actions/ideatorListRoutes';

export default class MlAppIdeatorLanding extends React.Component {
  constructor(props){
    super(props);
    this.state={
      ideators:[],
    }
  }
  componentDidMount() {
  }
  componentWillMount(){
    let ideators = [
      {
        _id:"bjnaksdhkjahskdhb",
        name:"Kranthi Kumar",
        membership:"Starter",
        Idea:"Penny Tracker Health Oriented",
        City:"Mumbai"
      },
      {
        _id:"ytmkjkjU8989guhuhuh",
        name:"Shikha Maheswar",
        membership:"Starter",
        Idea:"M-Aid Reducing Pollution in the City",
        City:"Delhi"
      },
      {
        _id:"mmkmllklkmlmlmjkl",
        name:"Kranthi Kumar",
        membership:"Premium",
        Idea:"Penny Tracker Health Oriented",
        City:"Mumbai"
      },
      {
        _id:"asasasawwasw2323ww",
        name:"Shikha Maheswar",
        membership:"Starter",
        Idea:"M-Aid Reducing Pollution in the City",
        City:"Delhi"
      },
    ]
    this.setState({ideators:ideators})
  }

  render() {
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <div className="col-md-12 ideators_list">
            <div className="row">
              {this.state.ideators.map(function (ideator, idx) {
                  return (
                    <div className="col-md-3 col-sx-3 col-sm-4 col-lg-3" key={idx}>
                      <a href={ideatorListRoutes.ideatorDetailsRoute(ideator._id, "ideator")}>
                        <div className="ideators_list_block">
                          <div className="premium"><span>{ideator.membership}</span></div>
                          <h3>{ideator.name}</h3>
                          <div className="list_icon"><span className="ml ml-ideator"></span></div>
                          <p>{ideator.Idea}<br/>...</p>
                          <div className="block_footer">
                            <span>{ideator.City}</span>
                          </div>
                        </div>
                      </a>
                    </div>
                  )
              })}

            </div>
          </div>
        </div>
      </div>
    )
  }
};
