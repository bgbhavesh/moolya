import React, { Component, PropTypes } from 'react';
import Confirm from '../../../commons/components/confirmcomponent/Confirm';

export default class StepZilla extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPreviousBtn: false,
            showNextBtn: true,
            showFinishBtn: false,
            compState: this.props.startAtStep,
            navState: this._getNavStates(0, this.props.steps.length),
            nextStepText: 'Next',
            finishStepText:'Save'
        };

        this.hidden = {
            display: 'none'
        };

        this.jumpToStep = this._jumpToStep.bind(this);
        this.handleKeyDown = this._handleKeyDown.bind(this);
        this.next = this._next.bind(this);
        this.finish = this._finish.bind(this);
        this.previous = this._previous.bind(this);
    }

    _getNavStates(indx, length) {
        let styles = [];

        for (let i=0; i<length; i++) {
            if (i < indx) {
                styles.push('done');
            }
            else if (i === indx) {
                styles.push('doing');
            }
            else {
                styles.push('todo');
            }
        }

        return { current: indx, styles: styles }
    }

    _checkNavState(currentStep){
        if (currentStep > 0 && currentStep !== this.props.steps.length - 1) {
            let correctNextText = 'Next';

            if (currentStep == this.props.steps.length - 2) {
                // we are in the one before final step
                correctNextText = this.props.nextTextOnFinalActionStep
            }

            this.setState({
                showPreviousBtn: true,
                showNextBtn: true,
                showFinishBtn: false,
                nextStepText: correctNextText
            });
        }
        else if (currentStep === 0 ) {
            this.setState({
                showPreviousBtn: false,
                showNextBtn: true,
                showFinishBtn: false
            });
        }
        else {
            this.setState({
                showPreviousBtn: (this.props.prevBtnOnLastStep) ? true : false,
                showNextBtn: false,
                showFinishBtn: true
            });
        }
    }

    _setNavState(next) {
        this.setState({navState: this._getNavStates(next, this.props.steps.length)});

        if (next < this.props.steps.length) {
            this.setState({compState: next});
        }

        this._checkNavState(next);
    }

    // handles keydown on enter being pressed in any Child component input area. in this case it goes to the next
    _handleKeyDown(evt) {
        if (evt.which === 13) {
            if (!this.props.preventEnterSubmission) {
                this._next();
            }
        }
    }

    // this utility method lets Child components invoke a direct jump to another step
    _jumpToStep(evt) {
        if (evt.currentTarget == undefined) {
            // a child step wants to invoke a jump between steps
            this._setNavState(evt);
        }
        else {
            // the main navigation step ui is invoking a jump between steps
            if (!this.props.stepsNavigation) {
                evt.preventDefault();
                evt.stopPropagation();

                return;
            }

            if (this.props.dontValidate || typeof this.refs.activeComponent.isValidated == 'undefined' || this.refs.activeComponent.isValidated() ) {
                if (evt.currentTarget.value === (this.props.steps.length - 1) &&
                    this.state.compState === (this.props.steps.length - 1)) {
                    this._setNavState(this.props.steps.length);
                }
                else {
                    this._setNavState(evt.currentTarget.value);
                }
            }
        }
    }

  _next() {
    // if its a form component, it should have implemeted a public isValidated class. If not then continue

    if (this.props.dontValidate || typeof this.refs.activeComponent.isValidated == 'undefined' || this.refs.activeComponent.isValidated()) {
      this._setNavState(this.state.compState + 1);
    }
  }
  _finish(){
    if ((typeof this.refs.activeComponent.isFinished())||this.refs.activeComponent.isValidated()){
      // alert("thank you")
      //this._setNavState(this.props.steps.length -this.props.steps.length);

        }

    }

    _previous() {
        if (this.state.compState > 0) {
            this._setNavState(this.state.compState - 1);
        }
    }

    _getClassName(className, i){
        let liClassName = className + "-" + this.state.navState.styles[i];

        // if step ui based navigation is disabled, then dont highlight step
        if (!this.props.stepsNavigation)
            liClassName += " no-hl";

        return liClassName;
    }

    _renderSteps() {
        return this.props.steps.map((s, i)=> (
            <li className={this._getClassName("progtrckr", i)} onClick={this.jumpToStep} key={i} value={i}>
                <em>{i+1}</em>
                <span className="step_name"><b>{this.props.steps[i].name}</b></span>
              {this.props.steps[i].icon?<b className="step_icon">{this.props.steps[i].icon}</b>:<b className="step_icon"></b>}
            </li>
        ));
    }

  /*
  * Triggered in registration step wizard
  * custom prompt will be thrown if user want to stay in that page
  * */
  onConfirm() { //on click of okay
    // Preform your action.
    this._setNavState(this.state.compState+1);

  }
  onCancel() {  //on click of cancel
    // Preform your action.
    this._setNavState(this.state.compState);
  }

    render() {
        // clone the step component dynamically and tag it as activeComponent so we can validate it on next. also bind the jumpToStep piping method
        const compToRender = React.cloneElement(this.props.steps[this.state.compState].component, {
            ref: 'activeComponent',
            jumpToStep: (t) => {
                this.jumpToStep(t);
            }
        });


        return (
            <div className="multi-step full-height" onKeyDown={this.handleKeyDown}>

                {
                    this.props.showSteps
                        ? <ol className="progtrckr">
                        {this._renderSteps()}
                    </ol>
                        : <span></span>
                }

                {compToRender}

                <div style={this.props.showNavigation ? {} : this.hidden} className="footer-buttons">
                  {this.props.showConfirm?<div>
                    <Confirm
                    onConfirm={this.onConfirm.bind(this)}
                    onCancel = {this.onCancel.bind(this)}
                    cancel = {true}
                    body="Changes made won't save.Do you want to continue??"
                    confirmText="Ok"
                    title="Alert">
                    <button style={this.state.showNextBtn ? {} : this.hidden}
                            className="step_form_btn pull-right"
                            onClick={this.next}>{this.state.nextStepText}</button>
                    </Confirm>
                    <button style={this.state.showPreviousBtn ? {} : this.hidden}
                                     className="step_form_btn pull-left"
                                     onClick={this.previous}>Prev</button>
                    <button style={this.state.showFinishBtn ? {} : this.hidden}
                            className="step_form_btn pull-right"
                            onClick={this.finish}>{this.state.finishStepText}</button></div>:<div>
                    <button style={this.state.showNextBtn ? {} : this.hidden}
                                      className="step_form_btn pull-right"
                                      onClick={this.next}>{this.state.nextStepText}</button>
                    <button style={this.state.showPreviousBtn ? {} : this.hidden}
                    className="step_form_btn pull-left"
                    onClick={this.previous}>Prev</button>
                    <button style={this.state.showFinishBtn ? {} : this.hidden}
                    className="step_form_btn pull-right"
                            onClick={this.finish}>{this.state.finishStepText}</button></div>}



                </div>
            </div>
        );
    }
}

StepZilla.defaultProps = {
    showSteps: true,
    showNavigation: true,
    stepsNavigation: true,
    prevBtnOnLastStep: true,
    dontValidate: false,
    preventEnterSubmission: false,
    startAtStep: 0,
    nextTextOnFinalActionStep: "next"
};
