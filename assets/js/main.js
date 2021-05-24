(function () {
	const scrollInit = () => {
		const navbar = document.querySelector('.navbar');

		window.addEventListener('scroll', function () {
			// console.log(window.scrollY);
			if (window.scrollY >= 60) {
				navbar.classList.add('bg-dark');
				document.querySelector('#navigation').classList.add('position-fixed', 'fixed-top');
				document.querySelector('main').style.marginTop = '120px';
			} else {
				navbar.classList.remove('bg-dark');
				document.querySelector('#navigation').classList.remove('position-fixed', 'fixed-top');
				document.querySelector('main').style.marginTop = '60px';
			}
		});
	};

	const showProgress = (skill, data) => {
		let lineSpan = document.createElement('span');
		lineSpan.style.width = `${data.progress}%`;
		lineSpan.style.display = 'block';
		lineSpan.style.height = '5px';
		lineSpan.style.marginTop = '8px';
		lineSpan.style.backgroundColor = data.progressbar;

		const roundSpan = document.createElement('span');
		roundSpan.classList.add('progress-circle');
		roundSpan.innerHTML = `${data.progress}%`;

		skill.querySelector('div').appendChild(roundSpan);
		skill.append(lineSpan);
	};

	window.addEventListener('load', scrollInit);

	window.addEventListener('load', () => {
		const skills = document.querySelectorAll('.skill');

		skills.forEach((skill) => {
			const dataset = skill.dataset;
			if (dataset.progress) {
				showProgress(skill, dataset);
			}
		});
	});
})();
