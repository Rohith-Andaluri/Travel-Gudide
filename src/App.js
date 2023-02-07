import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './App.css'

// Replace your code here
class App extends Component {
  state = {isLoading: true, tourPackagesData: []}

  componentDidMount() {
    this.getToursData()
  }

  getToursData = async () => {
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const formattedData = data.packages.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      imageUrl: eachItem.image_url,
      description: eachItem.description,
    }))
    console.log(formattedData)
    this.setState({tourPackagesData: formattedData, isLoading: false})
  }

  render() {
    const {tourPackagesData, isLoading} = this.state
    return (
      <div className="main-container">
        <h1 className="heading">Travel Guide</h1>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul className="tour-packages-container">
            {tourPackagesData.map(eachItem => (
              <li key={eachItem.id} className="tour-package">
                <img
                  src={eachItem.imageUrl}
                  alt={eachItem.name}
                  className="tour-image"
                />
                <div className="tour-desc-container">
                  <h1 className="tour-heading">{eachItem.name}</h1>
                  <p className="tour-desc">{eachItem.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}
export default App
