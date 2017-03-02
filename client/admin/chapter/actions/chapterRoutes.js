
const chapterRoutes={

  subChapterListRoute:(clusterId,chapterId,router) =>{
    return `/admin/chapters/${clusterId}/${chapterId}/subChapters`;
  },
  subChapterDetails:(clusterId,chapterId,subChapterId,subChapterName ,route)=> {
    return `/admin/chapters/${clusterId}/${chapterId}/${subChapterId}/${subChapterName}/subChapterDetails`;
  }
}

export default chapterRoutes;
