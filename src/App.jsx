import React, { Component } from 'react';
import Table from './components/Table.jsx';
import FilterSpan from './components/FilterSpan';
import './style.css'
import { connect } from 'react-redux';
import { getRepositoryAction } from './actions/actions.js';
import { auth } from './services'


class App extends Component {
    state = {
        link: ''
    }


    onChangeLink = (e) => {
        const inputValue = e.target.value
        this.setState({
            link: inputValue
        })
    }


    onSubmitLink = (event) => {
        event.preventDefault()
        const { link } = this.state
        const url = this.buildLink(link)
        this.props.dispatch(getRepositoryAction(url))
    }

    buildLink(link) {
        const str = link.split('/')
        const adress = str.slice(-2)
        const contentLink = `https://api.github.com/repos/${adress[0]}/${adress[1]}/contents?${auth}`
        return contentLink
    }

    render() {
        const { link } = this.state

        return (
            <div className="wrapper">
                <form className='form' onSubmit={this.onSubmitLink}>
                    <input type="text"
                        className='users_link'
                        name='link'
                        placeholder="Enter a repo's link"
                        onChange={this.onChangeLink}
                        defaultValue={link} />
                    <input type="submit" className='users_link_submit' defaultValue="SUBMIT" />
                </form>
                <FilterSpan />
                {!!this.props.files.length && <Table usersLink={link} />}
            </div>
        )
    }
}

const mapStateToProps = ({ files }) => {
    return {
        files
    }
}

export default connect(mapStateToProps)(App)