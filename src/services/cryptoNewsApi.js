import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders={
  'x-rapidapi-key': 'e8762a35e9msh8dd83724c86623ep1baedcjsnb1781d32a660',
  'x-rapidapi-host': 'bing-search-apis.p.rapidapi.com'
}

const axios = require('axios');

const baseUrl='https://bing-search-apis.p.rapidapi.com/api/rapid/web_search?keyword=how-to-use-excel-for-free&page=0&size=30';


const createRequest=(url)=>({url,headers:cryptoApiHeaders});

export const cryptoNewsApi=createApi({
  reducerPath:'cryptoNewsApi',
  
  baseQuery:fetchBaseQuery({baseUrl}),
  endpoints:(builder)=>({
    getCryptoNews: builder.query({
      query: ({count}) => createRequest(`news/top/${count}`),
      
      
    })
  })
});

export const {
    useGetCryptoNewsQuery,
}=cryptoNewsApi;


/*const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://google-news13.p.rapidapi.com/latest',
  params: {lr: 'en-US'},
  headers: {
    'X-RapidAPI-Key': 'e8762a35e9msh8dd83724c86623ep1baedcjsnb1781d32a660',
    'X-RapidAPI-Host': 'google-news13.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}*/



/*
const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://coinranking1.p.rapidapi.com/coins',
  params: {
    referenceCurrencyUuid: 'yhjMzLPhuIDl',
    timePeriod: '24h',
    'tiers[0]': '1',
    orderBy: 'marketCap',
    orderDirection: 'desc',
    limit: '50',
    offset: '0'
  },
  headers: {
    'X-RapidAPI-Key': 'f87e4e951bmsh51457290d04f922p1053c8jsnfd8e8334811f',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}*/