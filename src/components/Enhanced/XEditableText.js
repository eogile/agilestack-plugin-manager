
'use strict';

var React = require('react');

var XEditableText = React.createClass({

    getDefaultProps: function() {
        return {
            href: '#'
        };
    },

    componentDidMount: function(){
        $(React.findDOMNode(this.refs.editableElement)).editable();
    },

    render: function() {
        return (
            <a href="#"
               ref="editableElement"
               id="username"
               data-type="text"
               data-pk="1"
               data-title="Enter username">User Name</a>
        );
    }
});

module.exports = XEditableText;
