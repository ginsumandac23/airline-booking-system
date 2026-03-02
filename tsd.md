# Technical Specifications Document

## 1. Title Page
- **Project Name**: Airline Booking System
- **Version**: 1.0
- **Date**: February 26, 2026
- **Author(s)**: (Bootcamp Group Names Here)

## 2. Table of Contents
1. [Introduction](#3-introduction)
2. [Overall Description](#4-overall-description)
3. [Visual Mockup Reference](#5-visual-mockup-reference)
4. [Features](#6-features)
5. [Functional Requirements](#7-functional-requirements)
6. [Non-Functional Requirements](#8-non-functional-requirements)
7. [Data Requirements](#9-data-requirements)
8. [External Interface Requirements](#10-external-interface-requirements)
9. [Glossary](#11-glossary)
10. [Appendices](#12-appendices)

## 3. Introduction
- **Purpose**: To develop an Airline Booking System that allows customers to search flights, book tickets, select seats, and manage reservations, while giving admins tools to manage flights and view reports.
- **Scope**: 
  - Customer: flight search, booking, seat selection, add-on option, payment, booking history.
  - Admin: flight management (CRUD), view bookings and reports.
  - Not included: advanced analytics, loyalty programs, or multi-currency payments.
- **Definitions, Acronyms, and Abbreviations**: 
  - **PNR**: Passenger Name Record
  - **API**: Application Programming Interface
  - **CRUD**: Create, Read, Update, Delete
- **References**: None

## 4. Overall Description
- **Product Perspective**: Standalone web application for airline customers and administrators.
- **Product Functions**: 
  - User registration and login
  - Flight search and filters
  - Booking management and seat selection
  - Admin flight CRUD and reporting
  - Payment processing
- **User Classes and Characteristics**: 
  - **End Users**: Book flights, manage reservations
  - **Admin Users**: Airline staff managing flights and bookings
- **Operating Environment**: 
  - **Client**: Modern web browsers (Chrome, Firefox, Safari)
  - **Server**: Node.js backend, MongoDB database
- **Assumptions and Dependencies**: 
  - Users have internet access
  - Payment gateway API is available

## 5. Visual Mockup Reference
- **Link or Screenshot**:

## 6. Features
- **User Registration and Login**: Users can create accounts and log in.
- **Flight Search and Filters**: Users can search flights and filter it.
- **Booking Flights**: Users can book flights.
- **Seat Selection**: Users can choose which seat is still available.
- **Add-on Options**: Users can add an extra luggage/baggage, in-flight meals, or priority boarding.
- **View Booking History**: Users can view his/her booking history
- **Admin Flight CRUD**: Admin can create, update, remove flights.
- **Payment Gateway Integration**: Users can make payments securely using a payment gateway.

## 7. Functional Requirements
### Use Cases
- **Use Case 1**: User Registration
  - **Title**: Register a new user
  - **Description**: Customers create an account with email/password.
  - **Actors**: End User / Customer
  - **Preconditions**: User is on the registration page.
  - **Postconditions**: Account is created and user logged in
  - **Main Flow**: User enters email and password > User clicks "Register" > System creates account and logs in user.
  - **Alternate Flows**: User enters invalid email > System shows error.

- **Use Case 2**: Search Flight
  - **Title**: Customer/Guest Search flight 
  - **Description**: Customers searches for flights with it's filters
  - **Actors**: End User / Customer
  - **Preconditions**: User logged in or a guest.
  - **Postconditions**: Flight and cabin class option displayed
  - **Main Flow**: User selects origin, destination, and date > select their preferred cabin class (Economy, Business, or First Class) > User clicks "Search Flights" > System displays available flights.
  - **Alternate Flows**:
    - No flights found > System shows "No flights available".
    - Class Fully Booked > System prompts "Selected class is fully booked. Please choose another class."
    - Missing input > System prompts "Please fill in all required fields".

- **Use Case 3**: Book Flight & Seat Selection
  - **Title**: Customers book and choose seats+
  - **Description**: Customers book a flight, choose available seats, and add optional services such as extra luggage or in-flight meals.
  - **Actors**: End User / Customer
  - **Preconditions**: Flight available, logged in, Seats are available for selected class
  - **Postconditions**: Booking stored, seat assigned, Selected class recorded, Add-ons (if any) attached to booking, Payment confirmed
  - **Main Flow**: User searches and selects a flight. > System displays "available cabin classes: Economy Class, Business Class, First Class" > User selects preferred class > System displays available seats based on selected class > User chooses seat(s) > User enters passenger information > User selects optional add-ons: Extra luggage/baggage, In-flight meal/food, Priority Boarding > System calculates total cost (base fare + class upgrade + add-ons) > User proceeds to payment > System processes payment > System confirms booking and displays booking reference
  - **Alternate Flows**: 
    - Seat unavailable > System prompts "Selected seat is no longer available. Please choose another seat." > User selects a different seat
    - Add-on Unavailable > System shows "Selected add-on (e.g., specific meal) is unavailable." > System prompts "select an alternative option."
    - Payment failure > System shows "Payment failed, try another method".

- **Use Case 4**: Admin Manage Flights
  - **Title**: Admin flights CRUD
  - **Description**: Admin adds, edits, removes flights
  - **Actors**: Admin
  - **Preconditions**: Admin logged in
  - **Postconditions**: Flight list updated
  - **Main Flow**: Admin logs in > Admin adds, edits, or deletes flight > System updates database and confirms action.
  - **Alternate Flows**:
    - Invalid input > System shows "Please fill in all required fields correctly"
    - Flight number already exists (add) > System shows "Flight number already exists".

### System Features
- **Feature 1**: User Registration and Login
  - **Description**: Allow users to register and log in.
  - **Priority**: High
  - **Inputs**: Email, password
  - **Processing**: Validate input, create user account
  - **Outputs**: User is logged in
  - **Error Handling**: Show error messages for invalid input

- **Feature 2**: Flight Booking
  - **Description**: Allow users to Book Flights.
  - **Priority**: High
  - **Inputs**: Flight details, passenger info
  - **Processing**: Validate seats and payment
  - **Outputs**: Booking confirmation
  - **Error Handling**: Invalid input, payment failure

## 8. Non-Functional Requirements
- **Performance**: 
  - The application should load pages within 2 seconds.
- **Security**: 
  - Passwords should be hashed and stored securely.
  - All transactions should be encrypted using HTTPS.
- **Usability**: 
  - The application should be easy to navigate with a clean user interface.
- **Reliability**: 
  - The application should have 99.9% uptime.
- **Supportability**: 
  - The code should be well-documented and maintainable.

## 9. Data Requirements
- **Data Models**: 
  - **User**: { id, email, password_hash, role }
  - **Flight**: { id, flight_number, origin, destination, cabin_class, date, time, seats_available, price }
  - **Booking**: { id, user_id, flight_id, seat_number, add-on, status, payment_status }
- **Database Requirements**: 
  - Use MongoDB for storing user, product, and order data.
- **Data Storage and Retrieval**: 
  - Users can retrieve their account and order information.

## 10. External Interface Requirements
- **User Interfaces**: 
  - Registration/Login page
  - Flight search page
  - Booking page
  - Admin panel
  - Checkout page
- **API Interfaces**: 
  - Payment gateway API (e.g., Stripe API) for processing payments.
- **Hardware Interfaces**: 
  - None required.
- **Software Interfaces**: 
  - Interact with the MongoDB database.
  - Connect with the payment gateway for transactions.

## 11. Glossary
- **PNR**: Passenger Name Record
- **API**: Application Programming Interface
- **CRUD**: Create, Read, Update, Delete

## 12. Appendices
- **Supporting Information**: 
  - User flow diagrams
  - Wireframes
- **Revision History**: 
  - **v1.0**: Initial version - Feb 26, 2026