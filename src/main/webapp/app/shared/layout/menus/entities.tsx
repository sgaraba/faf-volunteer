import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/status">
      <Translate contentKey="global.menu.entities.status" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/category">
      <Translate contentKey="global.menu.entities.category" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/project">
      <Translate contentKey="global.menu.entities.project" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/ong">
      <Translate contentKey="global.menu.entities.ong" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/volunteer-request">
      <Translate contentKey="global.menu.entities.volunteerRequest" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/ong-request">
      <Translate contentKey="global.menu.entities.ongRequest" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
