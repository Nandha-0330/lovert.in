from flask import Flask, request, render_template, flash, redirect, url_for, session , jsonify
import mysql.connector
import random
import string
from twilio.rest import Client
from passlib.hash import bcrypt
from flask_mail import Mail, Message
import time


app = Flask(__name__)
app.secret_key = 'YourSecretsfsdfsf32424KeyHere'

# Function to create a database connection
def create_db_connection():
    return mysql.connector.connect(
        host="srv1089.hstgr.io",
        user="u970870332_lovert",
        password="Spoider@123",
        database="u970870332_lovert",
        autocommit=True,  # Enable autocommit mode to automatically reconnect
    )

# Database Configuration
db = create_db_connection()
cursor = db.cursor()

# Flask-Mail Configuration
app.config['MAIL_SERVER'] = 'smtp.hostinger.com'  # Your SMTP server
app.config['MAIL_PORT'] = 587   # Port for SMTP (587 is commonly used for TLS)
app.config['MAIL_USERNAME'] = 'nandha@spoider.in'  # Your email
app.config['MAIL_PASSWORD'] = 'Nandha@0330'  # Your email password
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_DEFAULT_SENDER'] = 'nandha@spoider.in'

mail = Mail(app)

# Twilio configuration (replace with your Twilio credentials)
TWILIO_ACCOUNT_SID = 'AC058769b240de5ac3c5832450e93d1e97'
TWILIO_AUTH_TOKEN = '65412ad5275ebd0a686b5ebbb96dd93e'
TWILIO_PHONE_NUMBER = '+12565489968'

# Function to create a Twilio client
def create_twilio_client():
    return Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

# Create a Twilio client
twilio_client = create_twilio_client()

# Function to generate a random verification code
def generate_verification_code(length=6):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

# Function to send an email with retries
def send_email_with_retry(subject, message, recipients, max_retries=3):
    for attempt in range(max_retries):
        try:
            msg = Message(subject, recipients=recipients)
            msg.body = message
            mail.send(msg)
            return True  # Email sent successfully
        except Exception as e:
            print(f"Failed to send email (attempt {attempt + 1}): {str(e)}")
            time.sleep(2)  # Wait for a moment before retrying

    print("Max retry attempts reached. Failed to send email.")
    return False  # Max retries reached

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        location = request.form.get('location')
        event_package = request.form.get('event_package')
        event_location = request.form.get('event_location')
        
        # Store the values in the session
        session['location'] = location
        session['event_package'] = event_package
        session['event_location'] = event_location

        return redirect(url_for('book_seats'))  # Redirect to the booking page

    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/works')
