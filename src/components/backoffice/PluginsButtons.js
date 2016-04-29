
'use strict';

var React = require('react');

var ReactBootstrap = require('react-bootstrap');
var Col = ReactBootstrap.Col;

var ButtonGroup = require('react-bootstrap').ButtonGroup;

var Button = require('react-bootstrap').Button;


var PluginsActions = require('../../actions/backoffice/PluginsActions.js');

var PluginsStore = require('../../stores/backoffice/PluginsStore.js');

var PluginsButtons = React.createClass({

    getDefaultProps: function() {
        return {
            xs: 2,
            md: 2,
            sm: 2,
            lg: 2
        };
    },

    getInitialState: function() {
        return PluginsStore.model;
    },

    componentDidMount() {
        this.unsubscribe = PluginsStore.listen(this.onModelChange);
    },

    componentWillUnmount() {
        this.unsubscribe();
    },

    onModelChange: function(model) {
        this.setState(model);
    },
    handleInstallClick: function (){
        this.setState({isInstalling: true});
        console.log('in handleInstallClick - before PluginsActions.installPlugin');
        PluginsActions.installPlugin();
//        this.handleInstallClick
    },
    handleUnInstallClick: function (){
        this.setState({isUnInstalling: true});
        PluginsActions.uninstallPlugin();
    },

    render: function() {
        var colStyle= {
            position: 'relative',
            transform: 'translateY(50%)'
        };
        var buttonStyle= {
            display:'inherit',
        };
        let isInstalling = this.state.isInstalling;
        let isUnInstalling = this.state.isUnInstalling;
        console.log('this.state.isInstalling='+this.state.isInstalling);
        console.log('this.state.isUnInstalling='+this.state.isUnInstalling);
        console.log('this.state.isInstallable='+this.state.isInstallable);
        console.log('this.state.isUnInstallable='+this.state.isUnInstallable);
        return (
            <Col {...this.props} style={colStyle}>
                <ButtonGroup vertical={true} style={buttonStyle} >
                    <Button onClick={!isInstalling ? this.handleInstallClick:null} disabled={!this.state.isInstallable || isInstalling}>
                        <span>{isInstalling ? 'Installing...' : 'Install'}</span>
                    </Button>
                    <Button onClick={!isUnInstalling ? this.handleUnInstallClick:null} disabled={!this.state.isUnInstallable || isUnInstalling}>
                        <span>{isUnInstalling ? 'Uninstalling...' : 'Uninstall'}</span>
                    </Button>
                </ButtonGroup>
            </Col>
            );
    }

});

module.exports = PluginsButtons;
