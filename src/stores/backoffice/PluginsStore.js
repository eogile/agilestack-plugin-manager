'use strict';

var Reflux = require('reflux');
var PluginsActions = require('../../actions/backoffice/PluginsActions.js');

var defaultModel = {
  // pluginsUrl: '/plugins/availablePlugins.json',
  // installedPluginsUrl: '/plugins/installedPlugins.json',
  plugins:[],
  availableListName: 'Available plugins',
  installedListName: 'Installed plugins'
};

var apiUrl = '/plugins';

var switchPluginBetweenLists = function (listFrom, listTo, pluginName) {
  // console.log("In switchPluginBetweenLists : selected = "+ this.model.selected);
  console.log("in switchPluginBetweenLists: pluginName = " + pluginName);
  var plugin = listFrom.filter(function (obj){
    return obj.name == pluginName;
  })[0];
  // console.log("in onInstallPlugin: availablepluginList[0] = " + this.model[this.model.availableListName].plugins[0].name);
  // console.log("plugin to Install : "+plugin);
  listTo.push(plugin);
  //3
  var i;
  for( i=listFrom.length-1; i>=0; i--) {
    if( listFrom[i].name == pluginName) {
      listFrom.splice(i,1);
    }
  }
};

var PluginsStore = Reflux.createStore({
    model: defaultModel,
    listenables: PluginsActions,

    onSelectPlugin: function(name, listName) {
        console.log('In Store : click on plugin : '+ name +'; previous selection : ' + this.model.selected + '; for list: '+ listName); 
        console.log('In Store : click on plugin : this.model.installedListName = '+ this.model.installedListName);
        this.model.selected = name;
        this.model.selectedList = listName;
        var hasToTrigger = false;
        if (listName == this.model.availableListName) {
          if(!this.model.isInstallable || this.model.isUnInstallable) {
            hasToTrigger = true
          }
          this.model.isInstallable = true
          this.model.isUnInstallable = false
        } else {
          if(this.model.isInstallable || !this.model.isUnInstallable) {
            hasToTrigger = true
          }
          this.model.isInstallable = false
          this.model.isUnInstallable = true
        }
        if (hasToTrigger) {
          this.trigger(this.model);
        }
    },

    onInstallPlugin: function() {
      //1. find selected Plugin
      //2. add plugin to installed list
      //3. remove plugin from available
      console.log("In onInstallPlugin : selected = "+ this.model.selected);
      if (this.model.selectedList == this.model.availableListName) {
        var pluginName = this.model.selected;
        var listFrom = this.model[this.model.availableListName].plugins;
        var listTo = this.model[this.model.installedListName].plugins;
        $.ajax({
          url: apiUrl + '/plugins/',
          data:'{"plugin":{"name":"'+pluginName+'"}}',
          dataType: 'json',
          method: 'POST',
          cache: false,
          success: function(data) {
            switchPluginBetweenLists(listFrom, listTo, pluginName);
            this.model.isInstalling = false;
            this.model.isInstallable = false;
            this.trigger(this.model);
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(url, status, err.toString());
          }.bind(this)

        });
      }
    },

    onUninstallPlugin: function () {
      console.log("In onUninstallPlugin : selected = "+ this.model.selected);
      if (this.model.selectedList == this.model.installedListName) {
        var pluginName = this.model.selected;
        var listFrom = this.model[this.model.installedListName].plugins;
        var listTo = this.model[this.model.availableListName].plugins;
        $.ajax({
          url: apiUrl + '/plugins/',
          data:'{"name":"'+pluginName+'"}',
          dataType: 'json',
          method: 'DELETE',
          cache: false,
          success: function(data) {
            switchPluginBetweenLists(listFrom, listTo, pluginName);
            this.model.isUnInstalling = false;
            this.model.isUnInstallable = false;
            this.trigger(this.model);
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(url, status, err.toString());
          }.bind(this)
        });
      }
    },

    onLoadPlugins: function(listName, url){
      $.ajax({
        url: apiUrl + url,
        dataType: 'json',
        cache: false,
        success: function(data) {
          if (!this.model[listName]) {
            this.model[listName] = {};
          }
          this.model[listName].plugins = data.plugins;
          this.trigger(this.model);
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(url, status, err.toString());
        }.bind(this)
      });
    }

});

module.exports = PluginsStore;