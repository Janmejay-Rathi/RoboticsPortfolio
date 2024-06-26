import React, { useEffect, useState, useContext } from 'react';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import { Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/experience.css';

const styles = {
  ulStyle: {
    listStylePosition: 'outside',
    paddingLeft: 20,
  },
  subtitleContainerStyle: {
    marginTop: 10,
    marginBottom: 10,
  },
  subtitleStyle: {
    display: 'inline-block',
  },
  inlineChild: {
    display: 'inline-block',
  },
  itemStyle: {
    marginBottom: 10,
  },
  iconStyle: {
    height: '50px', // Adjust size as needed
    marginRight: '10px',
  },
};

// Simple hash function for generating unique keys
function simpleHash(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    const char = input.charCodeAt(i);
    hash = (hash * 31) + char; // Multiply hash by a prime number and add char code
    hash = Math.trunc(hash);
  }
  return Math.abs(hash); // Ensure the hash is a positive number
}

function Experience({ header }) {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.experiences, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res.experiences))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />

      {data ? (
        <div className="section-content-container">
          <Container>
            <Timeline
              lineColor={theme.timelineLineColor}
            >
              {data.map((item) => (
                <Fade key={item.title + item.dateText}>
                  <TimelineItem
                    dateText={item.dateText}
                    dateInnerStyle={{ background: theme.accentColor }}
                    style={styles.itemStyle}
                    bodyContainerStyle={{ color: theme.color }}
                  >
                    {item.icon && (
                      <img
                        src={item.icon.src}
                        alt={item.title}
                        style={styles.iconStyle}
                      />
                    )}
                    <h2 className="item-title">
                      {item.title}
                    </h2>
                    <div style={styles.subtitleContainerStyle}>
                      <h4 style={{ ...styles.subtitleStyle, color: theme.accentColor }}>
                        {item.subtitle}
                      </h4>
                      {item.workType && (
                      <h5 style={styles.inlineChild}>
                  &nbsp;·
                        {' '}
                        {item.workType}
                      </h5>
                      )}
                    </div>
                    <ul style={styles.ulStyle}>
                      {item.workDescription.map((point) => (
                        <div key={simpleHash(point)}>
                          <li>
                            <ReactMarkdown
                              children={point}
                              components={{
                                a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
                                p: 'span',
                              }}
                            />
                          </li>
                          <br />
                        </div>
                      ))}
                    </ul>
                  </TimelineItem>
                </Fade>
              ))}
            </Timeline>
          </Container>
        </div>
      ) : <FallbackSpinner />}
    </>
  );
}

Experience.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Experience;
