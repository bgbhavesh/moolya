import React, { Component } from 'react';
import AppointmentModal from './../AppointmentModal';

export default class SessionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedSlot: {}
    }
  }

  showAlert(slot) {
    this.setState({
      showModal: true,
      selectedSlot: slot
    })
  }

  render() {
    let slots = [];
    let slotIndex = -1;
    this.props.availableSlots.forEach((slot, index) => {
      if (index % 4 === 0) {
        slotIndex++;
        if (!slots[slotIndex])
          slots[slotIndex] = [];
      }
      slots[slotIndex].push(slot);
    });
    const currentDateString = new Date().toLocaleDateString();
    return (
      <div>
        <AppointmentModal
          message="Are you sure to reschedule the session?"
          onOkClick={() => { this.props.updateSession(this.state.selectedSlot); this.setState({ showModal: false, selectedSlot: {} }); }}
          onCancelClick={() => { this.setState({ showModal: false, selectedSlot: {} }) }}
          showModal={this.state.showModal}
        />
        <div>
          {
            !this.props.showLoading &&
            <div>
              <table className="table table-bordered">
                <tbody>
                  {
                    slots.map((list, index) => {
                      return (
                        <tr key={index}>
                          {
                            list.map((slot, i) => {
                              return (
                                <td key={i} onClick={() => { this.showAlert(slot) }}>
                                  {currentDateString} <br />
                                  {slot.slotTime}
                                </td>
                              );
                            })
                          }
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>

            </div>
          }
          {
            this.props.showLoading && <span> Loading...</span>
          }
        </div>
      </div >
    )
  }
}
