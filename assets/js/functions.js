// register split text
gsap.registerPlugin(ScrollTrigger, SplitText, Draggable)

// global selectors
const body = document.body
const select = (e) => document.querySelector(e)
const selectAll = (e) => document.querySelectorAll(e)
const selectId = (id) => document.getElementById(id)
const vh = (coef) => window.innerHeight * (coef/100)
const vw = (coef) => window.innerWidth * (coef/100)

let lenis

// check for touch devices
function isTouchScreenDevice() {
	return 'ontouchstart' in window || navigator.maxTouchPoints
}

// init all click, mouseover and keyup functions
function initClickAndKeyFunctions() {

	// make anchor links scroll smoothy
	$('.sliding-link').click(function(e) {
		e.preventDefault()
		var aid = $(this).attr('href')
		$('html, body').animate({ scrollTop: $(aid).offset().top }, 1000)
	})

	// correct label click
	$('label').click(function(e){
		e.stopImmediatePropagation()
	})

	// open / close fs menu
	$('.open-fs').click(function(){

		var tl = gsap.timeline()

		tl.to('body', {
			overflow: 'hidden',
			duration: 0
		})

		tl.call(function() {
			$('.open-fs').addClass('active')
			lenis.stop()
		})

		tl.to('.blur-fs-bg', {
			opacity: 1,
			pointerEvents: 'auto',
			duration: .5
		})

		tl.to('.open-fs', {
			scale: 0,
			transformOrigin: '100% 0',
			duration: .3
		}, '-=.5')

		tl.to('#fs-menu .blue-box', {
			scale: 1,
			ease: 'elastic.out(.5, .3)',
			pointerEvents: 'auto',
			duration: 1
		}, '-=.2')

	})

	// close fs
	function closeFs() {

		var tl = gsap.timeline()

		tl.to('.blur-fs-bg', {
			opacity: 0,
			pointerEvents: 'none',
			duration: .5
		})

		tl.to('#fs-menu .blue-box', {
			scale: 0,
			ease: Power4.easeOut,
			pointerEvents: 'none',
			duration: .5
		}, '-=.5')

		tl.to('.open-fs', {
			scale: 1,
			duration: .3
		}, '-=.2')

		tl.to('.blur-fs-bg', {
			pointerEvents: 'none',
			duration: 0
		})

		tl.to('body', {
			overflow: 'auto',
			duration: 0
		})

		tl.call(function() {
			$('.open-fs').removeClass('active')
			lenis.start()
		})
	}

	// close fs
	$('.close-fs, #fs-menu a, .blur-fs-bg').click(function(){
		closeFs()
	})

	// close all opened menus when pressing the ESC key
	$(document).keyup(function(e) {
		if(e.key === 'Escape') {
			closeFs()
		}
	})

}

// init magnetic buttons
function initMagneticButtons() {
    
	// found via: https://codepen.io/tdesero/pen/RmoxQg
	var magnets = document.querySelectorAll('.magnetic')

	if(window.innerWidth > 540){
		magnets.forEach( (magnet) => {
			magnet.addEventListener('mousemove', moveMagnet )
			magnet.addEventListener('mouseleave', function(event) {
				gsap.to( event.currentTarget, 1.5, {
					x: 0, 
					y: 0, 
					ease: Elastic.easeOut
				})
			})
		})

		function moveMagnet(event) {
			var magnetButton = event.currentTarget
			var bounding = magnetButton.getBoundingClientRect()
			var magnetsStrength = magnetButton.getAttribute('data-strength')
				
			gsap.to( magnetButton, 1.5, {
				x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * magnetsStrength || 30,
				y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * magnetsStrength || 30,
				rotate: '0.001deg',
				ease: Power4.easeOut
			})
		}
	}
}

