import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css'
import moment from 'moment'
Step3=React.createClass({


  getInitialState: function() {
    this.state = {
      remarks: '',
      refferedBy: '',
      upload:'',
      selectedValue: [],
    };
     //   this.validationCheck = this._validationCheck.bind(this);
        return this;
    },

    isFinished(){

        var step3={
            "remarks":$('#remarks').val(),
            "refferedBy":this.state.selectedValue,
            "upload":$('#upload').val()

        }
        localStorage.setItem( 'step3', JSON.stringify(step3) );
      var step1res=localStorage.getItem('step1')
      var step1=JSON.parse(step1res)
      var step2res=localStorage.getItem('step2')
      var step2=JSON.parse(step2res)
      var registerUser={

             fullName:step1.name,
             mobileNumber:step1.contact,
               eMail:step1.email,
               city:step1.city,
        registrationDate: moment(step1.Date, "DD-MM-YY").toDate(),
               regType:step2.register,
               userName:step2.username,
               password:step2.password,
               companyName:step2.companyname,
               companyUrl:step2.companyurl,
                remarks:step3.remarks,
        referralType:step3.refferedBy,
               uploadFile:step3.upload
      }

      Meteor.call('insertUser', registerUser, function (err, res) {
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
  refferedBySelect(val) {
    let refSelected=[]
    console.log(val)
    for(let i=0;i<val.length;i++){
      refSelected.push(val[i].value)
    }
    console.log(refSelected)
    this.setState({ selectedValue: refSelected });
  },

    render() {
      let refferedByOption = [
        { value: '0', label: 'friends/collegues reference' },
        { value: '1', label: 'google/searching' },
        { value: '2', label: 'newspaper' },
        { value: '3', label: 'hoarding' },
        { value: '4', label: 'event' },
        { value: '5', label: 'radio' },
        { value: '6', label: 'i over heard it' },
      ];
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

                              <Select multi={true} options={refferedByOption} value={this.state.selectedValue}  onChange={this.refferedBySelect}/>
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


