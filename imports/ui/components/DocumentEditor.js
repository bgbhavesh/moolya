/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import documentEditor from '../../modules/document-editor.js';

export default class DocumentEditor extends React.Component {
  componentDidMount() {
    documentEditor({ component: this });
    setTimeout(() => { document.querySelector('[name="title"]').focus(); }, 0);
  }

  render() {
    const { doc } = this.props;
    return (<form
      ref={ form => (this.documentEditorForm = form) }
      onSubmit={ event => event.preventDefault() }
    >
      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <FormControl
          type="text"
          name="title"
          defaultValue={ doc && doc.title }
          placeholder="This will be scrolled on home page"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>News Url</ControlLabel>
        <FormControl
          type="text"
          name="url"
          defaultValue={ doc && doc.url }
          placeholder="Url on cliking the scrolling"
        />
      </FormGroup>

      <Button type="submit" bsStyle="success">
        { doc && doc._id ? 'Save Changes' : 'Add Document' }
      </Button>
    </form>);
  }
}

DocumentEditor.propTypes = {
  doc: React.PropTypes.object,
};
