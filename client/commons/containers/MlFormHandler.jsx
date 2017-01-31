/**
 * Created by mohdmohasin on 29/1/17.
 */
import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function formHandler() {
  return (SourceComponent) => {
    class MlFormHandler extends Component {

      constructor(props) {
        super(props);
        this.state = {
          loading: false, error: ''
        };
        this.handler.bind(this);
        this.callBackHandler.bind(this);
        return this;
      }

      async callBackHandler(){
        this.setState({ loading: false, error: '' });
      }

      async handler(handleMethod,handleSuccess,handleError){
        if(handleMethod){
            this.setState({ loading: true, error: '' });

            try{
              let resp=await handleMethod();
             this.setState({ loading: false, error: '' });
              var that=this;
              if(handleSuccess){
                handleSuccess(resp);
              }

            }catch(error){
              this.setState({ loading: false, error: '' });
              if(handleError){
                handleError();
              }
            }
        }
      }



      render() {
        const showLoader=this.state.loading;

        return (
          <div>
          {showLoader===true? (<div>Loading...</div>) :
            (<SourceComponent {...this.props} handler={this.handler.bind(this)}/>)
          }
        </div>
        )

       // return <SourceComponent {...this.props} handler={this.handler}/>
      }
    }

    MlFormHandler.displayName = `MlFormHandler(${getDisplayName(SourceComponent)})`;
    hoistNonReactStatic(this.MlFormHandler, SourceComponent);
    return MlFormHandler;
  }
};
