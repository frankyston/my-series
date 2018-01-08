import React, { Component } from 'react'
import api from './api'
import { Redirect } from 'react-router-dom'

const statuses = {
    'watched': 'Assistido',
    'watching': 'Assistindo',
    'toWatch': 'Assistir'
}

export default class EditSeries extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genres: [],
            serie: {},
            isLoading: false,
            redirect: false
        }
        this.saveSerie = this.saveSerie.bind(this)
    }
    saveSerie(){
        const newSeries = {
            id: this.props.match.params.id,
            name: this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            comment: this.refs.comment.value
        }
        api.updateSeries(newSeries).then((res) => {
            this.setState({ redirect: '/series/' + this.refs.genre.value })
        })
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        api.loadGenres().then((res) => this.setState({ isLoading: false, genres: res.data }))
        api.loadSerieById(this.props.match.params.id).then((res) => this.setState({ serie: res.data }))
        this.refs.name.value = this.state.serie.name
        this.refs.status.value = this.state.serie.status
        this.refs.genre.value = this.state.serie.genre
        this.refs.comment.value = this.state.serie.comment
    }
    render(){
        return (
            <div className="container intro-section" id="new-series" >
                {this.state.redirect &&
                    <Redirect to={this.state.redirect} />}
                <div className="row">
                    <div className="col-lg-12">
                        <h1>Editar série</h1>
                        <form>
                            Nome: <input type="text" ref='name' className='form-control' /><br/>
                            Status: 
                                <div className='form-group'>
                                    <select ref='status' className='form-control'> 
                                        {Object.keys(statuses).map(status => <option key={status} value={status}>{statuses[status]}</option>) } 
                                    </select>
                                </div>
                            Genero:
                                <div className='form-group'>
                                <select ref='genre' className='form-control'>
                                    {Object.keys(this.state.genres).map(genre => <option key={genre} value={this.state.genres[genre]}>{this.state.genres[genre]}</option>)}
                                </select>
                            </div>
                            Comentário: <textarea ref='comment' className='form-control' /><br/>
                        </form>
                        <button className='btn btn-success' onClick={this.saveSerie}>Salvar</button>
                    </div>
                </div>
            </div>
        )
    }
}