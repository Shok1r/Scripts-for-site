import {getZero} from './timer';

function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prevBtn = document.querySelector(prevArrow),
          nextBtn = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1,
        offset = 0,
        switchId;

    current.textContent = getZero(slideIndex);
    slidesField.style.width = 100 * slides.length + '%';

    slidesField.style.display = 'flex';
    slidesField.style.transition = '.7s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function switchSlide() {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
            slideIndex = 1;

        } else {
            offset += deleteNotDigits(width);
            slideIndex++;
        }

        current.textContent = getZero(slideIndex);
        total.textContent = getZero(slides.length);
        slidesField.style.transform = `translateX(-${offset}px)`;

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    }

    function setIntervalOnSlider() {
        switchId = setInterval(switchSlide, 6000);
    }

    setIntervalOnSlider();

    function switchDot() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    nextBtn.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
            slideIndex = 1;

        } else {
            offset += deleteNotDigits(width);
            slideIndex++;
        }

        clearInterval(switchId);
        setTimeout(setIntervalOnSlider, 5000);

        current.textContent = getZero(slideIndex);
        slidesField.style.transform = `translateX(-${offset}px)`;

        switchDot();
    });

    prevBtn.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
            slideIndex = slides.length;
        } else {
            offset -= deleteNotDigits(width);
            slideIndex--;
        }

        clearInterval(switchId);
        setTimeout(setIntervalOnSlider, 5000);

        current.textContent = getZero(slideIndex);
        slidesField.style.transform = `translateX(-${offset}px)`;

        switchDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = '1';

            current.textContent = getZero(slideIndex);

            switchDot();
        });
    });

    // document.querySelector('#total').textContent = getZero(slides.length);
    // renderSlider();

    // function renderSlider() {
    //     slides.forEach(item => item.classList.add('hide'));
    //     slides[slideIndex - 1].classList.remove('hide');
    // }

    // prevBtn.addEventListener('click', () => {
    //     if (slideIndex === 1) {
    //         slideIndex = slides.length;
    //     } else {
    //         slideIndex--;
    //     }

    //     document.querySelector('#current').textContent = getZero(slideIndex);
    //     renderSlider();
    // });

    // nextBtn.addEventListener('click', () => {
    //     if (slideIndex === slides.length) {
    //         slideIndex = 1;
    //     } else {
    //         slideIndex++;
    //     }

    //     document.querySelector('#current').textContent = getZero(slideIndex);
    //     renderSlider();
    // });

}

export default slider;