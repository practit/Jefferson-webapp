import '../App.css'
// import logo from '../jefferson_logo.png'
import { faAnglesLeft, faAnglesRight, faChartPie, faCircleInfo, faHouse, faReceipt, faUser } from '@fortawesome/free-solid-svg-icons'
import SidebarBtn from './sidebar_btn'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../jefferson_logo.png'
import { useState } from 'react'
function Sidebar(props) {
  const [sidebarClasses, setSidebarClasses] = useState('sidebar');
  function toggleNavbarHide() {
    setSidebarClasses(
      sidebarClasses.includes('sidebarHidden') ?
        'sidebar' :
        'sidebar sidebarHidden'
    )
  }
  return (
    <>
    <div className={sidebarClasses}>
      <ul className='sidebar_ul'>
        {/* {/* TODO: (opcional) mostrar foto en la derecha */}
        {/* <li><img src={logo} className="button_like_logo" alt='Jefferson Logo'/></li> */}
        <li><SidebarBtn icon={faHouse} value="Inicio" selectEditor={props.selectEditor}/></li>
        <li><SidebarBtn icon ={faReceipt} value="Pedidos" selectEditor={props.selectEditor}/></li>
        <li><SidebarBtn icon={faChartPie} value="Estadistica" selectEditor={props.selectEditor}/></li>
        <li><SidebarBtn icon={faCircleInfo} value="Informacion" selectEditor={props.selectEditor}/></li>
      </ul>

      <ul className='sidebar_ul'>
        <li><SidebarBtn className='sidebar_btn_2' icon={faUser} value="Usuarios" selectEditor={props.selectEditor}/></li>
        <li><SidebarBtn className='sidebar_btn_2' icon={faAnglesLeft} hideNavbar={toggleNavbarHide}/></li>
      </ul>
      </div>
      <div className='sidebarReveal'>
        <ul className='sidebarReveal_ul'>
          <SidebarBtn className='sidebar_btn_2' icon={faAnglesRight} hideNavbar={toggleNavbarHide}/>
        </ul>
      </div>
    </>
  )
}
export default Sidebar