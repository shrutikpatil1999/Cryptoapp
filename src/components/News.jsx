import React, { useState, useEffect } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
// Import the specific news API library you choose (e.g., axios for News API)
import axios from 'axios'; // Example for News API
import Loader from './Loader';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('general'); // Adjust default category for your chosen API
  const [cryptoNews, setCryptoNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // API endpoint and key (replace with yours)
  const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
  const baseUrl = 'https://newsapi.org/v2/everything?'; // Example for News API

  // Function to fetch news based on category
  const fetchNews = async (category) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.get(baseUrl, {
        params: {
          q: category, // Replace with appropriate query parameter for your API
          sortBy: 'publishedAt', // Sort by published date (adjust as needed)
          apiKey,
        },
      });

      setCryptoNews(response.data.articles); // Adjust data structure for your API
    } catch (error) {
      setErrorMessage('Error fetching news. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch news on component mount (or update based on chosen category)
  useEffect(() => {
    fetchNews(newsCategory);
  }, [newsCategory]);

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Category"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {/* Adjust category options based on your chosen API */}
            <Option value="general">General</Option>
            <Option value="business">Business</Option>
            <Option value="entertainment">Entertainment</Option>
            <Option value="health">Health</Option>
            <Option value="science">Science</Option>
            <Option value="sports">Sports</Option>
            <Option value="technology">Technology</Option>
          </Select>
        </Col>
      )}
      {cryptoNews.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                <img
                  src={
                    news.urlToImage || // Use preferred image property for your API
                    demoImage
                  }
                  alt=""
                />
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.source?.urlToImage || demoImage} alt="" />
                  <Text className="provider-name">
                    {news.source?.name || 'Unknown Source'} // Handle missing source
                  </Text>
                </div>
                <Text>{moment(news.published)
                .fromNow()}
                </Text>
              </div>
            </a>
              </Card>
            </Col>
          ))}
        </Row>
      );
    };
    
    export default News;