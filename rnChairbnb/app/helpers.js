export const formatMessages = (messages) => {

	//sort in reverse order
	messages.sort(function(a, b){
		let keyA = new Date(a.createdAt),
			keyB = new Date(b.createdAt)
		// Compare the 2 dates
		if(keyA > keyB) return -1
		if(keyA < keyB) return 1
		return 0
	})
	//format
	return messages.map(msg => ({
		_id: msg.id,
		text: msg.text,
		createdAt: msg.createdAt,
		user: {
			_id: (msg.sent_from === 'user' ? 1 : 2),
			name: 'msg.user.first',
			avatar: 'https://image.architonic.com/imgTre/09_11/plastik-Vertex-KarimRashid-14-b.jpg',
		},
	}))

}
