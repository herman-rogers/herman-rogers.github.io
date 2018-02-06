import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Notebook.css';

const octokit = require('@octokit/rest')();

export default class Notebook extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      loading: false,
    };
  }

  componentWillMount() {
    this.setState({ loading: true });
  }

  componentDidMount() {
    octokit.gitdata.getTree({
      owner: 'herman-rogers',
      repo: 'SoftwareLabNotebook',
      sha: '6a44b1b68aa15cfdd25225d70ff755fb14d2109f',
      recursive: true,
    }).then((response) => {
      const notebook = response.data.tree;
      const listOfNotes = [];

      notebook.forEach((note) => {
        const isNotebook = note.path.indexOf('notebook') !== -1;
        const isNote = note.path.indexOf('.md') !== -1;

        if (isNotebook && isNote) {
          const splitPath = note.path.split('/');
          const date = splitPath[splitPath.length - 1].replace('.md', '');
          const splitDate = date.split('-');
          const isoDate = `${splitDate[3]}-${splitDate[1]}-${splitDate[2]}T00:00:00Z`;

          const formattedNote = Object.assign({}, note, {
            date: new Date(isoDate),
          });

          listOfNotes.push(formattedNote);
        }
      });

      listOfNotes.sort((a, b) => b.date - a.date);

      this.setState({
        loading: false,
        notes: listOfNotes,
      });
    });
  }

  renderNotes() {
    const loaded = this.state.notes || [];
    const notebookUrl = 'https://github.com/herman-rogers/SoftwareLabNotebook/blob/master/';

    return (
      <div>
        <div className="notebook-title">
          <p>
            <a href={`${notebookUrl}/README.md`} target="_">
            notes from the engineering laboratory
            </a>
          </p>
        </div>
        {loaded.map((note) => {
          const path = note.path.split('/');
          const noteTitle = path[path.length - 1];

          return (
            <div className="notebook-link" key={note.path}>
              <a href={`${notebookUrl}${note.path}`} target="-">{noteTitle}</a>
            </div>);
        })}
      </div>);
  }

  render() {
    return (
      <div className="notebook">
        <div className="notebook-title">
          <p>@notebook</p>
        </div>

        <div className="notebook-link">
          <Link to="/">home</Link>
        </div>

        {this.state.loading ?
          <div className="notebook-loading">
            <p>loading...</p>
          </div>
          : this.renderNotes()}
      </div>
    );
  }
}

