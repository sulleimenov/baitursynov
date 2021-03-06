import $ from 'jquery'
import mixitup from 'mixitup'
import { Fancybox } from '@fancyapps/ui'
import gsap from 'gsap'
import MicroModal from 'micromodal'
import Cookies from 'js-cookie'

import { ScrollTrigger } from 'gsap/ScrollTrigger.js'

window.jQuery = $
window.$ = $

// // Import vendor jQuery plugin example (not module)
// require('~/app/libs/mmenu/dist/mmenu.js')

document.addEventListener('DOMContentLoaded', () => {
	gsap.registerPlugin(ScrollTrigger)

	let offerTextHeader = document.querySelector('.offer__text-header')
	let offerTextDesc = document.querySelector('.offer__text-desc')
	let offerTextImage = document.querySelector('.offer__image')
	let offerQuote = document.querySelector('.quote')

	if (offerTextHeader) { gsap.from(offerTextHeader, { x: -100, opacity: 0, duration: 0.5 }) }
	if (offerTextDesc) { gsap.from(offerTextDesc, { x: -100, opacity: 0, duration: 0.7 }) }
	if (offerTextImage) { gsap.from(offerTextImage, { x: 100, opacity: 0, duration: 0.5 }) }
	if (offerQuote) { gsap.from(offerQuote, { y: 100, opacity: 0, duration: 0.6 }) }

	MicroModal.init({
		disableScroll: true,
		disableFocus: false,
		awaitOpenAnimation: true,
		awaitCloseAnimation: true,
	})

	function burgerMenu() {
		const item = document.querySelector('.menu-wrapper__burger-tap')
		const menu = document.querySelector('.menu')
		const menuItem = document.querySelectorAll('.menu__item ')

		item.addEventListener('click', function (e) {
			menu.classList.toggle('show')
			menuItem.classList.remove('show')
		})
	}
	
	function accordion() {
		let Accordion = function (el, multiple) {
			this.el = el || {};
			this.multiple = multiple || false;

			// Variables privadas
			let links = this.el.find('.menu__item-link');
			// Evento
			links.on('click', { el: this.el, multiple: this.multiple }, this.dropdown)
		}

		Accordion.prototype.dropdown = function (e) {
			let $el = e.data.el;
			let $this = $(this),
				$next = $this.next();

			$next.slideToggle();
			$this.parent().toggleClass('show');

			if (!e.data.multiple) {
				$el.find('.menu__dropdown').not($next).slideUp().parent().removeClass('show');
			};
		}

		let accordion = new Accordion($('#menu'), false);
	}

	if (window.screen.height <= 768) {
		accordion()
	}
	
	burgerMenu()

	function opening() {
		let close = document.querySelector('.opening__close')
		let window = document.querySelector('.opening')

		if (!Cookies.get('opening')) {
			window.classList.add('show')
		}
		
		close.addEventListener('click', function () {
			window.classList.remove('show')
			Cookies.set('opening', 'close')
		})
	}
	function timer() {
		const endtime = 'Apr 15 2022, 11:30 GMT+0600';

		// ???????????????? ?? ???????????????????????? ???????? 03:04:05, ???????????? 3:4:5
		function makeCorrectDate(uncorrectDate) {
			let correctDate = uncorrectDate;
			if (uncorrectDate < 10) {
				correctDate = '0' + uncorrectDate;
			}
			return correctDate;
		}

		// ?????????????? ?????????????? ????????????????
		function getDateRemaining(timesup) {
			// total = ???????????????????? ??????????
			var total = Date.parse(timesup) - Date.now();
			var seconds = Math.floor((total / 1000) % 60);
			var minutes = Math.floor((total / 1000 / 60) % 60);
			var hours = Math.floor((total / (1000 * 60 * 60)) % 24);
			var days = Math.floor(total / (1000 * 60 * 60 * 24));
			// ?????????? ????????????????
			return {
				'total': total,
				'days': days,
				'hours': hours,
				'minutes': minutes,
				'seconds': seconds
			};
		}

		// ?????????????????????????? ?????????????? ???? ?????????? ??????????
		function setTime(id, timesup) {
			let timer = document.getElementById(id),
				days = timer.querySelector('.days'),
				hours = timer.querySelector('.hours'),
				minutes = timer.querySelector('.minutes'),
				seconds = timer.querySelector('.seconds'),
				// ???????????????????? ?????????????? ???????????? 1000????
				timeInterval = setInterval(update, 1000);

			function update() {
				// ?????????????????? ?????????????? getDateRemaining
				let total = getDateRemaining(timesup);
				// ???????????????? ???? ????????
				var nowdate = Date.now();
				if (nowdate <= Date.parse(endtime)) {
					var nowdate = Date.now();
					days.textContent = makeCorrectDate(total.days);
					hours.textContent = makeCorrectDate(total.hours);
					minutes.textContent = makeCorrectDate(total.minutes);
					seconds.textContent = makeCorrectDate(total.seconds);
				} else {
					days.textContent = 0;
					hours.textContent = 0;
					minutes.textContent = 0;
					seconds.textContent = 0;
				}
					
				let correctDays;
				let correctHours;
				let correctMinutes;
				let correctSeconds;
				// ?????????????????? ??????????
				switch (total.days) {
					case 1:
					case 21:
					case 31:
					case 41:
					case 51:
						correctDays = "????????";
						// console.log(total.days, correctDays); // DEBUG
						break;
					case 2:
					case 3:
					case 4:
					case 22:
					case 23:
					case 24:
					case 32:
					case 33:
					case 34:
					case 42:
					case 43:
					case 44:
					case 52:
					case 53:
					case 54:
						correctDays = "??????";
						// console.log(total.days, correctDays); // DEBUG
						break;
					default:
						correctDays = "????????";
						// console.log(total.days, correctDays); // DEBUG
				}
				document.querySelector('.uncorrectDays').textContent = correctDays;

				// ?????????????????? ??????????
				switch (total.hours) {
					case 1:
					case 21:
					case 31:
					case 41:
					case 51:
						correctHours = "??????";
						// console.log(total.hours, correctHours); // DEBUG
						break;
					case 2:
					case 3:
					case 4:
					case 22:
					case 23:
					case 24:
					case 32:
					case 33:
					case 34:
					case 42:
					case 43:
					case 44:
					case 52:
					case 53:
					case 54:
						correctHours = "????????";
						// console.log(total.hours, correctHours); // DEBUG
						break;
					default:
						correctHours = "??????????";
						// console.log(total.hours, correctHours); // DEBUG
				}
				document.querySelector('.uncorrectHours').textContent = correctHours;

				// ?????????????????? ??????????
				switch (total.minutes) {
					case 1:
					case 21:
					case 31:
					case 41:
					case 51:
						correctMinutes = "????????????";
						// console.log(total.minutes, correctMinutes); // DEBUG
						break;
					case 2:
					case 3:
					case 4:
					case 22:
					case 23:
					case 24:
					case 32:
					case 33:
					case 34:
					case 42:
					case 43:
					case 44:
					case 52:
					case 53:
					case 54:
						correctMinutes = "????????????";
						// console.log(total.minutes, correctMinutes); // DEBUG
						break;
					default:
						correctMinutes = "??????????";
						// console.log(total.minutes, correctMinutes); // DEBUG
				}
				document.querySelector('.uncorrectMinutes').textContent = correctMinutes;

				// ?????????????????? ????????????
				switch (total.seconds) {
					case 1:
					case 21:
					case 31:
					case 41:
					case 51:
						correctSeconds = "??????????????";
						// console.log(total.seconds, correctSeconds); // DEBUG
						break;
					case 2:
					case 3:
					case 4:
					case 22:
					case 23:
					case 24:
					case 32:
					case 33:
					case 34:
					case 42:
					case 43:
					case 44:
					case 52:
					case 53:
					case 54:
						correctSeconds = "??????????????";
						// console.log(total.seconds, correctSeconds); // DEBUG
						break;
					default:
						correctSeconds = "????????????";
						// console.log(total.seconds, correctSeconds); // DEBUG
				}
				document.querySelector('.uncorrectSeconds').textContent = correctSeconds;
			}
		}
		setTime('timer', endtime);
	}

	var mixerContainerEl = document.querySelector('.galleries');
	if (mixerContainerEl) {
		let mixer = mixitup(mixerContainerEl, {
			animation: {
				duration: 250,
				nudge: false,
				reverseOut: false,
				effects: 'fade scale(0.87)',
			},
		})
	}
})
