require('../../src/assets/css/bootstrap.css');
require('../../src/assets/css/font-awesome.min.css');
require('../../src/assets/js/bootstrap.js');
require('../../src/libs/bootstrap3-editable/css/bootstrap-editable.css');
require('../../src/libs/bootstrap3-editable/js/bootstrap-editable.js');
module.exports = {
    ReactBootstrap: {
        Grid: require('react-bootstrap').Grid,
        Row: require('react-bootstrap').Row,
        Col: require('react-bootstrap').Col,
        ButtonToolbar: require('react-bootstrap').ButtonToolbar,
        ButtonGroup: require('react-bootstrap').ButtonGroup,
        Button: require('react-bootstrap').Button,
        DropdownButton: require('react-bootstrap').DropdownButton,
        SplitButton: require('react-bootstrap').SplitButton,
        MenuItem: require('react-bootstrap').MenuItem,
        Panel: require('react-bootstrap').Panel,
        PanelGroup: require('../../src/components/ReactBootstrap').PanelGroup,
        Input: require('react-bootstrap').Input,
        Table: require('react-bootstrap').Table,
        TabbedArea: require('../../src/components/ReactBootstrap').TabbedArea,
        TabPane: require('react-bootstrap').TabPane,
        Carousel: require('react-bootstrap').Carousel,
        CarouselItem: require('react-bootstrap').CarouselItem,
        ProgressBar: require('react-bootstrap').ProgressBar,
        Navbar: require('react-bootstrap').Navbar,
        Nav: require('../../src/components/ReactBootstrap').Nav,
        NavItem: require('react-bootstrap').NavItem,
        ListGroup: require('react-bootstrap').ListGroup,
        ListGroupItem: require('react-bootstrap').ListGroupItem,
        Label: require('react-bootstrap').Label,
        Badge: require('react-bootstrap').Badge,
        Well: require('react-bootstrap').Well,
        Jumbotron: require('react-bootstrap').Jumbotron
    },
    Enhanced: {
        LoadingButton: require('../../src/components/Enhanced/LoadingButton.js'),
        CollapseButton: require('../../src/components/Enhanced/CollapseButton.js'),
        XEditableText: require('../../src/components/Enhanced/XEditableText.js')
    },
    backoffice: {
        PluginsButtons: require('../../src/components/backoffice/PluginsButtons.js'),
        PluginsList: require('../../src/components/backoffice/PluginsList.js'),
        PluginsBox: require('../../src/components/backoffice/PluginsBox.js'),
        BackOfficeNavBar: require('../../src/components/backoffice/BackOfficeNavBar.js'),
        PluginsIntro: require('../../src/components/backoffice/PluginsIntro.js'),
        PluginsView: require('../../src/components/backoffice/PluginsView.js')
    }
};