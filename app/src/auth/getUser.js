import {API} from '../config'


export const getUser = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
        method: 'GET', 
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
}