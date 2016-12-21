import React from 'react';

Step3=React.createClass({


  getInitialState: function() {
    this.state = {
      remarks: '',
      refferedBy: '',
      upload:'',
    };
     //   this.validationCheck = this._validationCheck.bind(this);
        this.isFinished = this._isFinished.bind(this);

        return this;
    },

    _isFinished(){

        var step3={
            "remarks":$('#remarks').val(),
            "refferedBy":$('#refferedBy').val(),
            "upload":$('#upload').val()

        }

        localStorage.setItem( 'step3', JSON.stringify(step3) );
      var step1res=localStorage.getItem('step1')
      var step1=JSON.parse(step1res)
      var step2res=localStorage.getItem('step2')
      var step2=JSON.parse(step2res)
      var regiterUser={

             fullName:step1.name,
             mobileNumber:step1.contact,
               eMail:step1.email,
               city:step1.city,
               regType:step2.register,
               userName:step2.username,
               password:step2.password,
               companyName:step2.companyname,
               companyUrl:step2.companyurl,
                remarks:step3.remarks,
               referralType:step3.refferedBy,
               uploadFile:step3.upload
      }

      Meteor.call('insertUser', regiterUser, function (err, res) {
        if(err){
         var title="error";
          var msg=err
          toastr.error(err.reason,title);
        }else{
         // alert(res+"saved")
          localStorage.clear();
          FlowRouter.go("/admin/users");
          toastr.success("user details inserted sucessfully");
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
                                <select  autoComplete="off" id="refferedBy" className="form-control"   >
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


