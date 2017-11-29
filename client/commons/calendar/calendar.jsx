/**
 * Created by pankaj on 19/7/17.
 */

import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const formats = {
  dayRangeHeaderFormat: ({ start, end }, culture, local) => {
    const startDateFormat = start.getYear() == end.getYear() ? 'MMM DD' : 'MMM DD YYYY';
    return `${local.format(start, startDateFormat, culture)} — ${
      local.format(end, 'MMM DD YYYY', culture)}`
  },
  dayHeaderFormat: 'dddd MMM DD YYYY'
};


export default class Calender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: props.events ? props.events : [],
      date: props.date ? props.date : new Date(),
      dayData: props.dayData ? props.dayData : []
    };
  }

  componentWillReceiveProps(newPorps) {
    console.log(newPorps);
    this.setState({
      events: newPorps.events ? newPorps.events : [],
      dayData: newPorps.dayData ? newPorps.dayData : [],
      date: newPorps.date ? newPorps.date : new Date()
    });
  }

  eventComponent(event, element) {
    const component = this.props.eventComponent;
    if (component) {
      const data = {
        dayData: this.state.dayData ? this.state.dayData : [],
        calendar: event
      };
      const eventComponent = React.cloneElement(component, data);
      return (
        <div style={{ flexBasis: '14.2857%', maxWidth: '14.2857%' }}>
          {eventComponent}
        </div>
      );
    }
    return (
      <span>
        <span>{event.title}</span>
      </span>
    )
  }

  dateWrapper(date) {
    const component = this.props.dayBackgroundComponent;
    if (component) {
      const data = {
        dayData: this.state.dayData ? this.state.dayData : [],
        calendar: date
      };
      const dayComponent = React.cloneElement(component, data);
      return (
        <div style={{ flexBasis: '14.2857%', maxWidth: '14.2857%' }}>
          {dayComponent}
        </div>
      );
    }
    return (
      <div style={{ flexBasis: '14.2857%', maxWidth: '14.2857%' }}>
      </div>
    );
  }

  dateHeader(data) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const calDate = new Date(this.state.date);
    calDate.setHours(0, 0, 0, 0);
    const dayDate = new Date(data.date);
    dayDate.setHours(0, 0, 0, 0);
    const event = this.props.dateHeaderEvent ? this.props.dateHeaderEvent.bind(this, data.date) : data.onDrillDown;
    return (
      <a
        ref={(node) => {
          if (node) {
            if (today.getTime() === dayDate.getTime()) {
              node.style.setProperty('background', '#ef4647', 'important');
              node.style.setProperty('color', '#FFF', 'important');
            } else if (calDate.getMonth() !== dayDate.getMonth()) {
              node.style.setProperty('color', '#B9C5CC', 'important');
            }
          }
        }} href="" onClick={evt => event(evt)}>
        {data.label}
      </a>);
  }

  onNavigate(date) {
    if (this.props.onNavigate) {
      this.props.onNavigate(date);
    }
  }

  onView(view) {
    if (this.props.onViewChange) {
      this.props.onViewChange(view);
    }
  }

  render() {
    console.log('dayData', this.state.dayData);
    const that = this;
    return (
      <div className="col-md-12">
        <BigCalendar
          selectable
          formats={formats}
          views={['month', 'week', 'day']}
          events={that.state.events}
          defaultView='month'
          defaultDate={that.state.date}
          onNavigate={that.onNavigate.bind(that)}
          onView={that.onView.bind(that)}
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
}
