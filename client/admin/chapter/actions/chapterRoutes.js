
const chapterRoutes={

  subChapterListRoute:(clusterId,chapterId,router) =>{
    return `/admin/chapters/${clusterId}/${chapterId}/subChapters`;
  },
  subChapterDetails:(subChapterId, route)=> {
    return `/admin/chapters/${subChapterId}/subChapterDetails`;
  }
}

export default chapterRoutes;
