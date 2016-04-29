
'use strict';

var React = require('react');

var Row = require('react-bootstrap').Row;

var Col = require('react-bootstrap').Col;

var Button = require('react-bootstrap').Button;

var Jumbotron = require('react-bootstrap').Jumbotron;

var XEditableText = require('../Enhanced/XEditableText.js');

var PluginsIntro = React.createClass({

    getDefaultProps: function() {
        return {};
    },

    render: function() {
        return (
            <Row {...this.props}>
                <Col xs={ 12 }
                     md={ 12 }
                     sm={ 12 }
                     lg={ 12 }>
                    <Jumbotron componentClass={ 'div' }>
                        <h1 style={ {  } }><span >Hello</span><XEditableText ></XEditableText></h1>
                        <p>
                            <span>This the place to manage the plugins</span>
                        </p>
                        <p>
                            <Button bsStyle={ 'success' } bsSize={ 'large' }>
                                <span>Enjoy</span>
                            </Button>
                        </p>
                    </Jumbotron>
                </Col>
            </Row>
            );
    }
});

module.exports = PluginsIntro;
