import React, { Component, PropTypes } from 'react';
export default class VerticalBreadCrum extends Component {
  constructor(props){
    super(props);
    this.state = {
      breadCrumList:[],
      toggle:1
    };
  }

  renderBreadcrumb(){
    this.setState({toggle:!this.state.toggle});
  }

  componentDidMount(){
    this.context.breadCrum.subscribe(this.renderBreadcrumb.bind(this));
  }

  onLinkClicked(){
    this.props.breadcrumbClicked();
  }

   render(){
    let path = Object.assign(FlowRouter._current.path);
    let routePath = Object.assign(FlowRouter._current.route.path);

    let tab = FlowRouter.getQueryParam('tab',path);
     let subtab = FlowRouter.getQueryParam('subtab',path);

    let pathHierarchy = path.split('app/')[1].split('/');
    let routePathHierarchy = routePath.split('app/')[1].split('/');

     let list = [];

     for( let index in routePathHierarchy){
      if ( routePathHierarchy[index] ===':communityType'){
        let tempList = list ;
        list = [];
        list.push(tempList[0]);
       }
       if( routePathHierarchy[index] ==='manageSchedule'){
         list.push({
           name: properName(routePathHierarchy[index])+ ' ('+getNameFromDB(pathHierarchy[index],routePathHierarchy[index]) +')' ,
           link:'/app/calendar/manageSchedule/all/activityList',
         });
       }else if(!routePathHierarchy[index] || routePathHierarchy[index] === '' || pathHierarchy[index] === 'true'
              ||routePathHierarchy[index-1] === 'manageSchedule'){
         //do nothing
       }else if( (routePathHierarchy[index] === 'view' || routePathHierarchy[index] === 'edit')
         && (routePathHierarchy[index-1] === 'portfolio')){

       }
       else if(routePathHierarchy[index].startsWith(':')){
         if ( routePathHierarchy[index] ===':officeId'){
           list[list.length-1].link=path.split(pathHierarchy[index])[0] + pathHierarchy[index].split('?')[0];
         }else{
           var name = getNameFromDB(pathHierarchy[index],routePathHierarchy[index]);    // get name from DATABASE using ID and set here
           if (routePathHierarchy[index-2] === 'view' || routePathHierarchy[index-2] === 'edit'){
             name += ' ('+routePathHierarchy[index-2] +')';
           }
           else if(routePathHierarchy[index-2] === 'explore'){
             name += ' ('+properName(routePathHierarchy[index-1]) +')';
           }
           list.push({
             name: name,
             link:path.split(pathHierarchy[index])[0] + pathHierarchy[index].split('?')[0],
           });
         }

       }else if((routePathHierarchy[index] === 'view' || routePathHierarchy[index] === 'edit')){
         list.push({
           name:properName(routePathHierarchy[index]),
           link:path,
         });
         break;
       } else if(routePathHierarchy[index] === 'all' && routePathHierarchy[index-1] !== 'manageSchedule'){
         list[index-1].link = path;
         break;
       }else if(routePathHierarchy[index] === 'addOffice' || routePathHierarchy[index] === 'editOffice'){
         list.push({
           name:properName('myOffice'),
           link:path.split(routePathHierarchy[index])[0] + 'myOffice',
         });
         list.push({
           name:properName(routePathHierarchy[index]),
           link:path.split(routePathHierarchy[index])[0] + routePathHierarchy[index],
         });
       } else
         list.push({
           name:properName(routePathHierarchy[index]),
           link:path.split(routePathHierarchy[index])[0] + routePathHierarchy[index],
         });
     }

     if(tab){
       list.push({
         name:properName(tab),
         link:path.split('&')[0],
       });
       if(subtab && tab !=='about'){
         list.push({
           name:properName(subtab),
           link:'',
         });
       }

     }

     // let onClick = this.onLinkClicked.bind(this);

     let className='';
    const mlist =  list.map((obj,index) =>{
      if(index+1 === list.length) className = 'current';
        return ( <li key={index} className={className} onClick={ this.onLinkClicked.bind(this)}><a href={obj.link} >{obj.name}</a></li>);
    });

     if(list.length>0){ mlist.push(<li key={'last'} className='timelineLast'></li>)};

    return(
      <div className="vTimeline">
        <ul>
          {mlist}
        </ul>
      </div>
    )
  }
}

function properName(name){
  return (name.charAt(0).toUpperCase() + name.slice(1)).replace(/([A-Z])/g, ' $1').trim();
}


function getNameFromDB(type,id) {  //ex->    type = :portfolioId   id=sdvswr403fmfg
  return 'Name';
  // const response = await findAddressTypeActionHandler(id);
  // this.setState({loading:false,data:response});
}


VerticalBreadCrum.contextTypes = {
  breadCrum:PropTypes.Object
};
