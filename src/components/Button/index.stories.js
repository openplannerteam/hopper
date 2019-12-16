import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs, text, boolean,
} from '@storybook/addon-knobs';

import Button from './index';

// =============================================================================
// Stories
// =============================================================================

const stories = storiesOf('Button', module);
stories.addDecorator(withKnobs);
stories
  .add('Default', () => {
    const fullWidth = boolean('fullWidth', false, 'Button');
    const ghost = boolean('ghost', false, 'Button');
    const biggerText = boolean('biggerText', false, 'Button');
    const content = text('content', 'This is a button', 'Button');

    return (
      <Button
        fullWidth={fullWidth}
        ghost={ghost}
        biggerText={biggerText}
      >
        {content}
      </Button>
    );
  });
