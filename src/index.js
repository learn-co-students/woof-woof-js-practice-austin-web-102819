init = () => {
	let allDogs;

	function getDogs() {
		const url = 'http://localhost:3000/pups';
		fetch(url)
			.then((response) => response.json())
			.then((dogs) => {
				sendToGlobalVariable(dogs);
				displayDogs(dogs);
			});
	}

	function sendToGlobalVariable(dogs) {
		allDogs = Object.assign({}, dogs);
	}

	function displayDogs(dogs, filter = false) {
		const dogBar = document.getElementById('dog-bar');
		dogBar.innerHTML = '';
		for (const dog in allDogs) {
			if (filter && !allDogs[dog].isGoodDog) continue;
			// alert(allDogs[dog].name);
			const span = document.createElement('span');
			span.innerText = allDogs[dog].name;
			span.id = allDogs[dog].id;
			console.log(allDogs[dog]);
			span.addEventListener('click', () => displayDogInfo(allDogs[dog]));
			dogBar.appendChild(span);
		}
	}

	function displayDogInfo(dog) {
		// console.log(dog);
		// alert(dog.name);
		const dogInfo = document.getElementById('dog-info');
		dogInfo.innerHTML = '';
		const img = document.createElement('img');
		const h2 = document.createElement('h2');
		const button = document.createElement('button');

		img.src = dog.image;
		let isGoodDog = dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
		h2.innerText = dog.name;
		button.innerText = isGoodDog;
		button.id = dog.id;
		button.addEventListener('click', updateDog);
		dogInfo.appendChild(img);
		dogInfo.appendChild(h2);
		dogInfo.appendChild(button);
	}

	function updateDog(event) {
		let isGoodDog = this.innerText === 'Good Dog!' ? false : true;

		configObject = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({ isGoodDog: isGoodDog })
		};

		fetch(`http://localhost:3000/pups/${this.id}`, configObject)
			.then((response) => response.json())
			.then((json) => console.log(json));
	}

	const filter = document.getElementById('good-dog-filter');
	filter.addEventListener('click', toddleFilterButton);

	function toddleFilterButton() {
		if (/OFF$/.test(filter.innerText)) {
			filter.innerText = 'Filter good dogs: ON';
			displayDogs(allDogs, true);
		} else {
			displayDogs(allDogs, false);
			filter.innerText = 'Filter good dogs: OFF';
		}
	}

	getDogs();
};

window.addEventListener('DOMContentLoaded', init);
