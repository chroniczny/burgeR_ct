import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-rct.firebaseio.com/'
});

export default instance;
