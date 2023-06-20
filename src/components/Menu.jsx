import { useEffect, useState } from 'react';
import '../styles/Menu.scss';

function Menu({settings}){
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuIcon, setMenuIcon] = useState('/assets/icons/menu.svg')
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    if (menuOpen) {
      setMenuIcon('/assets/icons/xmark.svg')
    } else {
      setMenuIcon('/assets/icons/menu.svg')
    }
  }, [menuOpen])

	// Scroll to specified element id
  function scroll(id) {
    let targetPos = document.getElementById(id).getBoundingClientRect()
    let remSize = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size'))
    window.scrollTo(0, targetPos.top + window.scrollY - 8*remSize) 
  }

	// Fill menuItems state 
	const renderMenuItems = () => {
		return settings.map(setting => <a key={crypto.randomUUID()} onClick={ () => { scroll(setting.target); setMenuOpen(false) }}>{setting.title}</a>)
	}

  return (
    <menu className={menuOpen ? 'menu active' : 'menu'}>
			<a onClick={ () => setMenuOpen(!menuOpen) } className='menu-icon'><img src={menuIcon} alt="close icon" /></a>
			<a onClick={() => setMenuOpen(false)} href="/" className="home-icon"><img src="/assets/icons/home.svg" alt="home icon" /></a>
			{renderMenuItems()}
    </menu>
  );
}

export default Menu;
