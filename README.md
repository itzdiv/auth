
   <h2>Authentication System Overview</h2>
    <p>This Express.js application implements user authentication using Passport.js, bcrypt for password hashing, PostgreSQL as the database, and Google OAuth for third-party authentication.</p>
    
  <h2>Key Features:</h2>
    <ul>
        <li><strong>Session Management:</strong> Uses <code>express-session</code> to handle user sessions securely.</li>
        <li><strong>Local Authentication:</strong> Implements username-password authentication using Passport Local Strategy and bcrypt for secure password storage.</li>
        <li><strong>Google Authentication:</strong> Enables users to log in via Google OAuth2.</li>
        <li><strong>Database Integration:</strong> Stores user credentials in PostgreSQL, ensuring persistent authentication.</li>
    </ul>
    
  <h2>Authentication Flow</h2>
    <h3>Registration</h3>
    <p>When a user registers, the password is hashed using bcrypt and stored in the database.</p>
    <pre>
        INSERT INTO users (email, password) VALUES ($1, $2)
    </pre>
    
  <h3>Login</h3>
    <p>During login, the provided password is compared with the stored hashed password using bcrypt.</p>
    
   <h3>Google OAuth Login</h3>
    <p>Google authentication is handled via Passport's Google OAuth2 strategy. If the user is new, their email is stored in the database.</p>
    
  <h2>Session Handling</h2>
    <p>Users' authentication states are maintained using Passport's serialization and deserialization methods.</p>
    
  <h2>Routes Overview</h2>
    <ul>
        <li><code>GET /</code>: Home page</li>
        <li><code>GET /login</code>: Login page</li>
        <li><code>GET /register</code>: Registration page</li>
        <li><code>POST /register</code>: Handles user registration</li>
        <li><code>POST /login</code>: Handles user login</li>
        <li><code>GET /secrets</code>: Protected route requiring authentication</li>
        <li><code>GET /logout</code>: Logs out the user</li>
        <li><code>GET /auth/google</code>: Redirects users to Google OAuth</li>
    </ul>

