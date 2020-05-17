import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovie, setMovieLoading, toggleMovieModal } from '../../actions/movieSearchActions';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import Spinner from '../Layout/Spinner';

export class MovieModal extends Component {
    toggleModal = () => {
        this.props.toggleMovieModal()
    }
    componentDidUpdate(preProps) {
        if (!preProps.isMovieModalOpen)
            this.fetchData()
    }
    fetchData = () => {
        this.props.setMovieLoading();
        this.props.fetchMovie(this.props.movie.imdbID);
    }
    render() {
        const { isMovieLoading, movie, isMovieModalOpen } = this.props;
        let movieInfo = (
            <div>
                <Row className="mb-4">
                    <Col sm="4">
                        <img style={{ height: '100%', width: '100%' }} src={movie.Poster} alt="Movie Poster" />
                    </Col>
                    <Col sm="8">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <strong>IMDB Rating:</strong> {movie.imdbRating}
                            </li>
                            <li className="list-group-item">
                                <strong>Actors:</strong> {movie.Actors}
                            </li>
                        </ul>
                    </Col>
                </Row>
                <ul className="list-group">
                    <li className="list-group-item">
                        <strong>Description</strong>
                    </li>
                    <li className="list-group-item">
                        {movie.Plot}
                    </li>
                </ul>
            </div>
        );
        let content = isMovieLoading ? <Spinner /> : movieInfo;
        return (
            <Modal isOpen={isMovieModalOpen} toggle={this.toggleModal} >
                <ModalHeader toggle={this.toggleModal}>{movie.Title}</ModalHeader>
                <ModalBody>
                    < div > {content}</div >
                </ModalBody >
            </Modal >
        );
    }
}

const mapStateToProps = state => ({
    isMovieLoading: state.moviesData.isMovieLoading,
    movie: state.moviesData.movie,
    isMovieModalOpen: state.moviesData.isMovieModalOpen
});

export default connect(
    mapStateToProps,
    { fetchMovie, setMovieLoading, toggleMovieModal }
)(MovieModal);