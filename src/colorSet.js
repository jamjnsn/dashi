import Color from 'color'

export default function (colorString) {
	let color = Color(colorString)

	let colorSet = {
		normal: color.hsl(),
		dark: color.darken(0.1),
		darker: color.darken(0.25),
		light: color.lighten(0.1),
		lighter: color.lighten(0.25),
		contrast: color.isLight() ? color.darken(0.65) : color.lighten(0.55),
	}

	return {
		...colorSet,
		toTheme: function (colorName) {
			let variables = {}
			variables['--' + colorName] = colorSet.normal.string()

			Object.keys(colorSet).forEach((colorKey) => {
				variables['--' + colorName + '-' + colorKey] =
					colorSet[colorKey].string()
			})

			return variables
		},
	}
}
