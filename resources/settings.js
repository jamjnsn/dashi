import data from '../settings.json'
import http from 'axios'

export default {
    data: data,
    save: function() {
        console.log('Saving settings...')
    },
    reload: function() {
        console.log('Reloading settings...')
        http.get('/config.php')
            .then(function(response) {
                console.log(response)
            })
            .catch(function(error) {
                console.log(error)
            })
            .then(function() {
                //
            })
    }
}