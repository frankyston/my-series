import React, { Component } from 'react'
import api from './api'
import { Redirect } from 'react-router-dom'

const statuses = {
    'watched': 'Assistido',
    'watching': 'Assistindo',
    'toWatch': 'Assistir'
}

export default class NewSeries extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genres: [],
            isLoading: false,
            redirect: false
        }
        this.saveSerie = this.saveSerie.bind(this)
    }
    saveSerie(){
        const newSeries = {
            name: this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            comment: this.refs.comment.value
        }
        api.saveSeries(newSeries).then((res) => {
            this.setState({ redirect: '/series/' + this.refs.genre.value })
        })
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        api.loadGenres().then((res) => this.setState({ isLoading: false, genres: res.data }))
    }
    render(){
        return (
            <div className="container intro-section" id="new-series" >
                {this.state.redirect &&
                    <Redirect to={this.state.redirect} />}
                <div className="row">
                    <div className="col-lg-12">
                        <h1>Novas séries</h1>
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