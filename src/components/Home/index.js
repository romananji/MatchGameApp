import {Component} from 'react'
import './index.css'

import TabContainer from '../TabContainer'
import TabItem from '../TabItem'

class Home extends Component {
  constructor(props) {
    super(props)
    const {tabsList} = this.props
    const {tabId} = tabsList[0]
    const {imagesList} = this.props
    const {imageUrl, id} = imagesList[0]
    this.state = {
      tabId,
      imageUrl,
      imageId: id,
      score: 0,
      isTrue: false,
      seconds: 60,
    }
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    this.clearTimerInteval()
  }

  clearTimerInteval = () => {
    clearInterval(this.timerId)
  }

  tick = () => {
    const {seconds} = this.state
    const isCompleted = seconds === 0
    if (isCompleted) {
      this.clearTimerInteval()
      this.setState(obj => ({isTrue: !obj.isTrue, seconds: 0}))
    } else {
      this.setState(obj => ({seconds: obj.seconds - 1}))
    }
  }

  onChangeTabContainer = tabId => {
    this.setState({tabId})
  }

  onCheckImageId = id => {
    const {imageId} = this.state
    const {imagesList} = this.props
    const randomImageObj =
      imagesList[Math.floor(Math.random() * imagesList.length)]
    const randomImageUrl = randomImageObj.imageUrl
    if (id === imageId) {
      this.setState(obj => ({
        imageUrl: randomImageUrl,
        score: obj.score + 1,
        imageId: randomImageObj.id,
      }))
    } else {
      this.clearTimerInteval()
      this.setState(obj => ({isTrue: !obj.isTrue}))
    }
  }

  onResetGame = () => {
    const {tabId} = this.state
    const {imageUrl} = this.state
    const {imageId} = this.state
    const score = 0
    const isTrue = false
    const seconds = 60
    this.setState({
      tabId,
      imageUrl,
      imageId,
      score,
      isTrue,
      seconds,
    })
    this.timerId = setInterval(this.tick, 1000)
  }

  render() {
    const {imagesList} = this.props
    const {tabId, imageUrl, imageId, score, isTrue, seconds} = this.state
    const filterList = imagesList.filter(each => each.category === tabId)
    const {tabsList} = this.props
    return (
      <div className="bg-container">
        <nav className="nav-bar">
          <ul className="nav-bar-list">
            <li>
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
                alt="website logo"
                className="website-logo"
              />
            </li>
            <li className="scoreboard-container">
              <p className="score">
                score: <span className="span-element">{score}</span>
              </p>
              <div className="timer-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                  alt="timer"
                  className="timer-image"
                />
                <p className="timer">{seconds} sec</p>
              </div>
            </li>
          </ul>
        </nav>
        {isTrue ? (
          <diV className="card">
            <div className="result-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png "
                alt="trophy"
                className="trophy-image"
              />
              <p className="your-score">YOUR SCORE</p>
              <p className="scoree">{score}</p>
              <button
                className="play-again-button"
                onClick={this.onResetGame}
                type="button"
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                  alt="reset"
                  className="reset-image"
                />
                PLAY AGAIN
              </button>
            </div>
          </diV>
        ) : (
          <div className="card">
            <img src={imageUrl} alt="match" className="display-image" />
            <ul className="tabs-list">
              {tabsList.map(each => (
                <TabContainer
                  key={each.tabId}
                  tabDetails={each}
                  isTrue={tabId === each.tabId}
                  onChangeTabContainer={this.onChangeTabContainer}
                />
              ))}
            </ul>
            <ul className="tab-items-container">
              {filterList.map(each => (
                <TabItem
                  key={each.id}
                  tabItemDeatils={each}
                  onCheckImageId={this.onCheckImageId}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}
export default Home
