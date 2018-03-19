import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from "../actions/index";
import {Helmet} from 'react-helmet';

class UsersList extends Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    renderUsers() {
        return this.props.users.map(user => {
            return <li key={user.id}>{user.name}</li>
        })
    }

    head(){
        return (
            <Helmet>
                {/*Helmet tags only takes a single expression , that why it is essential to wrap the title content different expression in a single expression*/}
                <title>{`${this.props.users.length} Users App`}</title>
                <meta property="og:title" content="Users App" />
            </Helmet>
        )
    }
    render() {
        return (
            <div>
                {this.head()}
                Here's a big list of users:
                <ul>{this.renderUsers()}</ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {users: state.users};
}

function loadData(store) {
    return store.dispatch(fetchUsers());
}


export default {
    component: connect(mapStateToProps, {fetchUsers})(UsersList),
    loadData
}