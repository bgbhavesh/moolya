/**
 * Created by venkatsrinag on 12/4/17.
 */
import '../../lib/annotator.min'


export function initializeMlAnnotator(eventsCallback) {
  const callback = eventsCallback;
  Annotator.Plugin.MyPlugin = function (element, options) {
  };

  jQuery.extend(Annotator.Plugin.MyPlugin.prototype, new Annotator.Plugin(), {
    events: {},
    options: {
    },
    pluginInit() {
      this.annotator.subscribe('annotationCreated', (annotation) => {
        delete annotation.highlights
        callback && callback('create', annotation)
      })
        .subscribe('annotationViewerShown', (editor, annotation) => {
          callback('annotationViewer', annotation)
        })
        .subscribe('annotationUpdated', (annotation) => {
          console.info('The annotation: %o has just been updated!', annotation)
          callback && callback('update', annotation)
        })
        .subscribe('beforeAnnotationCreated', (annotation) => {
          console.info('The annotation: %o has just been deleted!', annotation)
          callback && callback('before', annotation)
        })
        .subscribe('annotationEditorSubmit', (editor, annotation) => {
          console.info('The annotation: %o has just been submitted!', annotation)
          // callback && callback('submit', annotation, editor)
        })
        .subscribe('annotationEditorCancle', (editor, annotation) => {
          console.info('The annotation: %o has just been submitted!', annotation)
          callback && callback('cancel', annotation, editor)
        })
        .subscribe('annotationDeleted', (annotation) => {
          console.info('The annotation: %o has just been deleted!', annotation)
          callback && callback('delete', annotation)
        });
    }
  });
}
