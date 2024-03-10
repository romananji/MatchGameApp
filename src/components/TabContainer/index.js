import './index.css'

const TabContainer = props => {
  const {tabDetails, isTrue, onChangeTabContainer} = props
  const {tabId, displayText} = tabDetails
  const apply = isTrue ? 'selected-button' : ''
  const onChangeTab = () => {
    onChangeTabContainer(tabId)
  }
  return (
    <li className="tab-list-item">
      <button className={`tab-button ${apply}`} onClick={onChangeTab}>
        {displayText}
      </button>
    </li>
  )
}
export default TabContainer
