import { Component } from "react";

export default class GifSearch extends Component {
    state = {
        inputValue: "",
    }
    handleChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.onSearch(this.state.inputValue)
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="search-container">
                <input onChange={this.handleChange} type="text" value={this.state.inputValue} className="inputSearch"/>
                <button className="btnSearch">SEARCH</button>
            </form>
        )   
    }
}