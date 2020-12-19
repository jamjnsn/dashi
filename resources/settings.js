import http from 'axios'

export default {
    saveQueued: false,
    pendingPromise: null,

    data: {},
    save: async function() {
        if(this.pendingPromise) {
            if(this.saveQueued) {
                return this.pendingPromise
            } else {
                this.saveQueued = true
                await this.pendingPromise
                console.log('hi')
                return this.save()
            }
        } else {
            console.log('Saving settings...')

            var self = this

            this.pendingPromise = http.put('/settings', this.data)
                .then(function(response) {
                    console.log(this.saveQueued)
                    this.pendingPromise = null
                    return response.data
                })
                .catch(function(error) {
                    console.log(error)
                    this.save()
                })

            return this.pendingPromise
        }
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