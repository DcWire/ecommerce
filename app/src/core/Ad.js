import {API} from '../config'

export const getAds = () => {
    return fetch(`${API}/ad/all`, {method: 'GET'})
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const getOneAd = (adId) => {
    
    return fetch(`${API}/ad/read/${adId}`, {
        method: 'GET',
       
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

export const getMyAd = (userId, token) => {
    return fetch(`${API}/ad/myad/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
        
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

export const createAd = (userId, token, ad) => {
    return fetch(`${API}/ad/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`        
        },
        body: JSON.stringify(ad)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

export const getCategories = () => {
    return fetch(`${API}/category/all`, {
        method: 'GET'
        })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}