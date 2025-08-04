// Default Values
const posts = [
    { title: "کاهش کمردرد با 3 حرکت ساده", excerpt: "آموزش تمرینات پل، کات و کشش ستون فقرات برای کاهش درد کمر.", date: "1404/06/15", category: "back" },
    { title: "اصلاح وضعیت بدنی برای دوندگان", excerpt: "چطور با حرکات اصلاحی وضعیت بدنی خود را حین دویدن بهبود دهید.", date: "1404/06/10", category: "posture" },
    { title: "تمرینات کششی برای شانه‌های افتاده", excerpt: "حرکات ساده برای تقویت عضلات شانه و بهبود وضعیت آن‌ها.", date: "1404/06/05", category: "shoulder" }
];
const galleryImages = [
    { src: "./assets/images/کمر.jpg", alt: "تمرین پل", caption: "تمرین پل برای تقویت عضلات کمر و هسته بدن", category: "back" },
    { src: "./assets/images/shoulder-stretch-exercise-illustration-1024x683-1.jpg", alt: "کشش شانه", caption: "کشش شانه برای بهبود دامنه حرکتی", category: "shoulder" },
    { src: "./assets/images/انواع-ورزش-برای-آرتروز-گردن-و-شانه.webp", alt: "کشش گردن", caption: "تمرین کشش گردن برای کاهش تنش", category: "neck" }
];
const videos = [
    { src: "", poster: "https://via.placeholder.com/300x200?text=تمرین+کمر", alt: "تمرین کمر", caption: "آموزش تمرینات پل و کات برای کمر" },
    { src: "", poster: "https://via.placeholder.com/300x200?text=کشش+شانه", alt: "کشش شانه", caption: "کشش شانه برای کاهش درد و بهبود حرکت" }
];


// Render Functions
function renderPosts(filteredPosts = posts) {
    const blogPosts = document.getElementById('blog-posts');
    if (blogPosts) {
        blogPosts.innerHTML = '';
        filteredPosts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.className = 'bg-gray-100 dark:bg-gray-700 p-6 rounded-xl shadow-lg animate-scale animate-fade-in';
            postElement.style.animationDelay = `${index * 0.2}s`;
            postElement.innerHTML = `
              <h3 class="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">${post.title}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">${post.date}</p>
              <p class="text-gray-600 dark:text-gray-300">${post.excerpt}</p>
            `;
            blogPosts.appendChild(postElement);
        });
    }
}



function renderGallery(filteredImages = galleryImages) {
    const gallery = document.getElementById('gallery-images');
    if (gallery) {
        gallery.innerHTML = '';
        filteredImages.forEach((image, index) => {
            const imageElement = document.createElement('div');
            imageElement.className = 'gallery-card relative overflow-hidden rounded-xl shadow-lg animate-scale animate-fade-in cursor-pointer';
            imageElement.style.animationDelay = `${index * 0.2}s`;
            imageElement.innerHTML = `
              <img src="${image.src}" alt="${image.alt}" class="w-full h-48 object-cover" loading="lazy">
              <div class="gallery-caption">${image.caption}</div>
            `;
            imageElement.addEventListener('click', () => openModal(image.src, image.alt, image.caption, index));
            gallery.appendChild(imageElement);
        });
    }
}

// Gallery Modal

let currentImageIndex = 0;
function openModal(src, alt, caption, index) {
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    if (modal && modalImage && modalCaption) {
        modalImage.src = src;
        modalImage.alt = alt;
        modalCaption.textContent = caption;
        currentImageIndex = index;
        modal.classList.remove('hidden');
    }
}


const nextImage = document.getElementById('next-image');
if (nextImage) {
    nextImage.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        const image = galleryImages[currentImageIndex];
        openModal(image.src, image.alt, image.caption, currentImageIndex);
    });
}

const prevImage = document.getElementById('prev-image');
if (prevImage) {
    prevImage.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        const image = galleryImages[currentImageIndex];
        openModal(image.src, image.alt, image.caption, currentImageIndex);
    });
}


