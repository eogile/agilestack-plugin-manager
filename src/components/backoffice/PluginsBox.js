
'use strict';

var React = require('react');

var Row = require('react-bootstrap').Row;

var PluginsButtons = require('./PluginsButtons.js');

var PluginsList = require('./PluginsList.js');

var PluginsActions = require('../../actions/backoffice/PluginsActions.js');

var PluginsStore = require('../../stores/backoffice/PluginsStore.js');


const 
    availableName = 'Available plugins',
    installedName = 'Installed plugins';

var PluginsBox = React.createClass({

    getDefaultProps: function() {
        return {};
    },

    render: function() {
        return (
            <Row {...this.props}>
                <PluginsList name={ availableName}
                             pluginsUrl={ '/plugins/availablePlugins' }></PluginsList>
                <PluginsButtons></PluginsButtons>
                <PluginsList name={ installedName } pluginsUrl={ '/plugins/installedPlugins' }></PluginsList>
                {this.props.injected}
            </Row>
            );
    }
});

module.exports = PluginsBox;
