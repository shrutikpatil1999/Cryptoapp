import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Title, Text } = Typography;

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://google-news13.p.rapidapi.com/business?lr=en-US',
        {
          headers: {
            'x-rapidapi-key': 'f87e4e951bmsh51457290d04f922p1053c8jsnfd8e8334811f',
            'x-rapidapi-host': 'google-news13.p.rapidapi.com',
          },
        }
      );

      setNews(response.data.items); // ✅ correct
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <Row gutter={[24, 24]}>
      {news.map((item, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card hoverable>
            <a href={item.newsUrl} target="_blank" rel="noreferrer">
              <Title level={4}>{item.title}</Title>
              <Text type="secondary">
                {moment(item.published).fromNow()}
              </Text>
              <p>{item.snippet}</p>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
