
/**
 * Created by mohammed.mohasin on 03/02/17.
 */
class MlTemplateEngine{

  constructor(){
    if(! MlTemplateEngine.instance){
      //this.registrationTemplates=new MlRegistrationTemplates();
      //this.portfolioTemplates=new mlPortfolioTemplates();

      MlTemplateEngine.instance = this;

    }
    return MlTemplateEngine.instance;
  }


  fetchTemplate(process,templateName){
    switch(process){
      case 'Registration':
        //let template=this.portfolioTemplates.getTemplateDetails(templateName);
        //return template;
        break;
      case 'Portfolio':

        break;


    }

  }
}

const mlTemplateEngine = new MlTemplateEngine();
Object.freeze(mlTemplateEngine);

export default mlTemplateEngine;