// here goes all the scroll related animations
function scrollTriggerAnimations() {

	// bg video fade
	if($('.bg-video').length) {
		gsap.to('.bg-video .overlay', {
			ease: 'none',
			opacity: 1,
			scrollTrigger: {
				trigger: '#banner',
				endTrigger: '#quem-somos',
				scrub: 3,
				start: '10% top',
				end: 'bottom 20%'
			}
		})

		gsap.to('.bg-video video', {
			scale: 2,
			rotation: -10,
			scrollTrigger: {
				trigger: '#banner',
				endTrigger: '#quem-somos',
				scrub: 3,
				start: '10% top',
				end: 'bottom 20%'
			}
		})
	}

	// parallax footer
	if($('#contato').length) {

		const height = document.querySelector('#contato').getBoundingClientRect().height

		gsap.from('#contato .footer-wrapper', {
			ease: 'none',
			filter: 'blur(.5rem)',
			opacity: 0,
			y: height * -.5,
			scrollTrigger: {
				trigger: '#contato',
				scrub: true,
				start: 'top bottom',
				end: () => `+=${height} bottom`
			}
		})
	}

	// fill title
	if($('.fill-title').length) {

		const title = new SplitText('.fill-title', { type: 'lines' })

		title.lines.forEach((target) => {
			gsap.to(target, {
				backgroundPositionX: 0,
				ease: 'none',
				scrollTrigger: {
					trigger: target,
					scrub: 3,
					start: 'top 90%',
					end: 'top 60%'
				}
			})
		})
	}

	// reveal text
	if($('.reveal-text').length) {

        const texts = selectAll('.reveal-text')
    
        texts.forEach(text => {
            
            // reset if needed
            if(text.anim) {
                text.anim.progress(1).kill()
            	text.split.revert()
            }

            text.split = new SplitText(text, { 
                type: 'lines, words, chars',
                linesClass: 'split-line'
            })

            // set up the anim
            text.anim = gsap.from(text.split.chars, {
                scrollTrigger: {
                    trigger: text,
                    start: 'top 80%'
                },
                duration: .75,
                ease: 'circ.out', 
                y: '100%',
				autoAlpha: 0, 
                stagger: 0.0375
            })
        })

	}

	// water effect
	if($('#turbulence').length) {

		gsap.to('#turbulence feTurbulence', {
			duration: 30,
			repeat: -1,
			yoyo: true,
			ease: 'none',
			attr: {
				baseFrequency: 0.07
			}
		})
	}
}

// init all sliders
function initSliders() {

	// products slider
	if($('.products-slider').length) {

		const products_slider = new Swiper('.products-slider', {
			slidesPerView: 1,
			//loop: true,
			simulateTouch: true,
			allowTouchMove: true,
			autoHeight: false,
			calculateHeight: false,
			spaceBetween: 50,
			speed: 600,
			slideToClickedSlide: true,
			centeredSlides: true,
			mousewheel: {  
				forceToAxis: true
			},
			pagination: {
                el: '.products-navigation',
                clickable: true,
				renderBullet: function (index, className) {
					var slides = selectAll('.products-slider .swiper-slide')
					var title = slides[index].getAttribute('data-title')
					return '<button class="' + className + '">' + title + '</button>'
				}
            },
            navigation: {
                nextEl: '.products-slider .next',
                prevEl: '.products-slider .prev'
            },
			effect: 'coverflow',
			coverflowEffect: {
				rotate: 0,
				stretch: -30,
				depth: 0,
				modifier: 1,
				slideShadows: false,
			},
			breakpoints: {
				992: {
					slidesPerView: 2,
					spaceBetween: 20,
					coverflowEffect: {
						rotate: 0,
						stretch: -30,
						depth: 50,
						modifier: 10,
						slideShadows: false,
					}
				}
			},
			on: {
				touchStart(){
					$('.products-slider').addClass('is-dragging')
				}, touchEnd(){
					$('.products-slider').removeClass('is-dragging')
				}
			}
		})

		setTimeout(function(){
			products_slider.update()
		}, 50)
	}

}

// custom mouse cursor
function initMouseCursor() {

	let links = selectAll('a, button')
	let mouse = selectId('mouse')

	for (let i = 0; i < links.length; i++) {
		links[i].addEventListener('mouseover', function(){
			gsap.to(mouse, {
				width: '5rem',
				height: '5rem',
				marginTop: '-2.5rem',
				marginLeft: '-2.5rem'
			})
		})
	}
	
	for (let i = 0; i < links.length; i++) {
		links[i].addEventListener('mouseleave', function(){
			gsap.to(mouse, {
				width: '1.5rem',
				height: '1.5rem',
				marginTop: '-.75rem',
				marginLeft: '-.75rem'
			})
		})
	}

	function moveCircle(e) {
		gsap.to(mouse, 1.5, {
			x: e.clientX,
			y: e.clientY,
			ease: Elastic.easeOut
		})
	}
	
	window.addEventListener('mousemove', moveCircle)
}

// check is the user is in a touch device
function initCheckTouchDevice() {
	
	if(isTouchScreenDevice()){
		$('main').addClass('touch')
		$('main').removeClass('no-touch')
		$('#mouse').remove()
	} else {
		$('main').removeClass('touch')
		$('main').addClass('no-touch')
		initMouseCursor()
	}

	$(window).resize(function() {
	  	if(isTouchScreenDevice()){
			$('main').addClass('touch')
			$('main').removeClass('no-touch')
			$('#mouse').remove()
	  	} else {
			$('main').removeClass('touch')
			$('main').addClass('no-touch')
			initMouseCursor()
	  	}
	})
  
}

