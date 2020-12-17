import data from '../settings.json'
import http from 'axios'

export const settingTypes = {
    COLOR: 'color',
    BOOLEAN: 'boolean',
    STRING: 'string'
}

export default {
    data: data,
    save: function() {
        console.log('Saving settings...')

        http.post('/config.php', this.data)
            .then(function(response) {
                console.log(response)
            })
            .catch(function(error) {
                console.log(error)
            })
            .then(function() {
                //
            })
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
    },
    schema: {
        theme: {
            accentColor: settingTypes.COLOR,
            topbarHasBackground: settingTypes.BOOLEAN
        }
    }
}