def works():
    return render_template('work-system.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        # Check if the email exists in the database
        query = "SELECT id, name, email, password, email_verified FROM users WHERE email = %s"
        args = (email,)
        user = execute_query(query, args).fetchone()

        if user:
            user_id, user_name, stored_email, hashed_password, email_verified = user
            if email_verified == 1:  # Check if the email is verified
                if bcrypt.verify(password, hashed_password):
                    # Successful login, store user_id and user_name in session
                    session['user_id'] = user_id
                    session['user_name'] = user_name
                    flash("Login successful.")
                    return redirect(url_for('index'))  # Redirect to the index page after successful login
                else:
                    flash("Incorrect password. Please try again.")
            else:
                flash("Email is not verified. Please check your email for verification instructions.")
        else:
            flash("Email not found. Please sign up.")

    return render_template('login.html')

# Function to execute a database query with error handling and reconnection
def execute_query(query, args=None):
    try:
        cursor = db.cursor()
        if args:
            cursor.execute(query, args)
        else:
            cursor.execute(query)
        return cursor
    except mysql.connector.Error as err:
        print(f"Database error: {err}")
        # Reconnect to the database and retry the query
        db.reconnect(attempts=3, delay=2)  # Retry up to 3 times with a 2-second delay
        cursor = db.cursor()
        if args:
            cursor.execute(query, args)
        else:
            cursor.execute(query)
        return cursor

# Use the execute_query function to perform database operations
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
        dob = request.form['dob']  # Get the DOB from the form
        password = request.form['password']

        # Check if email is unique
        query = "SELECT id FROM users WHERE email = %s"
        args = (email,)
        existing_user = execute_query(query, args).fetchone()

        if existing_user:
            flash("Email is already registered. Please use a different email.")
        else:
            # Hash the password using bcrypt
            hashed_password = bcrypt.hash(password)

            # Generate verification code
            email_verification_code = generate_verification_code()

            # Hash the email verification code using bcrypt
            email_verification_hash = email_verification_code

            # Save user data and hashed email verification code to the database
            query = "INSERT INTO users (name, email, phone, dob, password, email_verification_code) VALUES (%s, %s, %s, %s, %s, %s)"
            args = (name, email, phone, dob, hashed_password, email_verification_hash)
            execute_query(query, args)
            session['email'] = email

            # Send verification email
            email_subject = "Verify Your Email"
            email_message = f"Your email verification code is: {email_verification_code}"
            if send_email_with_retry(email_subject, email_message, [email]):
                flash("A verification code has been sent to your email.")
                return redirect(url_for('verification'))  # Redirect to the verification page after signup
            else:
                flash("Failed to send verification email.")

    return render_template('signup.html')

@app.route('/verification', methods=['GET', 'POST'])
def verification():
    if request.method == 'POST':
        email_verification_code = request.form['email_verification_code']

        # Retrieve email from session
        email = session.get('email')

        if email:
            # Retrieve the user's stored email verification code
            query = "SELECT email_verification_code, id FROM users WHERE email = %s"  # Added 'id' to the SELECT query
            args = (email,)
            user_data = execute_query(query, args).fetchone()

            if user_data:
                stored_email_verification_code, user_id = user_data  # Unpack the data

                # Compare the entered OTP with the stored verification code
                if email_verification_code == stored_email_verification_code:
                    # Mark email as verified
                    query = "UPDATE users SET email_verified = 1 WHERE id = %s"
                    args = (user_id,)  # Use 'user_id' to update the correct user
                    execute_query(query, args)
                    flash("Email has been verified successfully.")

                    # Redirect to the login page after verification
                    return redirect(url_for('login'))
                else:
                    flash("Invalid OTP. Please try again.")
            else:
                flash("Email not found or verification code has expired. Please sign up again.")
        else:
            flash("Email not found in session. Please sign up again.")

    return render_template('verification.html')

def send_otp_via_twilio(phone_number, otp):
    try:
        message = twilio_client.messages.create(
            body=f'Your OTP for booking seats: {otp}',
            from_=TWILIO_PHONE_NUMBER,
            to='+91 ' +phone_number
        )
        return True
    except Exception as e:
        print(f"Failed to send OTP: {str(e)}")
        return False

# Flask route for OTP verification
@app.route('/verify_otp', methods=['POST'])
def verify_otp():
    # Retrieve the OTP entered by the user from the request data
    data = request.get_json()
    user_entered_otp = data.get('otp')

    # Retrieve the stored OTP from the session
    stored_otp = session.get('otp')

    # Compare the user-entered OTP with the stored OTP
    if user_entered_otp == stored_otp:
        # OTP verification successful
        return jsonify({'success': True})
    else:
        # OTP verification failed
        return jsonify({'success': False})

# Modify the '/book_seats' route to check OTP verification before storing data
@app.route('/book_seats', methods=['GET', 'POST'])
def book_seats():
    if 'user_id' not in session:
        flash("Please log in to book seats.")
        return redirect(url_for('login'))
    elif request.method == 'POST':
        user_id = session.get('user_id')
        
        if user_id:
            # Check if OTP is verified
            if 'otp' not in session or request.form.get('otp') != session.get('otp'):
                flash("OTP verification required before booking seats.")
                return render_template('booking.html')
            
            name = request.form['name']
            event_date = request.form['event_date']
            phone = request.form['phone']
            email = request.form['email']
            event_details = request.form['event_details']
            location = session.get('location')
            event_package = session.get('event_package')
            event_location = session.get('event_location')

            # Retrieve DOB from the users table
            query = "SELECT dob FROM users WHERE id = %s"
            args = (user_id,)
            dob_result = execute_query(query, args).fetchone()

            if dob_result:
                dob = dob_result[0]  # Extract DOB from the query result
            else:
                dob = None

            # Store booking details in the database, including DOB
            query = "INSERT INTO bookings (user_id, name, event_date, phone, email, location, event_package, event_location,event_details, dob) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            args = (user_id, name, event_date, phone, email, location, event_package, event_location, event_details,dob)
            execute_query(query, args)
            
            # Clear the OTP from the session after successful booking
            session.pop('otp', None)
            session.pop('otp_timestamp', None)

            return render_template('booking_success.html')  # Redirect to a success page
        else:
            flash("Please log in to book seats.")
            return redirect(url_for('login'))

    return render_template('booking.html')


@app.route('/send_otp', methods=['POST'])
def send_otp():
    # Generate a new OTP
    otp = generate_verification_code(length=6)

    # Store the OTP and its creation timestamp in the session
    session['otp'] = otp
    session['otp_timestamp'] = time.time()

    # Retrieve the user's phone number from the form
    phone_number = request.json.get('phone')  # Use request.json to get JSON data

    if phone_number:
        if send_otp_via_twilio(phone_number, otp):
            return jsonify({'success': True})  # Sending OTP succeeded
        else:
            return jsonify({'success': False})  # Sending OTP failed
    else:
        return jsonify({'success': False})  # Invalid request, phone number not provided

@app.route('/submit_inquiry', methods=['POST'])
def submit_inquiry():
    if 'user_id' not in session:
        flash("Please log in to submit an inquiry.")
        return redirect(url_for('login'))

    if request.method == 'POST':
        # Get form data
        name = request.form['name']
        email = request.form['email']
        event_type = request.form['event_type']
        phone_number = request.form['phone_number']
        event_date = request.form['event_date']
        event_location = request.form['event_location']
        num_guests = int(request.form['num_guests'])
        budget = float(request.form['budget'])
        preferred_theme = request.form['preferred_theme']
        catering_requirements = request.form['catering_requirements']
        event_details = request.form['event_details']

        try:
            # Define the SQL query
            sql = """
            INSERT INTO event_inquiries
            (user_id, name, email, event_type, phone_number, event_date, event_location,
            num_guests, budget, preferred_theme, catering_requirements, event_details)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            
            # Define the query parameters
            values = (session['user_id'], name, email, event_type, phone_number, event_date, event_location,
                      num_guests, budget, preferred_theme, catering_requirements, event_details)

            # Execute the query using your execute_query function
            cursor = execute_query(sql, values)

            # Commit the transaction
            db.commit()

            return render_template('submitted.html')  # Redirect to a success page
        except Exception as e:
            print(f"Error: {e}")
            return "An error occurred while submitting the inquiry."




@app.route('/logout')
def logout():
    # Clear the session variables related to the user.
    session.pop('user_id', None)
    session.pop('user_name', None)
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run( host='0.0.0.0',
        port=random.randint(2000, 9000),
        debug=True)
