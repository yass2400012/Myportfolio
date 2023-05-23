function switchLanguage(language) {
    let currentUrl = window.location.href;
    
    let url;
    if (language === 'fr') {
      
      url = currentUrl.replace('/public/index.html', '/public/index_fr.html');
    } else if (language === 'eng') {
      
      url = currentUrl.replace('/public/index_fr.html', '/public/index.html');
    }
    
    window.location.href = url;
  }
  
  const languageOptions = document.getElementsByClassName('language-option');
  for (let i = 0; i < languageOptions.length; i++) {
    languageOptions[i].addEventListener('click', function () {
      const language = this.dataset.language;
      
      for (let j = 0; j < languageOptions.length; j++) {
        languageOptions[j].classList.remove('active');
      }
      this.classList.add('active');
      
      localStorage.setItem('selectedLanguage', language);
      
      switchLanguage(language);
    });
  }

  const selectedLanguage = localStorage.getItem('selectedLanguage');
  if (selectedLanguage) {
    for (let i = 0; i < languageOptions.length; i++) {
      const language = languageOptions[i].dataset.language;
      if (language === selectedLanguage) {
        languageOptions[i].classList.add('active');
        break;
      }
    }
}

const form = document.querySelector('form');
const messageContainer = document.getElementById('message-container');

function validateInputs(fullName, email, phoneNumber, subject, message) {
  const fields = [
    { value: fullName, fieldName: 'Full Name' },
    { value: email, fieldName: 'Email' },
    { value: phoneNumber, fieldName: 'Phone Number' },
    { value: subject, fieldName: 'Subject' },
    { value: message, fieldName: 'Message' }
  ];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  for (const field of fields) {
    if (!field.value.trim()) {
      alert(`Please enter ${field.fieldName}`);
      return false;
    }
  }

  if (!emailRegex.test(email) || !phoneRegex.test(phoneNumber)) {
    alert('Please enter a valid email and phone number');
    return false;
  }

  return true;
}

function handleSubmit(event) {
  event.preventDefault();

  const fullName = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;
  const phoneNumber = document.getElementById('phone').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  if (!validateInputs(fullName, email, phoneNumber, subject, message)) {
    return;
  }

  const requestData = {
    fullName: fullName,
    email: email,
    phoneNumber: phoneNumber,
    subject: subject,
    message: message
  };

  fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  })
    .then(function(response) {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then(function(data) {
      console.log('Email sent:', data);
      alert('Email sent');
      form.reset();
    })
    .catch(function(error) {
      console.error('Error sending email:', error);
      alert('Something went wrong');
    });
}

form.addEventListener('submit', handleSubmit);

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop -150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            })
        };
    });

    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

};

ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
})

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-container, .portfolio-box .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

