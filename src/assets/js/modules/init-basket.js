const deleteCard = evt => {
	const target = evt.target;

	if (
		!target.closest('[data-card-delete]') &&
		!target.closest('[data-counter-remove]') &&
		!target.closest('[data-counter-add]')
	) {
		return;
	}

	const card = target.closest('[data-card]');
	const price = card.querySelector('[data-card-price]');
	const productPrice = parseInt(price.innerHTML.replace(/&nbsp;|\s/g, '').substring(1), 10);

	const quantity = document.querySelector('[data-cart-quantity]');
	const cartQuantity = parseInt(quantity.innerHTML, 10);

	const number = card.querySelector('[data-counter-number]');
	let counterNumber = parseInt(number.innerHTML, 10);

	const subtotal = document.querySelector('[data-price-subtotal]');
	const subtotalPrice = parseInt(subtotal.innerHTML.replace(/&nbsp;|\s/g, '').substring(1), 10);

	const tax = document.querySelector('[data-price-tax]');

	const shipping = document.querySelector('[data-price-shipping]');

	const total = document.querySelector('[data-price-total]');
	const totalPrice = parseInt(total.innerHTML.replace(/&nbsp;|\s/g, '').substring(1), 10);

	if (target.closest('[data-counter-remove]')) {
		number.innerHTML = (parseInt(number.innerHTML, 10) - 1).toString();

		if (parseInt(number.innerHTML, 10) <= 0) {
			number.innerHTML = '1';
			return;
		}

		counterNumber = parseInt(number.innerHTML, 10);

		quantity.innerHTML = (cartQuantity - 1).toString();

		price.innerHTML = '$' + ((productPrice / (counterNumber + 1)) * counterNumber).toLocaleString();
		subtotal.innerHTML =
			'$' + (subtotalPrice - productPrice / (counterNumber + 1)).toLocaleString();
		total.innerHTML = '$' + (totalPrice - productPrice / (counterNumber + 1)).toLocaleString();
	}

	if (target.closest('[data-counter-add]')) {
		number.innerHTML = (counterNumber + 1).toString();

		counterNumber = parseInt(number.innerHTML, 10);

		quantity.innerHTML = (cartQuantity + 1).toString();

		price.innerHTML = '$' + ((productPrice / (counterNumber - 1)) * counterNumber).toLocaleString();
		subtotal.innerHTML =
			'$' + (subtotalPrice + productPrice / (counterNumber - 1)).toLocaleString();
		total.innerHTML = '$' + (totalPrice + productPrice / (counterNumber - 1)).toLocaleString();
	}

	if (target.closest('[data-card-delete]')) {
		card.remove();

		subtotal.innerHTML = '$' + (subtotalPrice - productPrice).toLocaleString();
		total.innerHTML = '$' + (totalPrice - productPrice).toLocaleString();
		quantity.innerHTML = (cartQuantity - counterNumber).toLocaleString();

		if (subtotal.innerHTML.substring(1) === '0') {
			quantity.remove();

			tax.innerHTML = '$0';
			shipping.innerHTML = '$0';
			total.innerHTML = '$0';
		}
	}
};

const initBasket = () => {
	document.addEventListener('click', deleteCard);

	if (module.hot) {
		module.hot.dispose(() => {
			document.removeEventListener('click', deleteCard);
		});
	}
};

export default initBasket;
