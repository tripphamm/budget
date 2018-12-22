export const appBarHeight = 56; // found from inspecting dom
export const bottomNavHeight = 56; // found from inspecting dom

export const appBarBufferHeight = appBarHeight;

export const floatingActionButtonSize = 56;
export const floatingActionButtonOffsetRight = 30;
export const floatingActionButtonOffsetBottom = 30 + bottomNavHeight;

// used to create a buffer on the bottom of the screen so that components can be scrolled above the FAB
export const floatingActionButtonBufferHeight =
  floatingActionButtonOffsetBottom + 15;
