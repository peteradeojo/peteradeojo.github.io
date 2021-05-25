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
})();
