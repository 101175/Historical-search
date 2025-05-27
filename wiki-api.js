import wiki from 'wikijs';
// const wiki = require('wikijs').default;

wiki({ apiUrl: 'https://en.wikipedia.org/w/api.php' })
	.page('Kaiser')
	.then(page => page.summary())
	.then(summary => console.log(summary))
	.then(page => page.info())
	.then(info => console.log(info))
	.then(console.log);