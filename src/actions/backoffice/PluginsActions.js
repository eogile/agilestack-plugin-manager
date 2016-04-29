'use strict';

var Reflux = require('reflux');

var PluginsActions = Reflux.createActions([
    'loadPlugins',
    'selectPlugin',
    'installPlugin',
    'uninstallPlugin'
]);



module.exports = PluginsActions;
