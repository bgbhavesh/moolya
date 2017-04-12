import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import {findIdeatorLibraryActionHandler} from '../../actions/findPortfolioIdeatorDetails'
import {dataVisibilityHandler, OnLockSwitch,initalizeFloatLabel} from '../../../../utils/formElemUtil';


export default class MlPortfolioIdeatorLibraryView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolioIdeatorInfo: {}
    }
    this.fetchPortfolioInfo.bind(this);

  }
  componentDidMount()
  {
    OnLockSwitch();
    dataVisibilityHandler();
    this.fetchPortfolioInfo();
    initalizeFloatLabel();
  }

  async fetchPortfolioInfo(){
    const response = await findIdeatorLibraryActionHandler(this.props.portfolioDetailsId);
    if(response){
      this.setState({portfolioIdeatorInfo : response});
    }

  }

  render(){
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <div className="main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
              <div className="row requested_input">
                <div className="in-page-controls"></div>
                <div className="col-lg-12">
                  <article className="content">
                    <section className="inner">
                      <p>"My God!" he said, as I drew him in.</p>

                      <p>"What has happened?" I asked.
                        <img src={this.state.portfolioIdeatorInfo.fileType}/></p>
                      <p>"What hasn't?"  In the obscurity I could see he made a gesture of despair.  "They wiped us out--simply wiped us out," he repeated again and again.</p>

                      <p>He followed me, almost mechanically, into the dining room.</p>

                      <p>"Take some whiskey," I said, pouring out a stiff dose.</p>

                      <p>He drank it.  Then abruptly he sat down before the table, put his head on his arms, and began to sob and weep like a little boy, in a perfect passion of emotion, while I, with a curious forgetfulness of my own recent despair, stood beside him, wondering.</p>

                      <p>It was a long time before he could steady his nerves to answer my questions, and then he answered perplexingly and brokenly.  He was a driver in the artillery, and had only come into action about seven.  At that time firing was going on across the common, and it was said the first party of Martians were crawling slowly towards their second cylinder under cover of a metal shield.</p>

                      <p>Later this shield staggered up on tripod legs and became the first of the fighting-machines I had seen.  The gun he drove had been unlimbered near Horsell, in order to command the sand pits, and its arrival it was that had precipitated the action.  As the limber gunners went to the rear, his horse trod in a rabbit hole and came down, throwing him into a depression of the ground.  At the same moment the gun exploded behind him, the ammunition blew up, there was fire all about him, and he found himself lying under a heap of charred dead men and dead horses.</p>

                      <p>"I lay still," he said, "scared out of my wits, with the fore quarter of a horse atop of me.  We'd been wiped out.  And the smell--good God!  Like burnt meat!  I was hurt across the back by the fall of the horse, and there I had to lie until I felt better.  Just like parade it had been a minute before--then stumble, bang, swish!"</p>
                    </section>
                  </article>
                </div>
              </div>
            </ScrollArea>
          </div>



        </div>


      </div>


    )
  }
}
