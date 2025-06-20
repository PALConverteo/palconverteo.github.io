// --- User Authentication and Management ---

// This function will be called by the header-loader once the header is injected.
function initializeAuth() {
  const authButton = document.getElementById('auth-button');
  const loginModal = document.getElementById('login-modal');
  const closeModalButton = document.querySelector('.close-button');
  const loginForm = document.getElementById('login-form');

  if (!authButton || !loginModal) {
    console.error('Auth UI elements not found. Initialization failed.');
    return;
  }

  function updateAuthState() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user && user.isLoggedIn) {
      authButton.textContent = 'Logout';
    } else {
      authButton.textContent = 'Login';
    }
  }

  authButton.addEventListener('click', function() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user && user.isLoggedIn) {
      // Logout
      sessionStorage.removeItem('user');
      updateAuthState();
      alert('You have been logged out.');
    } else {
      // Show login modal
      loginModal.style.display = 'block';
    }
  });

  closeModalButton.addEventListener('click', function() {
    loginModal.style.display = 'none';
  });

  window.addEventListener('click', function(event) {
    if (event.target == loginModal) {
      loginModal.style.display = 'none';
    }
  });

  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const hashedId = await sha256(email.trim().toLowerCase());
    
    const user = {
      isLoggedIn: true,
      email: email,
      userId: hashedId
    };
    
    sessionStorage.setItem('user', JSON.stringify(user));
    loginModal.style.display = 'none';
    updateAuthState();
    alert('Login successful!');
  });
  
  // Initial state check
  updateAuthState();
}

// --- Helper Functions (globally available) ---

// SHA-256 hashing function (using browser's SubtleCrypto API)
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// DataLayer Helper
function enrichDataLayer(payload) {
  const user = JSON.parse(sessionStorage.getItem('user'));
  if (user && user.isLoggedIn) {
    payload.user_properties = {
      user_id: user.userId
    };
  }
  return payload;
} 