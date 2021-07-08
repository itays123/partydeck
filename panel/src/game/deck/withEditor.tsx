import React, { Component } from 'react';
import { GameEditorContext } from '../GameEditorContext';
import { Editor } from './useDeckEditor.tmp';

export function withEditor(
  ComponentToRender: React.ComponentType<{ editor: Editor; label: string }>
) {
  return class DeckEditorWithEditor extends Component<{
    of: 'questions' | 'answers';
    label: string;
  }> {
    static contextType = GameEditorContext;
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
