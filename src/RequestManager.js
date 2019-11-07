import React from 'react';
import Button from './Button';
import ResultBox from './ResultBox';
import axios from 'axios';


var url = 'https://jsonplaceholder.typicode.com/posts/1';

class RequestManager extends React.Component {

    state = {
        massage: '',
        massageError: ''
    }

    toogleUrl=()=> {
        if (url.includes('fake')) {
            url = url.replace('fake','');
        } else {
            url = url + 'fake';
        }
    }

    request = ()=> {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        axios.get(url, {
            cancelToken: source.token
          })
        .then(res => {
            const massage = res.data.body;
            this.setState(
                { 
                    massage: massage,
                    massageError: ''
                });
          })
          .catch(error => {
            this.setState({ 
                massageError: "error",
                massage: ""});
          })
          this.stopRequest = ()=> {
            source.cancel();
        };
          this.toogleUrl();
    }

    stopRequest = ()=> {

    }

    render() {
        return (
            <>
                <Button action={this.request} name={'Отправить запрос'}/>
                <Button action={this.stopRequest} name={'Остановить запрос'}/>
                <ResultBox massage={this.state.massage} error={this.state.massageError} action={this.request.bind(this)}/>
            </>
        )
    }
}

export default RequestManager;