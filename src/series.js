import React, { Component } from 'react'
import api from './api'
import { Link } from 'react-router-dom'

const statuses = {
    'watched': 'Assistido',
    'watching': 'Assistindo',
    'toWatch': 'Assistir'
}

export default class Series extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            series: []
        }
        this.showSerie = this.showSerie.bind(this)
        this.loadData = this.loadData.bind(this)
    }
    componentDidMount(){
        this.loadData()
    }
    loadData(){
        this.setState({ isLoading: true })
        api.loadSeriesByGenre(this.props.match.params.genre)
            .then((res) => this.setState({ isLoading: false, series: res.data }))
    }
    handleDelete(id){
        api.deleteSerie(id)
        .then(() => this.loadData())
    }
    showSerie(serie){
        return (
            
                <div key={serie.id} className="item  col-xs-4 col-lg-4">
                    <div className="thumbnail">
                        <img className="group list-group-image" src="http://placehold.it/400x250/000/fff" alt="" />
                        <div className="caption">
                            <h4 className="group inner list-group-item-heading">
                                {serie.name}</h4>
                            <div className="row">
                                <div className="col-xs-12 col-md-12">
                                    <p className="lead">{serie.genre} / {statuses[serie.status]}</p>
                                </div>
                                <div className="col-xs-12 col-md-12">
                                    <Link className="btn btn-success" to={`/series-edit/${serie.id}`}>Editar</Link>
                                    <a className="btn btn-danger" onClick={() => this.handleDelete(serie.id)}>Excluir</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
        )
    }
    render(){
        return (
            <div className="container intro-section" id="new-series">
                <div className="row">
                    <div className="col-lg-12">
                        <h1>Series {this.props.match.params.genre}</h1>
                        {this.state.isLoading && <span>Aguarde, carregando...</span>}
                        {!this.state.isLoading && this.state.series.length === 0 && 
                        <div className='alert alert-info'>Nenhuma série cadastrada.</div> }
                        {!this.state.isLoading && <div id="series" className="row list-group">
                            { this.state.series.map((serie) => this.showSerie(serie)) }
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}