import http from 'axios'

export default {
    data: {},
    save: function() {
        console.log('Saving settings...')

        return http.put('/settings', this.data)
            .then(function(response) {
                return response.data
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    load: function() {
        console.log('Loading settings...')
        let self = this

        return http.get('/settings')
            .then(function(response) {
                self.data = response.data
            })
            .catch(function(error) {
                console.log(error)
            })
    }
}