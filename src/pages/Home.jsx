import { useEffect, useState } from 'react';
import '../styles/Home.scss';
import FilesForm from '../components/FilesForm';
import Menu from '../components/Menu';

function Home() {

  function scroll(id) {
    let targetPos = document.getElementById(id).getBoundingClientRect()
    let remSize = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size'))
    window.scrollTo(0, targetPos.top + window.scrollY - 8*remSize) 
  }

  return (
    <div className="Home">
      <Menu settings={[
        { 'target': 'decode-me', 'title' : 'Data transparancy' },
        { 'target': 'request-data', 'title' : 'Request your data' },
        { 'target': 'get-started', 'title' : 'DecodeMe!' }
      ]}/>

      <header className='header'>
        <div className="header__img">
          <img src="/assets/img/banner.png" />
        </div>
        <div className='header__txt'>
          <h1 className='title'>DecodeMe</h1>
          <h2 className='subtitle'>From transparancy to insight</h2>
          <a className='btn--cta' onClick={ () => { scroll('get-started') }}>DecodeMe now!</a>
        </div>
      </header>

      <main>
        <section className='width--50' id='decode-me'>
          <h1>Data trans&shy;parancy</h1>
          <p>Thanks to the GDPR every company is required to share the data they have on you at your request. 
            This is done to provide transparancy, but the response is often a JSON or other data file. This is not easily accessible for most people, and counteracts the transparancy. 
            This results in people still not being able to get any meaningful insight into their data. </p>
          <h2>Why use DecodeMe?</h2>
          <p className='intro'></p>
          <p>DecodeMe is a website that turns <i>transparancy</i> into <i>insightfulness</i>. This is done by allowing you to upload your JSON files and get a visualised overview of the contents back. 
            This data overview is designed to give you insights and help you make a educated choices regarding your data protection. 
            DecodeMe helps you request your data and provides links to interesting articles that discuss data privacy and give tips.
            This is done to help you on your way on the data protection journey</p>
          <p>Of course DecodeMe does not save any of the data uploaded by you, not even in sessions or cookies. As soon as you quit the website all the data is gone. 
            This is done to provide you with the safest environment to explore and learn about your data.</p>
        </section>

        <section className='width--50' id='request-data'>
          <h1>Request your data</h1>
          <p>For requesting your Chrome data from Google, here are the steps to follow using Google Takeout:</p>
          <ol>
            <li>Visit the Google Takeout website: <a href="https://takeout.google.com/">https://takeout.google.com/</a>.</li>
            <li>Sign in to your Google Account.</li>
            <li>Select "Chrome" from the list of available products and services.</li>
            <li>Customize your Chrome data export options if desired.</li>
            <li>Choose the export method, either email or cloud storage.</li>
            <li>Configure export frequency and file size as needed.</li>
            <li>Click "Create export" to initiate the data export process.</li>
            <li>Wait for the export to complete (an email notification will be sent).</li>
            <li>Access and download your Chrome data from the provided link or chosen destination.</li>
          </ol>
          <p>By following these steps, you can easily request and obtain your Chrome data from Google.</p>
        </section>

        <section className='width--100' id='get-started'>
          <h1>DecodeMe!</h1>
          <p>Decode your requested files and unlock valuable insights. Upload the files you received in response to your data requests, 
            and our decoding process will analyze and visualize the contents, providing you with a clear overview. <br />
            Your privacy is our priority - we don't store any uploaded data, ensuring complete confidentiality. 
            Once the decoding is complete, all data is permanently deleted. 
            Discover hidden information in your data and make informed decisions about your digital footprint. DecodeMe now!</p>
          <hr />
          <FilesForm />

        </section>
      </main>

      <footer>
        <p>&copy; 2023 - Niek Rottier</p>
      </footer>
    </div>
  );
}

export default Home;
