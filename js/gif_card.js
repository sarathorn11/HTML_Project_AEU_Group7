 
const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list2");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".swiper-container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    
    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
        
        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
    
            // Ensure the scrollbar thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }
    
        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }
    
        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });
    
    // Slide images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            console.log(imageList);
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
            
        });
    });
    
        // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }
    
    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }
    
    // Call these two functions when image list scrolls
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
    }
    
    window.addEventListener("resize", initSlider);
    window.addEventListener("load", initSlider);
    
    
    
    
    /***** sidebar navigation ---------------------------------------- */
    const sidebarNavigationEl = document.getElementById("sidebar-container-navigation-id")
    const sidebarOpenNavigationEl = document.getElementById("open-nav-sidebar")
    const sidebarCloseNavigationEl = document.getElementById("sidebar-navigation-close")
    
    
    
    sidebarOpenNavigationEl.addEventListener("click", () => {
        sidebarNavigationEl.classList.toggle("slidebar-show")
    })
    sidebarCloseNavigationEl.addEventListener("click", () => {
        sidebarNavigationEl.classList.toggle("slidebar-show")
    })
    
    
    let slideBtnLeft = document.getElementById("slide-btn-left")
    let slideBtnRight = document.getElementById("slide-btn-right")
    let imgItem = document.querySelectorAll(".image-item")
    
    
    
    let startSlider = 0
    let endSlider = (imgItem.length - 1) * 100  // 700
    
    slideBtnLeft.addEventListener("click", handleLeftBtn)
    
    function handleLeftBtn() {
        if (startSlider < 0) {
            startSlider = startSlider + 100;
        }
        imgItem.forEach(element => {
            element.style.transform = `translateX(${startSlider}%)`;
        })
    }
    
    slideBtnRight.addEventListener("click", handleRightBtn)
    
    function handleRightBtn() {
        if (startSlider >= -endSlider + 100) {
            startSlider = startSlider - 100;
        }
        imgItem.forEach(element => {
            element.style.transform = `translateX(${startSlider}%)`;
        })
    
    }
    //render automatic
    function renderSlideAuto() {
    
        if (startSlider >= -endSlider + 100) {
            handleRightBtn()
        }
        else {
            startSlider = 0;
        }
    }
    setInterval(renderSlideAuto, 2000);
    
    
    
    
    