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
          <h1>Data Trans&shy;parancy</h1>
          <p>Thanks to the GDPR, every company in Europe is required to share the data they have on you upon your request. 
            However, the response typically comes in the form of a JSON or other data file, which is not easily accessible or 
            meaningful for most people. As a result, the intended transparency is hindered, and individuals struggle to gain valuable 
            insights from their data.</p>
          <h2>Introducing DecodeMe</h2>
          <p>DecodeMe is a website that aims to transform <i>transparency</i> into <i>insights</i>. By allowing you to upload your JSON files, 
            DecodeMe provides a visualized overview of the contents, enabling you to gain meaningful insights and make informed choices 
            regarding your data protection. In addition, DecodeMe helps you request your own data. Our goal is to assist you on your journey towards data protection.</p>
          <h2>Privacy and Security</h2>
          <p>At DecodeMe, your privacy and data security are of utmost importance. We do not store any of the data you upload, not even in sessions or cookies. 
            Once you leave the website, all your data is promptly erased. We want assure you can explore and learn about your data in the safest environment possible</p>
        </section>

        <section className='width--50' id='request-data'>
          <h1>Requesting your data</h1>
          <p>To request your Chrome data from Google, you can follow these steps using Google Takeout:</p>
          <ol>
              <li>Visit the <a target='_blank' href="https://takeout.google.com/">Google Takeout website</a>.</li>
              <li>Sign in to your Google Account.</li>
              <li>Among the list of available products and services, select "Chrome".</li>
              <li>Go to the next step and change the export settings to your preferences.</li>
              <li>Initiate the data export process by clicking on "Create export".</li>
              <li>Wait for the export to complete, which may take some time. You'll receive an email notification once it's finished.</li>
              <li>Access and download your Chrome data using the provided link or by visiting your chosen destination.</li>
          </ol>
          <p>By following these steps, you can easily request and obtain your Chrome data from Google. 
            After having received your data you can continue to the next step and start decoding yourself!</p>
        </section>

        <section className='decodeMe width--100' id='get-started'>
          <h1>DecodeMe!</h1>
          <p>Here you can upload your requested files to gain insight into your data. 
            Just upload the files that you have requested with Google Takeout and press the 'DecodeMe!' button.
            The application will start visualising your data, to provide you with a clear overview.
            The data files that are currently supported are seen next to the button. <br />
            Your privacy is our priority - we don't store any uploaded data, ensuring complete confidentiality. 
            Once the decoding is complete, all data is permanently deleted. <br />
            <b>Start Decoding yourself!</b>
          </p>
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
