import React from 'react';

import millify from 'millify';
import {Typography,Row,Col,Statistic} from 'antd';
import {Link} from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import {Cryptocurrencies,News} from '../components';

const {Title}=Typography;

const Homepage = () => {
  const {data, isFetching}=useGetCryptosQuery(10);    //hook
  console.log(data);
  
  const globalStats=data?.data?.stats;
  if(isFetching) return 'Loading....';
  
  return (
    <>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      <Row>
        
        <Col span={12}><Statistic title ="total Cyptocurrencies" value={millify(globalStats.total)} /></Col>
        <Col span={12}><Statistic title ="total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
        <Col span={12}><Statistic title ="total Market Cap" value={millify(globalStats.totalMarketCap)}/></Col>
        <Col span={12}><Statistic title ="total 24h volume" value={millify(globalStats.total24hVolume)} /></Col>
        <Col span={12}><Statistic title ="total Markets" value={millify(globalStats.totalMarkets)} /></Col>
        
      </Row>
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the World</Title>
        <Title level={3} className='show-more'><Link to="/cryptocurrencies">Show more</Link></Title>
      </div>
      <Cryptocurrencies simplified ={true}/>
      
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Latest Crypto News</Title>
        <Title level={3} className='show-more'><Link to="/news">Show more</Link></Title>
      </div>
      <News simplified/>
    </>
  )
}

export default Homepage