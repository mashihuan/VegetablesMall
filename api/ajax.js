import uniRequest from 'uni-request'

export default function ajax(url = '', params = {}, type = 'POST', header = {'content-type': 'application/json'}, flag) {
	return new Promise((resolve, reject) => {
		uniRequest({
			method: type,
			url: url,
			data: params,
			header: header,
		}).then((response) => {
			// let [error, res] = response;
			resolve(response.data);
		}).catch(error => {
			// let [err, res] = error;
			reject(error)
		})
	});
}
