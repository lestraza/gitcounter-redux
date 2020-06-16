import React, { Component } from 'react'
import { filterDataAction } from '../actions/actions'
import { connect } from 'react-redux';

class FilterSpan extends Component {

    state = {
        filterName: ''
    }

    onChangeFilterData = (event) => {
        const value = event.target.value
        this.setState({
            filterName: value
        })
        const { files } = this.props
        this.props.dispatch(filterDataAction(value, files))
    }

    render() {
        return (
            <div className='filter__container'>
                <input
                    placeholder="Enter a file's name"
                    className='filter'
                    defaultValue={this.state.filterName}
                    onChange={this.onChangeFilterData}
                />
            </div>
        )
    }
}

const mapStateToProps =({files}) => {
    return { files }
}
export default connect(mapStateToProps)(FilterSpan)
