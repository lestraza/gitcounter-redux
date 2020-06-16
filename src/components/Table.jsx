import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortDataAction } from '../actions/actions';

class Table extends Component {

    onClickSortData(prop) {
        const { sortField, renderFiles } = this.props
        this.props.dispatch(sortDataAction(prop, sortField, renderFiles))
    }

    render() {
        const { renderFiles } = this.props
        return (
            <table className="table" border="1">
                <tbody>
                    <tr className='titles'>
                        <th className="table__file_name title" onClick={() => this.onClickSortData('fileName')}>Имя файла</th>
                        <th className="table__row_amount title" onClick={() => this.onClickSortData('amountLines')}>Всего строк</th>
                        <th className="table__code title" onClick={() => this.onClickSortData('amountCodeLines')}>Код</th>
                        <th className="table__comment title" onClick={() => this.onClickSortData('amountComments')}>Комментарии</th>
                        <th className="table__empty title" onClick={() => this.onClickSortData('amountEmptyLines')}>Пустые</th>
                    </tr>

                    {renderFiles.length > 0 && (
                        renderFiles.map((file, key) => {
                            return (
                                <tr key={key}>
                                    <td className='table__column__file_name content'>{file.fileName}</td>
                                    <td className='table__column__row_amount content'>{file.amountLines}</td>
                                    <td className='table__column__code content'>{file.amountCodeLines}</td>
                                    <td className='table__column__comment content'>{file.amountComments}</td>
                                    <td className='table__column__empty content'>{file.amountEmptyLines}</td>
                                </tr>
                            )
                        })
                    )}
                </tbody>
            </table>
        )
    }
}
const mapStateToProps = ({ files, renderFiles, sortField }) => {
    return {
        files, renderFiles, sortField
    }
}

export default connect(mapStateToProps)(Table)