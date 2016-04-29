
'use strict';

var React = require('react');

var Grid = require('react-bootstrap').Grid;

var Row = require('react-bootstrap').Row;

var Col = require('react-bootstrap').Col;

var PluginsBox = require('./PluginsBox.js');

var BackOfficeNavBar = require('./BackOfficeNavBar.js');

var PluginsIntro = require('./PluginsIntro.js');

var PluginsView = React.createClass({

    getDefaultProps: function() {
        return {
            fluid: false
        };
    },

    render: function() {
        return (
            <Grid {...this.props}>
                <BackOfficeNavBar brand={ 'EOGILE' }
                                  inverse={ false }
                                  style={ {  } }></BackOfficeNavBar>
                <PluginsBox></PluginsBox>
                <Row>
                    <Col xs={ 12 }
                         md={ 12 }
                         sm={ 12 }
                         lg={ 12 }>
                        <p>
                            <span>© Company 2015</span>
                        </p>
                    </Col>
                </Row>
            </Grid>
            );
    }
});

module.exports = PluginsView;
