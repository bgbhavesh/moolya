
/**
 * Created by mohammed.mohasin on 03/02/17.
 */
import mlRegistrationTemplates from './mlRegistrationTemplate';
class MlTemplateEngine{

  constructor(){
    if(! MlTemplateEngine.instance){
      //this.registrationTemplates=new MlRegistrationTemplates();
      //this.portfolioTemplates=new mlPortfolioTemplates();

      MlTemplateEngine.instance = this;

    }
    return MlTemplateEngine.instance;
  }


  fetchTemplate(subProcess,templateName,userType){
    switch(subProcess){
      case 'registration':
         let template=mlRegistrationTemplates.getTemplate(templateName,userType);
         return template;
        break;
      case 'portfolio':
        break;


    }

  }
}

const mlTemplateEngine = new MlTemplateEngine();
Object.freeze(mlTemplateEngine);

export default mlTemplateEngine;

