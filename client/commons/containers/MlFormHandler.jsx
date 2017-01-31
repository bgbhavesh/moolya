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
          loading: false,
          error: '',
        };
        return;
      }

      handler(handleMethod,handleSuccess,handleError){
        if(handleMethod){
            this.setState({ loading: true, error: '' });

            try{
              let resp=handleMethod();
              handleSuccess();
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
            (<SourceComponent {...this.props} handler={this.handler}/>)
          }
        </div>
        )

       // return <SourceComponent {...this.props} handler={this.handler}/>
      }
    }

    MlFormHandler.displayName = `MlFormHandler(${getDisplayName(SourceComponent)})`;
    hoistNonReactStatic(MlFormHandler, SourceComponent);
    return MlFormHandler;
  }
};
