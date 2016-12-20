import React from 'react';

Step3=React.createClass({


  getInitialState: function() {
    this.state = {
      remarks: '',
      referedBy: '',
      upload:'',
    };
     //   this.validationCheck = this._validationCheck.bind(this);
        this.isFinished = this._isFinished.bind(this);

        return this;
    },
    _isFinished(){

        var step3={
            "remarks":$('#remarks').val(),
            "referedBy":$('#referedBy').val(),
            "upload":$('#upload').val()

        }
        localStorage.setItem( 'step3', JSON.stringify(step3) );

      Meteor.call('insertUser', function (err, resp) {
        if(err){
          alert("not saved")
        }else{
          alert("saved")
        }
      });
      return true;

    },


    render() {

        return (
            <div className="step3">
                <div className="row">
                    <form id="Form" className="form-horizontal center">
                        <div className="form-group col-md-12">


                            <label className="control-label col-md-4">
                              Remarks
                            </label>
                            <div >
                                <input ref="remarks" id="remarks" autoComplete="off" type="text" placeholder="" className="form-control"    />
                            </div>
                            <label className="control-label col-md-4">

                                How did you know about this?
                            </label>
                            <div >
                                <select  autoComplete="off" id="referedBy" className="form-control"   >
                                    <option value="0">friends/collegues reference</option>
                                    <option value="1">google/searching</option>
                                    <option value="2">newspaper</option>
                                    <option value="3">hoarding</option>
                                    <option value="4">event</option>
                                    <option value="5">radio</option>
                                    <option value="6">i over heard it</option>
                                </select>

                            </div>

                            <label className="control-label col-md-4">
                               Upload documents
                            </label>
                            <div >
                                <input ref="upload" id="upload" autoComplete="off" type="file" placeholder="" className="form-control"    />
                            </div>
                        </div>



                    </form>
                </div>

            </div>

        )
    }
});


