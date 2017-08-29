/**
 * Created by pankaj on 19/7/17.
 */

import React,{ Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

export default class Calender extends Component {

  constructor (props) {
    super(props);
    this.state = {
      events: props.events ? props.events : [],
      date : props.date ? props.date : new Date()
    };
  }

  componentWillReceiveProps(newPorps){
    this.setState({
      events: newPorps.events ? newPorps.events : [],
      date : newPorps.date ? newPorps.date : new Date()
    });
  }

  eventComponent(event, element) {
    let component = this.props.eventComponent;
    if(component){
      let data = {
        dayData: this.props.dayData ? this.props.dayData : [],
        calendar: event
      };
      let eventComponent = React.cloneElement(component, data);
      return (
        <div style={{flexBasis: "14.2857%", maxWidth: "14.2857%"}}>
          {eventComponent}
        </div>
      );
    } else {
      return (
        <span>
          <span>{event.title}</span>
        </span>
      )
    }
  }

  dateWrapper(date){
    let component = this.props.dayBackgroundComponent;
    if(component) {
      let data = {
        dayData: this.props.dayData ? this.props.dayData : [],
        calendar: date
      };
      let dayComponent = React.cloneElement(component, data);
      return (
        <div style={{flexBasis: "14.2857%", maxWidth: "14.2857%"}}>
          {dayComponent}
        </div>
      );
    } else {
      return (
        <div style={{flexBasis: "14.2857%", maxWidth: "14.2857%"}}>
        </div>
      );
    }
  }

  dateHeader(data){
    let event = this.props.dateHeaderEvent ? this.props.dateHeaderEvent.bind(this, data.date) : data.onDrillDown;
    return <a href="" onClick={(evt)  => event(evt)}>{data.label}</a>;
  }

  onNavigate(date){
    if(this.props.onNavigate){
      this.props.onNavigate(date);
    }
  }

  render() {
    const that = this;
    return (
      <div className="col-md-12">
        <BigCalendar
          selectable
          views={['month', 'week', 'day']}
          events={that.state.events}
          defaultView='month'
          defaultDate={that.state.date}
          onNavigate={that.onNavigate.bind(that)}
          components={{
            event: that.eventComponent.bind(this),
            dateCellWrapper: that.dateWrapper.bind(this),
            dateHeader: that.dateHeader.bind(this)
          }}
          popup
        />
      </div>
    )
  }
};