// init lenis
function initLenis() {
	lenis = new Lenis({
		duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
	})

	lenis.on('scroll', ScrollTrigger.update)

	gsap.ticker.add((time)=>{
		lenis.raf(time * 1000)
	})

	gsap.ticker.lagSmoothing(0)
}

// custom scrollbar
function initCustomScrollBar() {
	let scrollbar = document.querySelector('[data-scrollbar]')
	let scrollbarHeight = scrollbar.getBoundingClientRect().height
	let thumb = document.querySelector('[data-scrollbar] [data-scrollbar-thumb]')
	let thumbHeight = thumb.getBoundingClientRect().height
	let content = document.querySelector('[data-scroll-container]')
	let contentHeight = content.getBoundingClientRect().height

	if(document.querySelector('[data-scrollbar-thumb-height="variable"]')) {
		gsap.set(thumb, {
			height: (scrollbarHeight / contentHeight * scrollbarHeight)
		})
		thumbHeight = (scrollbarHeight / contentHeight * scrollbarHeight)
	}

	let scrollTween = gsap.to(thumb, {
		y: (scrollbarHeight - thumbHeight),
		ease: 'none',
		scrollTrigger: {
			start: '0%',
			end:'max',
			scrub: true
		}
	})
	
	Draggable.create(thumb, {
		type: 'y',
		bounds: scrollbar,
		inertia: false,
		onDrag() {
			let progress = gsap.utils.normalize(this.minY, this.maxY, this.y)
			lenis.scrollTo((contentHeight - scrollbarHeight) * progress,{
				immediate: true
			})
			$(scrollbar).attr('data-scrollbar-drag', 'true')
		},
		onRelease() {
			let progress = gsap.utils.normalize(this.minY, this.maxY, this.y)
			scrollTween.scrollTrigger.enable()
			scrollTween.progress(progress)
			$(scrollbar).attr('data-scrollbar-drag', 'false')
		}
	})
}

// disable console warnings and show the copyright message
function initCopyright() {
	console.clear()
	const message = 'Design Paanda Design 🔗 www.paandadesign.com.br \nCode Senz Design 🔗 www.senzdsn.com'
	const style = 'color: #f8f8f8; font-size: 12px; font-weight: bold; background-color: #0d0e13; padding: 8px'
	console.log(`%c${message}`, style)
}

// opening animation
function openingAnimation() {

	const opening = gsap.timeline()

	opening.set('html', {
		cursor: 'wait'
	})

	opening.set('body', {
		overflow: 'hidden'
	})

	opening.to('#opening .box', {
		autoAlpha: 0,
		duration: 0
	})

	opening.from('#opening .logo svg .icon', {
		xPercent: 81.7,
		duration: 1,
		ease: Power2.easeOut,
		delay: .75
	})

	opening.from('#opening .logo svg .letter', {
		xPercent: -150,
		autoAlpha: 0,
		duration: 1.25,
		stagger: .1,
		ease: 'elastic.out(.5, .3)'
	}, '-=.7')

	opening.to('html', {
		cursor: 'auto',
		duration: 0
	})

	opening.to('body', {
		overflow: 'auto',
		duration: 0
	})

	opening.call(function() {
		document.dispatchEvent(new Event('animationIn'))
	})

	if ($(window).width() > 993) { 
		opening.set('#opening .rounded-div-wrap.bottom', { 
		  	height: '10vh'
		})
	} else {
		opening.set('#opening .rounded-div-wrap.bottom', { 
		  	height: '5vh'
		})
	}

	opening.to('#opening .logo svg path', {
		yPercent: -150,
		duration: 1,
		stagger: .05,
		ease: 'elastic.out(.5, .3)'
	})

	opening.to('#opening .bg', {
		duration: .8,
		yPercent: -100,
		ease: 'Power3.easeInOut'
	}, '-=.9')

	opening.to('#opening .rounded-div-wrap.bottom', {
		duration: .85,
		height: '0',
		ease: 'Power3.easeInOut'
	}, '-=.6')

	opening.to('#opening', {
		pointerEvents: 'none',
		autoAlpha: 0,
		duration: 0
	})
	
}

// fire all scripts
function initScripts() {
	initLenis()
	initCustomScrollBar()
	initCheckTouchDevice()
	initClickAndKeyFunctions()
	initSliders()
	initMagneticButtons()
	initCopyright()
	//openingAnimation()
	scrollTriggerAnimations()
}

initScripts()