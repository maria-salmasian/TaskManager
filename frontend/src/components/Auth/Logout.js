import React, { useState , Fragment } from 'react';
import {logout} from '../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'reactstrap';

export function Logout () {
    
    const propTypes = {
        logout: PropTypes.func.isRequired
    }
    
    
        return(
            <Fragment>
                <NavLink onClick = {this.props.logout} href= '#'>
                    Logout
                </NavLink>
            </Fragment>
        )
    
}

export default connect(null, {logout})(Logout);