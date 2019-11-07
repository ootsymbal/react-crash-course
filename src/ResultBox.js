import React from 'react';
import Button from './Button';

class ResultBox extends React.Component {
    render() {
        return (
            <>
                <div>{this.props.massage ? this.props.massage : this.props.error}</div>
                {this.props.error &&
                    <Button action={this.props.action} name={'Повторить запрос'}/>
                }
            </>
        )
    }
}

export default ResultBox;