import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
import lightGreen from '@material-ui/core/colors/lightGreen';
import teal from '@material-ui/core/colors/teal';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';
import purple from '@material-ui/core/colors/purple';
import deepPurple from '@material-ui/core/colors/deepPurple';
import pink from '@material-ui/core/colors/pink';
import { Color } from '@material-ui/core';
import { Palette } from '@material-ui/core/styles/createPalette';

interface ThemePalette {
  primary: Color;
  secondary: Color;
}

export const defaultThemePalette: ThemePalette = {
  primary: teal,
  secondary: pink,
};

export const themePaletteMap: { [name: string]: ThemePalette } = {
  pink: {
    primary: pink,
    secondary: blue,
  },
  teal: {
    primary: teal,
    secondary: pink,
  },
  blue: {
    primary: blue,
    secondary: pink,
  },
  indigo: {
    primary: indigo,
    secondary: pink,
  },
  purple: {
    primary: purple,
    secondary: teal,
  },
  deepPurple: {
    primary: deepPurple,
    secondary: purple,
  },
};

export function getThemePaletteByName(name: string | null) {
  if (name === null) {
    return null;
  }

  return themePaletteMap[name] || null;
}
