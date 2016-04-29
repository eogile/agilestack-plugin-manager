
'use strict';

require('../../src/assets/css/bootstrap.css');

require('../../src/assets/css/font-awesome.min.css');

require('../../src/assets/js/bootstrap.js');

require('../../src/libs/bootstrap3-editable/css/bootstrap-editable.css');

require('../../src/libs/bootstrap3-editable/js/bootstrap-editable.js');

var React = require('react');

var PluginsView = require('../../src/components/backoffice/PluginsView.js');

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
