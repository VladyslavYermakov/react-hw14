import './App.css';
import { Component } from 'react';
import GifSearch from './components/GifSearch';
import GifList from './components/GifList';
import axios from 'axios';
const API_KEY = "55488164-a39d12eb388c39119286251f6" //може колись перенесемо (ні)
const BASE_URL = "https://pixabay.com/api/"
class App extends Component {
  state = {
    page: 1,
    total: 0,
    word: "cat",
    gifs: [],
  }
  componentDidMount(){
    this.fetchGifs()
  }
  componentDidUpdate(prevProps, prevState){
    if (prevState.word !== this.state.word || this.state.page !== prevState.page) {
      this.fetchGifs();
    }
  }
  previous = () => {
    this.setState(prev => ({page: prev.page - 1}))
  }
  next = () => {
    this.setState(prev => ({page: prev.page + 1}))
  }
  fetchGifs = async () => {
    try {
      const res = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          q: this.state.word,
          image_type: "all",
          limit: 12,
          page: this.state.page
        }
      })
      this.setState({
        gifs: res.data.hits, 
        total: res.data.totalHits})
    }catch(e) {
      console.log(e)
    }
  }
  handleSearch = (word) => {
    this.setState({
      word: word,
    })
    console.log(this.state.word)
  }
  changeKeyword = word => {
    this.setState({keyword: word})
  }
  render(){
    const totalPages = Math.ceil(this.state.total / 12)
    return (
      <>
        <GifSearch onSearch={this.handleSearch} changeKeyword={this.changeKeyword}/>
        <GifList gifs={this.state.gifs}/>
        <span className='pages'>page {this.state.page} out of {totalPages}</span>
        <div className='nav-buttons'>
        <button onClick={this.previous} disabled={this.state.page <= 1} className='previousbtn'>Previous</button>
        <button onClick={this.next} disabled={this.state.page >= totalPages} className='nextbtn'>Next</button>
        </div>
      </>
    )
  }
}

export default App;
