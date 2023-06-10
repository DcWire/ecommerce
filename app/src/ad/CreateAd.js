import React, {useState, useEffect} from 'react';
import Navbar from '../core/Navbar';
import {createAd, getCategories} from '../core/Ad';
import { stringify } from 'uuid';
import {API} from '../config';

const CreateAd = () => {

    const [submitClicked, setSubmitClicked] = useState(false);

    const [values, setValues] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        postedBy: "",
        categories: []
    });

    
    const {title, description, price, category, categories} = values;
    const data = JSON.parse(localStorage.getItem('jwt'));
    const token = data.token;
    const postedBy = data.user.email;
    
    // console.log(categories);

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value});
    };

    const Categories = () => {
        return fetch(`${API}/category/all`, {
            method: 'GET'
            })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if(data.error) {
                console.log(data.error, " in Categories()");
            }
            else {
                setValues({
                    ...values,
                    categories: data
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        createAd(data.user._id, token, {title, description, price, category, postedBy})
        .then(data => {
            if(data.error) {
                console.log(data.error)
            }
            else {
                
                setValues({
                    ...values,
                    title: "",
                    description: "",
                    price: "",
                    category: "",
                });
            }
        })
        .catch(err => {
            console.log(err);
        })

    }

    const selectOptions = () => {
        return (
            categories?.map((category, index) => {
                return (
                    <option key={index} value={category.name}>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</option>
                );
            })
        );
        // return (
        //     <h1>Hello</h1>
        // )
    }
    useEffect(() => {
        setValues({
            ...values,
            postedBy: data.user.email
        });
        Categories();
    }, []);


    return (
        <div>
            <Navbar />
            <div className="container mt-5" style={{paddingRight: "200px", paddingLeft: "200px"}}>
                    <form>

                    <div className="form-group">
                        <label htmlFor="inputTitle">Title</label>
                        <input type="text" className="form-control" id="inputTitle" aria-describedby="titleHelp" placeholder="Enter title" name="title" value={title} onChange={handleChange('title')}></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputDesc">Description</label>
                        <input type="text" className="form-control" id="inputDesc" placeholder="Description" name="description" value={description} onChange={handleChange('description')}></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPrice">Price</label>
                        <input type="number" className="form-control" id="inputPrice" placeholder="Price" name="price" value={price} onChange={handleChange('price')} step="0.01" min="0"></input>
                    </div>

                    

                    <div className="form-group">
                        <label htmlFor="inputCategory">Category</label>
                        <select name="category" id="inputCategory" className="form-control" value={category} onChange={handleChange('category')}>
                            <option value="">Select Category</option>
                            {selectOptions()}

                       </select>
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={clickSubmit}>Submit</button>

                    </form>
                </div>
        </div>
    )
}

export default CreateAd;