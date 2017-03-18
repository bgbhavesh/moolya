
const chapterRoutes={

  subChapterListRoute:(clusterId,chapterId,router) =>{
    return `/admin/chapters/${clusterId}/${chapterId}/subChapters`;
  },
  subChapterDetails:(clusterId,chapterId,subChapterId,subChapterName ,route)=> {
    return `/admin/chapters/${clusterId}/${chapterId}/${subChapterId}/${subChapterName}/subChapterDetails`;
  },
  communityDetailsRoute:(clusterId,chapterId,subChapterId,communityId,router)=>{
    return `/admin/chapters/${clusterId}/${chapterId}/${subChapterId}/communities/${communityId}`;
  }
}

export default chapterRoutes;
