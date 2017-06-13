/**
 * Created by mohammed.mohasin on 12/6/17.
 */
import React from "react";
import MlAppActionComponent from '../components/MlAppActionComponent';
import PopoverActionIcon from '../../appActions/components/PopoverActionIcon';
import Connect from '../../appActions/components/Connect';
import Inquiry from '../../appActions/components/Inquiry';
import Review from '../../appActions/components/Review';

export const GenericPortfolioActions= [
  {showAction: true,actionName: 'connect',hasPopOver:true,popOverTitle:'Connect Request',placement:'top',
   target:'connectRequest',popOverComponent:<Connect />,actionComponent:<PopoverActionIcon />
  },
  {showAction: true,actionName: 'enquire',hasPopOver:true,popOverTitle:'Enquire',placement:'top',
   target:'enquireRequest',popOverComponent:<Inquiry />,actionComponent:<PopoverActionIcon />
  },
  {showAction: true,actionName: 'review',hasPopOver:true,popOverTitle:'Review',placement:'top',
   target:'reviewRequest',popOverComponent:<Review />,actionComponent:<PopoverActionIcon />
  },
  {showAction: true,actionName: 'save'},
  {showAction: true,actionName: 'edit'},
  {showAction: true,actionName: 'golive'}
];

export const GenericPortfolioAccordion= {id:'portfolioAccordion',
  panelItems:[{'title':'Related',isText:true,contentComponent:'upcoming'},
              {'title':'Actions',isText:false,contentComponent:<MlAppActionComponent  />}]
    };

export const IdeatorPortfolioAccordion= {id:'ideatorPortfolioAccordion',
  panelItems:[{'title':'Related',isText:true,contentComponent:'upcoming'},
    {'title':'Actions',isText:false,contentComponent:<MlAppActionComponent  />}]
};
