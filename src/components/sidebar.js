import '../App.css'
import logo from '../jefferson_logo.png'
import { faAnglesLeft, faChartPie, faCircleInfo, faHouse, faUser } from '@fortawesome/free-solid-svg-icons'
import SidebarBtn from './sidebar_btn'
function Sidebar(props) {

  return (
    <div className='sidebar'>
      <ul className='sidebar_ul'>
        {/* TODO: (opcional) mostrar foto en la derecha
        <li><img src={logo} className="button_like_logo" alt='Jefferson Logo'/></li> */}
        <li><SidebarBtn icon={faHouse} value="Inicio" selectEditor={props.selectEditor}/></li>
        <li><SidebarBtn icon={faChartPie} value="Estadistica" selectEditor={props.selectEditor}/></li>
        <li><SidebarBtn icon={faCircleInfo} value="Informacion" selectEditor={props.selectEditor}/></li>
      </ul>

      <ul className='sidebar_ul'>
        <li><SidebarBtn className='sidebar_btn_2' icon={faUser} value="Usuarios" selectEditor={props.selectEditor}/></li>
        <li><SidebarBtn className='sidebar_btn_2' icon={faAnglesLeft} selectEditor={props.selectEditor}/></li>
      </ul>
    </div>
  )
}
export default Sidebar