function filterPosts(category) {
    const filtered = category === 'all' ? posts : posts.filter(post => post.category === category);
    renderPosts(filtered);
}

function filterGallery(category) {
    const filtered = category === 'all' ? galleryImages : galleryImages.filter(image => image.category === category);
    renderGallery(filtered);
}

function closeModal() {
    const modal = document.getElementById('gallery-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function submitContact() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const error = document.getElementById('form-error');
    if (name && email && phone && message) {
        error.classList.add('hidden');
        alert('درخواست شما با موفقیت ارسال شد! به زودی باهاتون تماس می‌گیرم.');
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('message').value = '';
    } else {
        error.classList.remove('hidden');
    }
}

// // Contact Form Submission
// function submitContact() {
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const phone = document.getElementById('phone').value;
//     const message = document.getElementById('message').value;
//     const error = document.getElementById('form-error');
//
//     if (name && email && phone && message) {
//         error.classList.add('hidden');
//
//         // Create message object
//         const contactMessage = {
//             id: Date.now(), // Unique ID based on timestamp
//             name,
//             email,
//             phone,
//             message,
//             timestamp: new Date().toISOString()
//         };
//
//         // Get existing messages from localStorage or initialize empty array
//         let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
//
//         // Add new message to array
//         messages.push(contactMessage);
//
//         // Save updated array to localStorage
//         localStorage.setItem('contactMessages', JSON.stringify(messages));
//
//         // Show success message
//         alert('پیام شما با موفقیت ذخیره شد!');
//
//         // Clear form
//         document.getElementById('name').value = '';
//         document.getElementById('email').value = '';
//         document.getElementById('phone').value = '';
//         document.getElementById('message').value = '';
//     } else {
//         error.classList.remove('hidden');
//     }
// }



function submitNewsletter() {
    const email = document.getElementById('newsletter-email').value;
    const message = document.getElementById('newsletter-message');
    if (email && /^[^@]+@[^\.@]+\.[^\.@]+$/.test(email)) {
        message.classList.remove('hidden', 'text-red-400');
        message.classList.add('text-green-400');
        message.textContent = 'با موفقیت در خبرنامه ثبت‌نام کردید!';
        document.getElementById('newsletter-email').value = '';
        setTimeout(() => message.classList.add('hidden'), 3000);
    } else {
        message.classList.remove('hidden', 'text-green-400');
        message.classList.add('text-red-400');
        message.textContent = 'لطفاً ایمیل معتبر وارد کنید.';
    }
}

// Initialize after DOM is loaded
window.onload = function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        });
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
        }
    }




    function renderVideos() {
        const videoGallery = document.getElementById('video-gallery');
        if (videoGallery) {
            videoGallery.innerHTML = '';
            videos.forEach((video, index) => {
                const videoElement = document.createElement('div');
                videoElement.className = 'video-card relative rounded-xl shadow-lg animate-scale animate-fade-in';
                videoElement.style.animationDelay = `${index * 0.2}s`;
                videoElement.innerHTML = `
              <video controls poster="${video.poster}" class="w-full rounded-lg">
                <source src="${video.src}" type="video/mp4">
                مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
              </video>
              <p class="text-center mt-2 text-gray-800 dark:text-gray-200 font-bold">${video.alt}</p>
            `;
                videoGallery.appendChild(videoElement);
            });
        }
    }


    setInterval(() => {
        const slidesPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
        currentSlide = (currentSlide + 1) % Math.ceil(testimonials.length / slidesPerView);

    }, 5000);





    // Search Functionality
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
        searchBar.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = posts.filter(post =>
                post.title.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query)
            );
            renderPosts(filtered);
        });
    }

    // Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        const scrollProgress = document.getElementById('scroll-progress');
        if (scrollProgress) {
            scrollProgress.style.width = `${scrollPercent}%`;
        }
    });

    // Navbar Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        });
    }

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                if (navMenu && menuToggle) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // Initialize Render
    renderPosts();
    renderGallery();
    renderVideos();

};