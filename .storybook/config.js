import { configure } from '@storybook/react';
import '../src/styles/fonts.scss';
import '../src/App.module.scss';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
