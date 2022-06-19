import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function SidebarBtn(props) {
  function handleOnClick() {
    props.selectEditor(props.value)
  }
  return (
    <button className={props.className || 'sidebar_btn'} value={props.value} onClick={handleOnClick}>
      <FontAwesomeIcon className='sidebar_li_icon' icon={props.icon} />
    </button>
  )
}
export default SidebarBtn