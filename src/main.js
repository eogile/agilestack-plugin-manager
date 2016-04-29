
'use strict';

require('./assets/css/bootstrap.css');

require('./assets/css/font-awesome.min.css');

require('./assets/js/bootstrap.js');

require('./libs/bootstrap3-editable/css/bootstrap-editable.css');

require('./libs/bootstrap3-editable/js/bootstrap-editable.js');

var React = require('react');

var PluginsView = require('./components/backoffice/PluginsView.js');

var Plugins = React.createClass({

    render: function() {
        return (
            <div {...this.props}>
                <PluginsView fluid={ false }></PluginsView>
            </div>
            );
    }
});

React.render(<Plugins/>, document.getElementById('content'));
