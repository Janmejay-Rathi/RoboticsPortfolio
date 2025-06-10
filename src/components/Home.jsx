import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';
import '../styles/Home.css';

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch(console.error);
  }, []);

  if (!data) return <FallbackSpinner />;

  return (
    <Fade>
      <section className="hero-section">
        <div className="hero-column hero-left">
          <img src="/images/home/me.png" alt="Me" className="hero-left-img" />
        </div>

        <div className="hero-column hero-center">
          <div className="hero-content">
            <h1>{data.name}</h1>
            <div className="typewriter-wrapper">
              <h2 className="static-text">I&apos;m&nbsp;</h2>
              <h2 className="typewriter-text">
                <Typewriter
                  options={{
                    loop: true,
                    autoStart: true,
                    strings: data.roles,
                  }}
                />
              </h2>
            </div>
            <Social />
          </div>
        </div>

        <div className="hero-column hero-right">
          <img src="/images/home/drone.png" alt="Drone" className="hero-right-img" />
        </div>
      </section>
    </Fade>
  );
}

export default Home;
