(function () {
	class ProgressRing extends HTMLElement {
		constructor() {
			super();

			const stroke = this.getAttribute('stroke');
			const radius = this.getAttribute('radius');
			const color = this.getAttribute('color');
			const normalizedRadius = radius - stroke * 2;
			this._circumference = normalizedRadius * 2 * Math.PI;

			this._root = this.attachShadow({ mode: 'open' });
			this._root.innerHTML = `
      <svg height="${radius * 2}" width="${radius * 2}">
        <circle 
          stroke-width="${stroke}" 
          stroke-dasharray="${this._circumference} ${this._circumference}"
          fill="transparent"
          r="${normalizedRadius}" 
          cx="${radius}" 
          cy="${radius}"
          stroke="${color}" 
        />
        95
      </svg>
  
      <style>
        circle {
          transition: stroke-dashoffset 0.4s;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
        }
      </style>
      `;
		}

		setProgress(percent) {
			const offset = this._circumference - (percent / 100) * this._circumference;
			const circle = this._root.querySelector('circle');
			circle.style.strokeDashoffset = offset;
		}

		static get observedAttributes() {
			return ['progress'];
		}

		attributeChangedCallback(name, oldValue, newValue) {
			if (name === 'progress') {
				this.setProgress(newValue);
			}
		}
	}

	window.customElements.define('progress-ring', ProgressRing);

  
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

	window.addEventListener('load', () => {
		if (document.querySelector('#navigation')) scrollInit();
	});

	// window.addEventListener('load', () => {
	// 	const circle = document.querySelector('.progress-ring__circle');
	// 	const radius = circle.r.baseVal.value;
	// 	const circumference = radius * 2 * Math.PI;

	// 	circle.style.strokeDasharray = `${circumference} ${circumference}`;
	// 	circle.style.strokeDashoffset = circumference;

	// 	const setProgress = (percent) => {};

	// 	setProgress(circle.dataset.percent);
	// });
})();

// const showProgress = (skill, data) => {
// 	let lineSpan = document.createElement('span');
// 	lineSpan.style.width = `${data.progress}%`;
// 	lineSpan.style.display = 'block';
// 	lineSpan.style.height = '5px';
// 	lineSpan.style.marginTop = '8px';
// 	lineSpan.style.backgroundColor = data.progressbar;

// 	const roundSpan = document.createElement('span');
// 	roundSpan.classList.add('progress-circle');
// 	roundSpan.style.color = data.progressbar;
// 	roundSpan.innerHTML = `${data.progress}%`;

// 	skill.querySelector('div').appendChild(roundSpan);
// 	skill.append(lineSpan);
// };

// window.addEventListener('load', () => {
// 	const skills = document.querySelectorAll('.skill');

// 	skills.forEach((skill) => {
// 		const dataset = skill.dataset;
// 		if (dataset.progress) {
// 			showProgress(skill, dataset);
// 		}
// 	});
// });
