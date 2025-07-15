import PropTypes from 'prop-types';
import React from 'react';

// material-ui
// import { useTheme } from '@mui/material/styles';
import { List, Typography } from '@mui/material';

import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';

// ==============================|| NAVGROUP ||============================== //

const NavGroup = ({ item, onMenuItemClick }) => {
  // const theme = useTheme();
  const items = item.children.map((menu) => {
    switch (menu.type) {
      case 'collapse':
        return <NavCollapse key={menu.id} menu={menu} level={1} />;
      case 'item':
        return <NavItem key={menu.id} item={menu} level={1} onMenuItemClick={onMenuItemClick} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <List
    >
      {items}
    </List>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
  children: PropTypes.object,
  title: PropTypes.string,
  caption: PropTypes.string,
  onMenuItemClick: PropTypes.func,
};

export default NavGroup;
