import '../App.css'
// import logo from '../jefferson_logo.png'
import { faAnglesLeft, faAnglesRight, faChartPie, faCircleInfo, faHouse, faReceipt, faUser } from '@fortawesome/free-solid-svg-icons'
import SidebarBtn from './sidebar_btn'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../jefferson_logo.png'
import { useState } from 'react'
import { EDITOR_ESTADISTICA, EDITOR_INFORMACION, EDITOR_INICIO, EDITOR_PEDIDOS } from '../modules/constants.mjs'
function Sidebar(props) {
  const [sidebarClasses, setSidebarClasses] = useState('sidebar');
  function toggleNavbarHide() {
    setSidebarClasses(
      sidebarClasses.includes('sidebarHidden') ?
        'sidebar' :
        'sidebar sidebarHidden'
    )
  }
  const conditionalBtn = (args, el) => props.availableEditors.includes(args) ? el : "";
  return (
    <>
    <div className={sidebarClasses}>
      <ul className='sidebar_ul'>
        {/* {/* TODO: (opcional) mostrar foto en la derecha */}
        {/* <li><img src={logo} className="button_like_logo" alt='Jefferson Logo'/></li> */}
        {conditionalBtn(EDITOR_INICIO, <li><SidebarBtn icon={faHouse} value={EDITOR_INICIO} selectEditor={props.selectEditor} /></li>)}
        {conditionalBtn(EDITOR_PEDIDOS,<li><SidebarBtn icon={faReceipt} value={EDITOR_PEDIDOS} selectEditor={props.selectEditor} /></li>)}
        {conditionalBtn(EDITOR_ESTADISTICA, <li><SidebarBtn icon={faChartPie} value={EDITOR_ESTADISTICA} selectEditor={props.selectEditor} /></li>)}
        {conditionalBtn(EDITOR_INFORMACION, <li><SidebarBtn icon={faCircleInfo} value={EDITOR_INFORMACION} selectEditor={props.selectEditor}/></li>)}
      </ul>

      <ul className='sidebar_ul'>
        <li><SidebarBtn className='sidebar_btn_2' icon={faUser} value="Usuarios" selectEditor={props.selectEditor}/></li>
        <li><SidebarBtn className='sidebar_btn_2' icon={faAnglesLeft} hideNavbar={toggleNavbarHide}/></li>
      </ul>
      </div>
      <div className='sidebarReveal'>
        <ul className='sidebarReveal_ul'>
          <SidebarBtn className='sidebarReveal_btn' icon={faAnglesRight} hideNavbar={toggleNavbarHide}/>
        </ul>
      </div>
    </>
  )
}
export default Sidebar