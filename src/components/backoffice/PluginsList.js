
'use strict';

var React = require('react');

var Col = require('react-bootstrap').Col;

var Panel = require('react-bootstrap').Panel;

var ListGroup = require('react-bootstrap').ListGroup;

var ListGroupItem = require('react-bootstrap').ListGroupItem;


var PluginsActions = require('../../actions/backoffice/PluginsActions.js');

var PluginsStore = require('../../stores/backoffice/PluginsStore.js');

var PluginsList = React.createClass({

    getDefaultProps: function() {
        return {
            xs: 5,
            md: 5,
            sm: 5,
            lg: 5,
            name: 'Available Plugins',
            pluginsUrl: '/plugins/availablePlugins.json'
        };
    },

    getInitialState: function() {
        console.log('in getInitialState');
        if (!PluginsStore.model[this.props.name]) {
            PluginsStore.model[this.props.name] = {};
            PluginsStore.model[this.props.name].plugins = [];
        }

        return PluginsStore.model[this.props.name];
    },

    componentDidMount() {
        this.unsubscribe = PluginsStore.listen(this.onModelChange);
        // var d = Object.getOwnPropertyDescriptor(PluginsActions, 'loadAvailablePlugins');
        // for(var key in PluginsActions) {
        //     console.log('PluginListActions.'+key+' : '+Object.getOwnPropertyDescriptor(PluginsActions, key));
        // }
        // console.log('PluginsActions: '+ PluginsActions);
        // console.log("before PluginsActions.loadAvailablePlugins(), desc loadAvailablePlugins : " + d);
        PluginsActions.loadPlugins(this.props.name, this.props.pluginsUrl);
    },

    componentWillUnmount() {
        this.unsubscribe();
    },

    onModelChange: function(model) {
        console.log('inModelChange');
        this.setState(model[this.props.name]);
    },

    render: function() {
        var plugins = this.state.plugins;
        var _this = this;
        return (
            <Col {...this.props}>
                <Panel header={ <h4><span >{this.props.name}</span></h4> } style={ {    overflow: 'auto'} }>
                    <ListGroup fill={ true }>
                        {plugins.map(function(plugin) {
                            if (!plugin) {
                                console.log('plugin is undefined in list : '+_this.props.name);
                            } else {
                                console.log('plugin.name = '+plugin.name+ 'in List '+_this.props.name);
                            }   
                            return (
                                // <ListGroupItem key={plugin.name} onClick={_this.handlePluginClick.bind(null, plugin.name)} >
                                <ListGroupItem key={plugin.name} onClick={PluginsActions.selectPlugin.bind(null, plugin.name, _this.props.name)} >
                                    <span>{plugin.name}</span>
                                </ListGroupItem>
                                );
                            })
                        }
                    </ListGroup>
                </Panel>
            </Col>
            );
    }
});

module.exports = PluginsList;
