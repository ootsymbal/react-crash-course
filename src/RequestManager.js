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

    source = null;

    request = ()=> {
        
        this.source = axios.CancelToken.source();
        
        axios.get(url, {
            cancelToken: this.source.token
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
          this.toogleUrl();
    }

    stopRequest = ()=> {
        this.source.cancel();
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