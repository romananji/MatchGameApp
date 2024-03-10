import './index.css'

const TabItem = props => {
  const {tabItemDeatils, onCheckImageId} = props
  const {id, imageUrl, thumbnailUrl, category} = tabItemDeatils
  const onClickItem = () => {
    onCheckImageId(id)
  }
  return (
    <li className="list-item">
      <button className="list-item-button">
        <img
          src={thumbnailUrl}
          alt="thumbnail"
          className="list-image"
          onClick={onClickItem}
        />
      </button>
    </li>
  )
}
export default TabItem
