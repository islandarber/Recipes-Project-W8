import React from 'react'
import './Footer.css'
import githubMark from '../github-mark.png';

function Footer() {
  return (
    <div className='footer'>
        <a href="https://github.com/islandarber/Cookbook-Advertise" target='_blank'>
          <img src={githubMark} alt="GitHub" />
        </a>
        <p>Created by <a href="https://github.com/TeeAtlas" target='_blank'>Tania</a> and <a    href='https://github.com/islandarber' target='_blank'>Christina</a>
        </p>
        <div className='copy-terms'>
          <p>
            <a href="">Terms of Use</a>
            |
            <a href="">Privacy Policy</a>
          </p>
          <p>Copyright &copy; 2024</p>
        </div>
    </div>
  )
}

export default Footer