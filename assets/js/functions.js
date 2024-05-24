// register split text
gsap.registerPlugin(ScrollTrigger, SplitText)

// global selectors
const body = document.body
const select = (e) => document.querySelector(e)
const selectAll = (e) => document.querySelectorAll(e)
const selectId = (id) => document.getElementById(id)
const vh = (coef) => window.innerHeight * (coef/100)
const vw = (coef) => window.innerWidth * (coef/100)

// locomotive scroll
let scroll

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
			scroll.stop()
			$('.open-fs').addClass('active')
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
			scroll.start()
			$('.open-fs').removeClass('active')
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
	var strength = 100

	if(window.innerWidth > 540){
		magnets.forEach( (magnet) => {
			magnet.addEventListener('mousemove', moveMagnet )
			$(this.parentNode).removeClass('not-active')
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
				x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * magnetsStrength,
				y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * magnetsStrength,
				rotate: "0.001deg",
				ease: Power4.easeOut
			})
		}
	}
}

// here goes all the scroll related animations
function scrollTriggerAnimations() {

	// fill title
	if($('.fill-title').length) {

		const title = new SplitText('.fill-title', { type: 'lines' })

		title.lines.forEach((target) => {
			gsap.to(target, {
				backgroundPositionX: 0,
				ease: 'none',
				scrollTrigger: {
					trigger: target,
					scrub: 2,
					start: 'top 97%',
					end: 'top 50%'
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
                    start: 'top 85%'
                },
                duration: .75,
                ease: 'circ.out', 
                y: '100%',
				autoAlpha: 0, 
                stagger: 0.0375
            })
        })

	}
}

// init all sliders
function initSliders() {

	// products slider
	if($('.products-slider').length) {

		const products_slider = new Swiper('.products-slider', {
			slidesPerView: 1,
			loop: true,
			simulateTouch: true,
			allowTouchMove: true,
			autoHeight: false,
			calculateHeight: false,
			spaceBetween: 10,
			speed: 600,
			freeMode: true,
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
			breakpoints: {
				575: {
					slidesPerView: 2,
					spaceBetween: 20
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 30
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

// init smooth scroll
function initSmoothScroll() {

    scroll = new LocomotiveScroll({
      	el: body.querySelector('[data-scroll-container]'),
      	smooth: true,
		getDirection: true
    })

	new ResizeObserver(() => scroll.update()).observe(
		document.querySelector('[data-scroll-container]')
	)

    window.onresize = scroll.update()

    scroll.on('scroll', () => ScrollTrigger.update())

    ScrollTrigger.scrollerProxy('[data-scroll-container]', {
      	scrollTop(value) {
        	return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y
      	}, // we don't have to define a scrollLeft because we're only scrolling vertically
      	getBoundingClientRect() {
        	return {
				top: 0,
				left: 0,
				width: window.innerWidth,
				height: window.innerHeight
			}
      	},
      	// locomotive scroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the locomotive scroll - controlled element)
      	pinType: body.querySelector('[data-scroll-container]').style.transform ? 'transform' : 'fixed'
    })

    function isTouchScreendevice() {
		return 'ontouchstart' in window || navigator.maxTouchPoints
  	}

	if(!isTouchScreendevice()){
		ScrollTrigger.defaults({
			scroller: document.querySelector('[data-scroll-container]')
		})
	}

    // each time the window updates, we should refresh scroll trigger and then update locomotive scroll
    ScrollTrigger.addEventListener('refresh', () => scroll.update())

    // after everything is set up, refresh() scroll trigger and update locomotive scroll because padding may have been added for pinning, etc
    ScrollTrigger.refresh()
}

// check is the user is in a touch device
function initCheckTouchDevice() {
    
	function isTouchScreendevice() {
	  	return 'ontouchstart' in window || navigator.maxTouchPoints
	}
	
	if(isTouchScreendevice()){
		$('main').addClass('touch')
		$('main').removeClass('no-touch')
		$('#mouse').remove()
	} else {
		$('main').removeClass('touch')
		$('main').addClass('no-touch')
		initMouseCursor()
	}

	$(window).resize(function() {
	  	if(isTouchScreendevice()){
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

	opening.call(function() {
		scroll.stop()
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
		scroll.start()
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
	scrollTriggerAnimations()
	initCheckTouchDevice()
	initClickAndKeyFunctions()
	initSmoothScroll()
	initSliders()
	initMagneticButtons()
	initCopyright()
	openingAnimation()
}

initScripts()

// if the user is entering the website for the first time, this will detect the opening animation and animate the banner accordingly
document.addEventListener('animationIn', function() {

	var tl = gsap.timeline()

	var text = new SplitText('#banner h1', { 
		type: 'lines, words, chars',
		linesClass: 'split-line'
	})

	tl.from('#banner video', {
		autoAlpha: 0, 
		yPercent: 40,
		duration: 1,
		ease: 'circ.out', 
	}, '+=.7')

	tl.from(text.chars, {
		duration: .75,
		ease: 'circ.out', 
		yPercent: 100,
		autoAlpha: 0, 
		stagger: 0.0375
	}, '-=.75')

	tl.from('#banner .side', {
		scale: 0,
		duration: .6,
		ease: 'circ.out',
		transformOrigin: '100% 100%'
	}, '-=1.5')

})