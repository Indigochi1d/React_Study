import React from 'react';
import { useParams } from 'react-router-dom';
import Categories from '../Components/Categories';
import NewsList from '../Components/NewsList.js'
const NewsPage = () => {
    const params = useParams();
    const category = params.category || 'all';

    return (
        <>
          <Categories />  
          <NewsList category={category}/>
        </>
    );
};

export default NewsPage;