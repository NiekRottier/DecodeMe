import './styles/Home.scss';

function Home() {
  return (
    <div className="Home">
      <menu>
        <a href="#" className="home-icon"><img src="/assets/icons/home.svg" alt="" /></a>
        <a href="#data-insight">Data collection</a>
        <a href="#request-data">Get your data</a>
        <a href="#decode-me">DecodeMe</a>
      </menu>

      <header className='header'>
        <div className="header__img">
          <img src="/assets/img/banner.png" />
        </div>
        <div className='header__txt'>
          <h1 className='title'>DecodeMe</h1>
          <h2 className='subtitle'>Do you know what is being collected about you?</h2>
          <a className='btn--cta' href="#decode-me">DecodeMe now!</a>
        </div>
      </header>

      <main>
        <section className='width--50' id='data-insight'>
          <h1>Data collection</h1>
          <p className="intro">In maximus, metus eu mollis vulputate, magna nunc posuere leo, eget tempus neque neque a est. Sed imperdiet vitae turpis sed blandit.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies convallis neque, in scelerisque nisi tincidunt nec. Vivamus quis nisl arcu. Fusce sed sagittis felis, in fermentum tortor. In luctus felis ac interdum imperdiet. Praesent imperdiet lacinia neque a ornare. Curabitur ultricies sit amet dolor ac commodo. Fusce consequat, lorem id blandit vulputate, augue mi lobortis erat, non gravida mi quam at nisl. Morbi eu egestas risus. Maecenas rutrum eros ex, vestibulum ultricies purus faucibus eu. Sed urna lorem, tincidunt vitae ex in, bibendum sagittis augue. Fusce dignissim urna nisi, rhoncus rutrum nulla accumsan sit amet.</p>
          <h2>Header 2</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies convallis neque, in scelerisque nisi tincidunt nec. Vivamus quis nisl arcu. Fusce sed sagittis felis, in fermentum tortor. In luctus felis ac interdum imperdiet. Praesent imperdiet lacinia neque a ornare. Curabitur ultricies sit amet dolor ac commodo. Fusce consequat, lorem id blandit vulputate, augue mi lobortis erat, non gravida mi quam at nisl. Morbi eu egestas risus. Maecenas rutrum eros ex, vestibulum ultricies purus faucibus eu. Sed urna lorem, tincidunt vitae ex in, bibendum sagittis augue. Fusce dignissim urna nisi, rhoncus rutrum nulla accumsan sit amet.</p>
        </section>

        <section className='width--50' id='request-data'>
          <h1>Get your data</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies convallis neque, in scelerisque nisi tincidunt nec. Vivamus quis nisl arcu. Fusce sed sagittis felis, in fermentum tortor. In luctus felis ac interdum imperdiet. Praesent imperdiet lacinia neque a ornare. Curabitur ultricies sit amet dolor ac commodo. Fusce consequat, lorem id blandit vulputate, augue mi lobortis erat, non gravida mi quam at nisl. Morbi eu egestas risus. Maecenas rutrum eros ex, vestibulum ultricies purus faucibus eu. Sed urna lorem, tincidunt vitae ex in, bibendum sagittis augue. Fusce dignissim urna nisi, rhoncus rutrum nulla accumsan sit amet.</p>
          <h2>Header 2</h2>
          <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum vel malesuada purus. Phasellus vulputate odio at tortor ultrices, a tempus justo dignissim. Donec ipsum nibh, feugiat at est eu, egestas suscipit felis. Aliquam non pellentesque enim. In sed lorem non nisl iaculis placerat. Etiam fringilla orci eu maximus eleifend. Praesent sagittis velit eu dui tempus aliquam sit amet at lectus. Vestibulum sollicitudin mi eu lorem placerat, sed hendrerit lectus vulputate.</p>
        </section>

        <section className='width--100' id='decode-me'>
          <h1>DecodeMe!</h1>
          <p className="intro">Introduction sentence</p>
          <p>Paragraph with <i>italic</i>, <b>bold</b> and <b><i>bold-italic</i></b> text. <a href="/">I am a pretty link.</a></p>
          <a className="btn--white" href='/decoder'>Click me!</a>
        </section>
      </main>

      <footer>
        <p>&copy; 2023 - Niek Rottier</p>
      </footer>
    </div>
  );
}

export default Home;
