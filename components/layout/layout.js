import React from 'react';
import Menu from './menu/menu'
import GridContainer from './grid'

export default ({children}) => (
  <Menu>
    <GridContainer>
      { children }
    </GridContainer>
  </Menu>
);