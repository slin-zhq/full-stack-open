const theme = {
  colors: {
    textPrimary: '#000000',
    textSecondary: '#212121',
		textAppBarTab: '#ffffff',
		textInputBorder: '#9E9E9E',
		textError: '#d73a4a',
		primary: '#0366d6',
    appBar: '#24292e',
		primaryBackground: '#e1e4e8',
  },
  fontSizes: {
    body: 16,
    subheading: 18,
  },
  fonts: {
    main: 'System',
		ios: 'Arial',
		android: 'Roboto'
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
	styles: {
		primaryButton: {
			backgroundColor: '#0366d6',
			padding: 12,
			// display:'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			borderRadius: 4,
			marginTop: 16,
		},
		formContainer: {
			justifyContent: 'space-between',
			backgroundColor: 'white',
			paddingBottom: 16,
			paddingHorizontal: 16,
		},
		textInput: {
			borderWidth: 1,
			borderColor: '#9E9E9E',
			marginTop: 16,
			padding: 12,
			borderRadius: 4,
		},
	}
};

export default theme;