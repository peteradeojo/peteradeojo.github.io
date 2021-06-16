$(() => {
	(() => {
		// Anonymous function to intialize tab operations
		const tabPanes = document.querySelectorAll('.tab-pane');
		tabPanes.forEach(function (tabpane) {
			const tabList = tabpane.querySelector('.tabs');
			const tabContent = tabpane.querySelector('.tab-content');

			const target = tabList.querySelector('li.active') || tabList.querySelector('li');

			// console.log(target);

			try {
				tabContent.querySelector(target.getAttribute('data-target')).classList.add('active');
				target.classList.add('active');
				tabList.querySelectorAll('li').forEach((tab) => {
					tab.addEventListener('click', showTab);
				});
			} catch (error) {}
		});
	})();
});

function showTab() {
	const that = this;
	const target = this.getAttribute('data-target');

	const tabpane = this.parentElement.parentElement;
	tabpane.querySelectorAll('.tabs li').forEach((tab) => {
		tab.classList.remove('active');
	});
	this.classList.add('active');

	tabpane.querySelectorAll('.tab').forEach((tab) => {
		tab.classList.remove('active');
	});
	tabpane.querySelector(target).classList.add('active');
}
