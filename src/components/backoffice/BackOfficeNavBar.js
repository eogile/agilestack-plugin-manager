
'use strict';

var React = require('react');

var DropdownButton = require('react-bootstrap').DropdownButton;

var MenuItem = require('react-bootstrap').MenuItem;

var Navbar = require('react-bootstrap').Navbar;

var Nav = require('../ReactBootstrap').Nav;

var NavItem = require('react-bootstrap').NavItem;

var BackOfficeNavBar = React.createClass({

    getDefaultProps: function() {
        return {
            brand: 'EOGILE',
            inverse: false,
            style: {  }
        };
    },

    render: function() {
        return (
            <Navbar {...this.props}>
                <Nav>
                    <NavItem href={ '#' }>
                        <span>Plugins</span>
                    </NavItem>
                </Nav>
            </Navbar>
            );
    }
});

module.exports = BackOfficeNavBar;
