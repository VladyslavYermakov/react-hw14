import { Component } from "react";

export default class GifList extends Component {
    state = {
        selectedGif: null,
    }
    handleOpenModal = (gifUrl) => {
    this.setState({ selectedGif: gifUrl });
    };

    handleCloseModal = () => {
        this.setState({ selectedGif: null });
    };
    handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            this.handleCloseModal();
        }
    };
    render(){
        const {gifs} = this.props
        const { selectedGif } = this.state; 
        return (
            <div className="gif-grid">
            {gifs.map(gif => (
                <div key={gif.id} className="gif-card">
                    <h2 className="gif-title">{gif.tags}</h2>
                    <img src={gif.webformatURL} alt={gif.tags} className="gif-img" onClick={() => this.handleOpenModal(gif.largeImageURL || gif.webformatURL)}/>    
                </div>
                
                ))}
                {selectedGif && (
                <div className="modal-overlay" onClick={this.handleOverlayClick}>
                    <div className="modal-content">
                    <button className="close-btn" onClick={this.handleCloseModal}>x</button>
                    <img src={selectedGif} alt="Enlarged GIF" className="modal-img"/>
                    </div>
                </div>
                )}
            </div>
        )
    }
}