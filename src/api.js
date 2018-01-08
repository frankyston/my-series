import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/' 
})

const apis = {
    loadGenres: () => api.get('genres'),
    saveSeries: (newSerie) => api.post('series', newSerie),
    updateSeries: (serie) => api.put('series/'+serie.id, serie),
    loadSeriesByGenre: (genre) => api.get('series?genre='+genre),
    deleteSerie: (id) => api.delete('series/'+id),
    loadSerieById: (id) => api.get('series/'+ id)
}

export default apis

