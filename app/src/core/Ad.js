import {API} from '../config'

export const getAds = () => {
    return fetch(`${API}/ad/all`, {method: 'GET'})
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}