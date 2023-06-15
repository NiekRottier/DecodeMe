import { useEffect, useState } from 'react';
import '../styles/Home.scss';
import FilesForm from '../components/FilesForm';

function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuIcon, setMenuIcon] = useState('/assets/icons/menu.svg')

  useEffect(() => {
    if (menuOpen) {
      setMenuIcon('/assets/icons/xmark.svg')
    } else {
      setMenuIcon('/assets/icons/menu.svg')
    }
  }, [menuOpen])

  function scroll(id) {
    let targetPos = document.getElementById(id).getBoundingClientRect()
    let remSize = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size'))
    window.scrollTo(0, targetPos.top + window.scrollY - 8*remSize) 
  }

  return (
    <div className="Home">
      <menu className={menuOpen ? 'active' : ''}>
        <a onClick={ () => setMenuOpen(!menuOpen) } className='menu-icon'><img src={menuIcon} alt="close icon" /></a>
        <a onClick={() => setMenuOpen(false)} href="#" className="home-icon"><img src="/assets/icons/home.svg" alt="home icon" /></a>
        <a onClick={ () => { scroll('decode-me'); setMenuOpen(false) }}>Data transparancy</a>
        <a onClick={ () => { scroll('request-data'); setMenuOpen(false) }}>Request your data</a>
        <a onClick={ () => { scroll('get-started'); setMenuOpen(false) }}>DecodeMe!</a>
      </menu>

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
          <p className='intro'>DecodeMe is a website that turns transparancy into insightfulness.</p>
          <p>This is done by allowing you to upload your JSON files and get a visualised overview of the contents back. 
            This data overview is designed to give you insights and help you make a educated choices regarding your data protection. 
            DecodeMe helps you request your data and provides links to interesting articles that discuss data privacy and give tips.
            This is done to help you on your way on the data protection journey</p>
          <p>Of course DecodeMe does not save any of the data uploaded by you, not even in sessions or cookies. As soon as you quit the website all the data is gone. 
            This is done to provide you with the safestenvironment to explore and learn about your data.</p>
        </section>

        <section className='width--50' id='request-data'>
          <h1>Request your data</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies convallis neque, in scelerisque nisi tincidunt nec. Vivamus quis nisl arcu. Fusce sed sagittis felis, in fermentum tortor. In luctus felis ac interdum imperdiet. Praesent imperdiet lacinia neque a ornare. Curabitur ultricies sit amet dolor ac commodo. Fusce consequat, lorem id blandit vulputate, augue mi lobortis erat, non gravida mi quam at nisl. Morbi eu egestas risus. Maecenas rutrum eros ex, vestibulum ultricies purus faucibus eu. Sed urna lorem, tincidunt vitae ex in, bibendum sagittis augue. Fusce dignissim urna nisi, rhoncus rutrum nulla accumsan sit amet.</p>
          <h2>Header 2</h2>
          <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum vel malesuada purus. Phasellus vulputate odio at tortor ultrices, a tempus justo dignissim. Donec ipsum nibh, feugiat at est eu, egestas suscipit felis. Aliquam non pellentesque enim. In sed lorem non nisl iaculis placerat. Etiam fringilla orci eu maximus eleifend. Praesent sagittis velit eu dui tempus aliquam sit amet at lectus. Vestibulum sollicitudin mi eu lorem placerat, sed hendrerit lectus vulputate.</p>
        </section>

        <section className='width--100' id='get-started'>
          <h1>DecodeMe!</h1>
          <p className="intro">Introduction sentence</p>
          <p>Paragraph with <i>italic</i>, <b>bold</b> and <b><i>bold-italic</i></b> text. <a href="/">I am a pretty link.</a></p>
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
