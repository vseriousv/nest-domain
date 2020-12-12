'use strict';

async function verify(){
	const token = localStorage.getItem('access-api-token');
	if (token !== 'f7ab5991-6c33-4030-8e04-68a6e9c745c4') {
		window.location.href = '/api/v2';
	}
}

verify()
