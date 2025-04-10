document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  const currentYearElement = document.getElementById('currentYear');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
  
  // Theme switcher
  const toggleSwitch = document.querySelector('#checkbox');
  const currentTheme = localStorage.getItem('theme');
  
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark' && toggleSwitch) {
      toggleSwitch.checked = true;
    }
  }
  
  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }    
  }
  
  if (toggleSwitch) {
    toggleSwitch.addEventListener('change', switchTheme);
  }

  // Navigation toggle for mobile
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const primaryNavigation = document.querySelector('.primary-navigation');
  
  if (mobileNavToggle && primaryNavigation) {
    mobileNavToggle.addEventListener('click', () => {
      const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
      mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
      primaryNavigation.classList.toggle('show');
      document.body.classList.toggle('nav-open');
    });
  }

  // Scroll animation for navigation
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      navbar.style.padding = '0.5rem 0';
      navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.padding = '1rem 0';
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
  });

  // Enhanced project data
  const projectsData = [
    {
      id: 1,
      title: 'E-Commerce Website',
      category: 'web',
      description: 'A fully responsive e-commerce platform with product filtering, cart functionality, and user authentication.',
      detailedDescription: 'This e-commerce platform features a modern, responsive design that works seamlessly on desktop and mobile devices. Users can browse products, filter by category, add items to cart, and complete the checkout process. The admin panel allows store owners to manage products, track orders, and view sales analytics.',
      image: 'project-1.jpg',
      liveUrl: '#',
      codeUrl: '#',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'SASS']
    },
    {
      id: 2,
      title: 'Mobile App UI Design',
      category: 'design',
      description: 'UI/UX design for a fitness tracking mobile application with a clean, modern interface.',
      detailedDescription: 'This fitness tracking app design focuses on user experience with intuitive navigation and clear data visualization. The design includes screens for activity tracking, workout planning, nutrition monitoring, and social features to connect with friends and share achievements.',
      image: 'project-2.jpg',
      liveUrl: '#',
      codeUrl: '#',
      techStack: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Prototyping']
    },
    {
      id: 3,
      title: 'Task Management App',
      category: 'app',
      description: 'A web application for managing tasks, projects, and team collaboration.',
      detailedDescription: 'This task management application helps teams stay organized with features for creating projects, assigning tasks, setting deadlines, and tracking progress. The app includes real-time updates, file sharing capabilities, and integrations with popular calendar and communication tools.',
      image: 'project-3.jpg',
      liveUrl: '#',
      codeUrl: '#',
      techStack: ['Vue.js', 'Firebase', 'Vuex', 'TailwindCSS', 'Jest']
    },
    {
      id: 4,
      title: 'Portfolio Template',
      category: 'web',
      description: 'A customizable portfolio template for developers and designers to showcase their work.',
      detailedDescription: 'This portfolio template is designed for developers and designers who want a professional way to showcase their projects. It features a clean, modern design with smooth animations, project filtering, and responsive layout. The template is fully customizable and easy to deploy.',
      image: 'project-4.jpg',
      liveUrl: '#',
      codeUrl: '#',
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Responsive Design']
    }
  ];

  const projectsGrid = document.getElementById('projectsGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');

  // Load all projects initially
  loadProjects('all');

  // Filter button click handlers
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Load filtered projects
      loadProjects(filter);
    });
  });

  // Enhanced project loading with click handlers for modal
  function loadProjects(filter) {
    if (!projectsGrid) return;
    
    // Clear existing projects
    projectsGrid.innerHTML = '';
    
    // Filter projects
    const filteredProjects = filter === 'all' 
      ? projectsData 
      : projectsData.filter(project => project.category === filter);
    
    // Create project cards
    filteredProjects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card fade-in';
      projectCard.innerHTML = `
        <div class="project-image">${project.image ? `<img src="assets/images/${project.image}" alt="${project.title}">` : project.title}</div>
        <div class="project-info">
          <span class="project-category">${project.category}</span>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="project-links">
            <a href="${project.liveUrl}" class="btn primary" target="_blank">Live Demo</a>
            <a href="${project.codeUrl}" class="btn secondary" target="_blank">View Code</a>
            <button class="btn secondary view-details" data-id="${project.id}">View Details</button>
          </div>
        </div>
      `;
      
      projectsGrid.appendChild(projectCard);
      
      // Add animation delay
      projectCard.style.animationDelay = `${(filteredProjects.indexOf(project) * 0.1)}s`;
    });

    // If no projects match the filter
    if (filteredProjects.length === 0) {
      projectsGrid.innerHTML = '<p class="no-projects">No projects found for this category.</p>';
    }
    
    // Add click handlers for project detail buttons
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    viewDetailsButtons.forEach(button => {
      button.addEventListener('click', () => {
        const projectId = parseInt(button.getAttribute('data-id'));
        openProjectModal(projectId);
      });
    });
  }

  // Project Modal
  const modal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  const closeModalButton = document.querySelector('.close-modal');
  
  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
  }
  
  // Close modal when clicking outside the content
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
  
  // Close with Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
  
  function openProjectModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project || !modalContent || !modal) return;
    
    modalContent.innerHTML = `
      <div class="project-detail">
        <div class="project-detail-image">
          <img src="assets/images/${project.image}" alt="${project.title}">
        </div>
        <div class="project-detail-info">
          <span class="project-detail-category">${project.category}</span>
          <h2>${project.title}</h2>
          <div class="project-detail-description">
            <p>${project.detailedDescription}</p>
          </div>
          <div class="project-tech-stack">
            <h3>Technologies Used</h3>
            <div class="tech-tags">
              ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
          </div>
          <div class="project-links">
            <a href="${project.liveUrl}" class="btn primary" target="_blank">Live Demo</a>
            <a href="${project.codeUrl}" class="btn secondary" target="_blank">View Code</a>
          </div>
        </div>
      </div>
    `;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
  
  function closeModal() {
    if (!modal) return;
    
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
  }

  // Animate elements when they come into view
  const animatedElements = document.querySelectorAll('.section-title, .about-content, .skill-category, .contact-container');
  
  const appearOptions = { 
    threshold: 0.25,
    rootMargin: "0px 0px -100px 0px"
  };
  
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  
  animatedElements.forEach(element => {
    element.style.opacity = "0";
    appearOnScroll.observe(element);
  });

  // Animate skill bars when they come into view
  const skillLevels = document.querySelectorAll('.skill-level');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const level = entry.target.getAttribute('data-level');
        entry.target.style.width = `${level}%`;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  skillLevels.forEach(skill => {
    observer.observe(skill);
  });

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      // Here you would typically send data to a server
      console.log('Form submitted:', { name, email, message });
      
      // Show success message
      contactForm.innerHTML = '<div class="success-message">Thank you for your message! I\'ll get back to you soon.</div>';
    });
  }

  // Mini game functionality
  const gameBoard = document.getElementById('game-board');
  const startButton = document.getElementById('start-game');
  const scoreElement = document.getElementById('score');
  const timeElement = document.getElementById('time');
  
  let gameActive = false;
  let score = 0;
  let timeLeft = 30;
  let gameTimer;
  let targetTimer;

  if (startButton && gameBoard) {
    startButton.addEventListener('click', startGame);
  }

  function startGame() {
    if (gameActive) return;
    
    gameActive = true;
    score = 0;
    timeLeft = 30;
    
    scoreElement.textContent = score;
    timeElement.textContent = timeLeft;
    startButton.disabled = true;
    gameBoard.innerHTML = '';
    
    createTarget();
    
    gameTimer = setInterval(() => {
      timeLeft--;
      timeElement.textContent = timeLeft;
      
      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);
  }

  function createTarget() {
    if (!gameActive) return;
    
    const target = document.createElement('div');
    target.className = 'target';
    
    // Random position within game board
    const maxX = gameBoard.clientWidth - 50;
    const maxY = gameBoard.clientHeight - 50;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
    
    target.addEventListener('click', () => {
      if (!gameActive) return;
      
      score++;
      scoreElement.textContent = score;
      target.remove();
      createTarget();
    });
    
    gameBoard.appendChild(target);
    
    // Remove target if not clicked after some time
    setTimeout(() => {
      if (gameActive && target.isConnected) {
        target.remove();
        createTarget();
      }
    }, 2000);
  }

  function endGame() {
    gameActive = false;
    clearInterval(gameTimer);
    clearTimeout(targetTimer);
    
    gameBoard.innerHTML = `
      <div class="game-over">
        <h3>Game Over!</h3>
        <p>Your score: ${score}</p>
      </div>
    `;
    
    startButton.disabled = false;
  }

  // Enhanced Typing animation with randomized timing
  const typingTextElement = document.getElementById('typingText');
  if (typingTextElement) {
    const phrases = [
      'Web Developer & Designer',
      'Frontend Specialist',
      'UI/UX Enthusiast',
      'Creative Problem Solver'
    ];
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let pauseDuration = 1500;

    // Make typing speed slightly randomized for more natural effect
    function getRandomTypingSpeed(base, variance) {
      return Math.floor(base + (Math.random() * variance - variance/2));
    }
    
    function typeText() {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (isDeleting) {
        // Deleting text
        typingTextElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = getRandomTypingSpeed(40, 20); // Faster when deleting
      } else {
        // Typing text
        typingTextElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = getRandomTypingSpeed(80, 40); // Normal speed when typing
      }

      // If completed typing the phrase
      if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = pauseDuration; // Pause before deleting
      } 
      // If completed deleting the phrase
      else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length; // Move to next phrase
      }

      setTimeout(typeText, typingSpeed);
    }

    // Start the typing animation
    typeText();
  }

  // Project carousel implementation
  const projectCarousel = document.getElementById('projectCarousel');
  const prevProjectBtn = document.getElementById('prevProject');
  const nextProjectBtn = document.getElementById('nextProject');
  const carouselIndicators = document.getElementById('carouselIndicators');
  
  if (projectCarousel && prevProjectBtn && nextProjectBtn && carouselIndicators) {
    // Featured projects (using the first 3 projects from projectsData)
    const featuredProjects = projectsData.slice(0, 3);
    let currentSlide = 0;
    
    // Create carousel slides
    featuredProjects.forEach((project, index) => {
      const slide = document.createElement('div');
      slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
      slide.innerHTML = `
        <div class="carousel-project">
          <div class="carousel-image">
            <img src="assets/images/${project.image}" alt="${project.title}">
          </div>
          <div class="carousel-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="carousel-links">
              <button class="btn secondary view-details" data-id="${project.id}">View Details</button>
              <a href="${project.liveUrl}" class="btn primary" target="_blank">Live Demo</a>
            </div>
          </div>
        </div>
      `;
      projectCarousel.appendChild(slide);
      
      // Create indicator
      const indicator = document.createElement('span');
      indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
      indicator.dataset.slide = index;
      carouselIndicators.appendChild(indicator);
      
      // Add click event to indicator
      indicator.addEventListener('click', () => {
        goToSlide(index);
      });
    });
    
    // Add click events to carousel buttons
    prevProjectBtn.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
    });
    
    nextProjectBtn.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
    });
    
    // Add click events to view details buttons inside carousel
    const carouselDetailBtns = projectCarousel.querySelectorAll('.view-details');
    carouselDetailBtns.forEach(button => {
      button.addEventListener('click', () => {
        const projectId = parseInt(button.getAttribute('data-id'));
        openProjectModal(projectId);
      });
    });
    
    // Function to go to specific slide
    function goToSlide(slideIndex) {
      const slides = document.querySelectorAll('.carousel-slide');
      const indicators = document.querySelectorAll('.carousel-indicator');
      
      // Handle wrap-around
      if (slideIndex < 0) {
        slideIndex = slides.length - 1;
      } else if (slideIndex >= slides.length) {
        slideIndex = 0;
      }
      
      // Update current slide
      currentSlide = slideIndex;
      
      // Update slides and indicators
      slides.forEach((slide, index) => {
        if (index === slideIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
      
      indicators.forEach((indicator, index) => {
        if (index === slideIndex) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    }
    
    // Auto-rotate carousel every 5 seconds
    let carouselInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
    
    // Pause auto-rotation when hovering over carousel
    projectCarousel.addEventListener('mouseenter', () => {
      clearInterval(carouselInterval);
    });
    
    // Resume auto-rotation when mouse leaves
    projectCarousel.addEventListener('mouseleave', () => {
      carouselInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 5000);
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (!target) return;
      
      window.scrollTo({
        top: target.offsetTop - 70, // Account for fixed header
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (primaryNavigation && primaryNavigation.classList.contains('show')) {
        primaryNavigation.classList.remove('show');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      }
    });
  });
  
  // Enhanced animations for skill bars
  const skillBars = document.querySelectorAll('.skill-bar');
  
  skillBars.forEach(bar => {
    bar.addEventListener('mouseenter', () => {
      const skillLevel = bar.querySelector('.skill-level');
      if (skillLevel) {
        skillLevel.style.opacity = '0.8';
        skillLevel.style.transform = 'scaleX(1.03)';
      }
    });
    
    bar.addEventListener('mouseleave', () => {
      const skillLevel = bar.querySelector('.skill-level');
      if (skillLevel) {
        skillLevel.style.opacity = '1';
        skillLevel.style.transform = 'scaleX(1)';
      }
    });
  });

  // Add scroll indicator animation
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.style.animation = 'bounce 2s infinite';
  }
});

// Add bounce animation if not already defined in CSS
if (!document.querySelector('style#bounce-animation')) {
  const style = document.createElement('style');
  style.id = 'bounce-animation';
  style.textContent = `
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      60% { transform: translateY(-5px); }
    }
    .scroll-indicator {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0.6;
      transition: opacity 0.3s;
    }
    .scroll-indicator:hover {
      opacity: 1;
    }
    .scroll-indicator i {
      font-size: 24px;
      color: var(--color-primary);
    }
  `;
  document.head.appendChild(style);
}
