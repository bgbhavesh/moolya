import React from "react";
import {render} from "react-dom";
import {fetchIdeaActionHandler} from '../actions/IdeaActionHandler'

export default class MlIdeatorRelatedIdeas extends React.Component {

  constructor(props) {
    super(props);
    this.state = {loading:true,ideas:[]};
    this.fetchIdeatorIdeas.bind(this)
    return this;
  }

  componentDidMount() {
  }
  componentWillMount(){
    this.fetchIdeatorIdeas();
  }
  async fetchIdeatorIdeas() {
    const response = await fetchIdeaActionHandler();
    if(response){
      this.setState({loading:false, ideas:response})
    }
  }

  selectedIdea(ideaId, portfolioId, e){
    FlowRouter.go('/app/ideator/'+portfolioId);
  }

  render() {
    let that = this;
    return (
      <div className="related_buttons">
        <ul>
          {that.state.ideas.map(function (idea, idx) {
            return (
              <li onClick={that.selectedIdea.bind(that, idea._id, idea.portfolioId)} key={idx}><a href=""><span
                className="ml flaticon-ml-handshake"></span><br />{idea.title}</a></li>
            )
          })}
        </ul>
      </div>
    )
  }
};
