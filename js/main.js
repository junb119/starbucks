// header - Search 

const searchEl = document.querySelector('.search')
const searchInputEl = searchEl.querySelector('input')

searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function () { // focus되면
  searchEl.classList.add('focused'); // 클래스에 'focused'추가
  searchInputEl.setAttribute('placeholder', '통합검색') // setAttribute : 속성추가
})
searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '')
})


// gsap과 lodash를 이용해 스크롤에 따라 사라지는 뱃지 만들기
const badgeEl = document.querySelector('header .badges')

// ScrollToTop 버튼
const ToTopEl = document.querySelector('#to-top')

// window 객체 : 화면
// lodash의 throttle 메소드 : 스크롤할시 0.3초마다 function 실행
window.addEventListener('scroll', _.throttle(function () {
  console.log(window.scrollY)
  if (window.scrollY > 500) { // window.scroll의 Y값이 500이 넘으면 뱃지 숨기기
    // gsap.to(요소, 지속시간,옵션) : 애니메이션처리
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'

    });
    // ScrollToTop 버튼 보이기
    gsap.to(ToTopEl, .2 , {
      x: 0
    })

    
  } else {
    // 뱃지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
  
    // ScrollToTop 버튼 숨기기
    gsap.to(ToTopEl, .2 , {
      x: 100
    })
  }
}, 300));

// ScrollToTop 버튼 클릭시 상단으로 이동
// _.throttle(함수,시간)

ToTopEl.addEventListener('click', function () {
  gsap.to(window, .7, {
    scrollTo : 0
  })
})


// 메인 첫화면 애니메이션
const fadeEl = document.querySelectorAll('.visual .fade-in')
fadeEl.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7,
    opacity: 1,
  })

});


// 공지사항
// Swiper(선택자, 옵션)

new Swiper('.notice-line .swiper', {
  direction: 'vertical',
  autoplay: true,
  loop: true
});

new Swiper('.promotion .swiper', {
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수(default : 1 )
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 5000 // 5초
  },

  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
})
// 
new Swiper('.awards .swiper', {
  autoplay: true,
  loop: true,
  spaceBetween: 30, // 슬라이드 사이 여백 
  slidesPerView : 5,  // 한 화면에 보일 슬라이드 수
  navigation : {
    prevEl : '.awards .swiper-prev',
    nextEl : '.awards .swiper-next'
  }
})


// 프로모션 토글
const promotionEl = document.querySelector('.promotion')
const promotionToggleBtn = document.querySelector('.toggle-promotion')
let isHidePromotion = false; // 프로모션 토글이 숨겨짐
promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion
  if (isHidePromotion) { // 숨김 처리
    promotionEl.classList.add('hide')
  } else { // 보임 처리
    promotionEl.classList.remove('hide')
  }
})


// Youtube 반복 애니메이션

function random(min, max) {
  // `.toFixed()` 를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  // gsap.to(요소, 시간, 옵션)
  gsap.to(selector ,random(1.5,2.5),  
  {
    y: size,
    repeat: -1,      // 무한반복
    yoyo : true, 
    ease : Power1.easeInOut,
    delay : random(0, delay)
  })
}



floatingObject('.floating1', 1, 15)
floatingObject('.floating2', .5, 15)
floatingObject('.floating3', 1.5, 20)


// SCROLL MAGIC
const spyEls = document.querySelectorAll('section.scroll-spy')
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl ,     // 보여줌 여부를 감시할 요소를 지정
      triggerHook: .8      // 감시하는 뷰포트 지점
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
})

//  This-Year
const thisYear = document.querySelector('.this-year')
thisYear.textContent = new Date().getFullYear()