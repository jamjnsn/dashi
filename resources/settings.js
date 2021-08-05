import http from 'axios'

export default {
	saving: false,
	pendingPromise: null,
	saveQueued: false,

	data: {},
	save: async function() {
		if (this.saving) {
			if (!this.saveQueued) {
				this.saveQueued = true
			}

			return this.pendingPromise
		} else {
			this.saveQueued = false
			this.saving = true

			console.log('Saving settings...')

			var self = this

			http.post('/settings', this.data)
				.then(function(response) {
					// Success
					self.pendingPromise = null
					self.saving = false

					if (self.saveQueued) {
						self.save()
					}

					return response.data
				})
				.catch(function(error) {
					console.log(error)
				})

			return this.pendingPromise
		}
	},
	load: function() {
		console.log('Loading settings...')

		let self = this

		return http
			.get('/settings')
			.then(function(response) {
				self.data = response.data
			})
			.catch(function(error) {
				console.log(error)
			})
	}
}
