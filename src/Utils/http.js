import axios from 'axios';

const baseUrl = '';

const token = () => {
    if(localStorage.getItem('token')) {
        return `token ${localStorage.getItem('tokens')}`
    }
    else{
        return undefined
    }
};


export const Post = (domain, Params) => {
    return axios
        .post(baseUrl + domain, Params, {
            headers: {
                Authorization: token(),
            },
            origin: '127.0.0.1.8000',
        })
        .then(res => res.data)
};

 export const Get = (domain) => {
    return axios
        .get(baseUrl + domain, {
            headers: {
                Authorization: token(),
            },
            origin: '127.0.0.1.8000',
        })
        .then(res => res.data)
};

export const Delete = (domain, Params) => {
    return axios
        .delete(baseUrl + domain, {
            headers: {
                Authorization: token(),
            },
            data:Params
        })
        .then(res => res.data)
};

export const Put = (domain, Params) => {
    return axios
        .put(baseUrl + domain,
            Params ,
            {
                headers: {
                    Authorization: token(),
                }
            })
        .then(res => res.data)
};