import React, { Component } from 'react';
import { GameEditorContext } from '../GameEditorContext';
import { Editor } from '../types';

export function withEditor(
  ComponentToRender: React.ComponentType<{ editor: Editor; label: string }>
) {
  return class DeckEditorWithEditor extends Component<{
    of: 'questions' | 'answers';
    label: string;
  }> {
    static contextType = GameEditorContext;
    componentDidMount() {
      this.context[this.props.of].clearState();
    }
    render() {
      return (
        <ComponentToRender
          editor={this.context[this.props.of]}
          label={this.props.label}
        />
      );
    }
  };
}
