# StockWeb

StockWeb is a web application designed to visualize analyses of Vietnamese stock data. The project comprises a Node.js backend and a frontend developed with TypeScript and SCSS. Additionally, a Python script is included for database initialization purposes. Please note that all passwords and sensitive information within this repository are placeholders and hold no actual value.

## Features

- **Data Visualization**: Presents comprehensive analyses of Vietnamese stock data through interactive charts and graphs.
- **User Authentication**: Implements a secure login system to manage user access.
- **Responsive Design**: Ensures optimal viewing across various devices.

## Project Structure

The repository is organized as follows:

- `Client/StockWebFrontEnd/`: Contains the frontend source code.
- `Server/`: Houses the backend source code.
- `CreateTable.sql`: SQL script for creating necessary database tables.
- `Hi_Lo_Vo.csv`: Sample CSV file containing stock data.
- `insertData.py`: Python script used for inserting data into the database.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed
- **Python**: Required for running the `insertData.py` script
- **Database**: Set up a compatible database (e.g., MySQL, PostgreSQL) to store application data.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/plctrung26/StockWeb.git
   cd StockWeb
   ```

2. **Set up the backend**:

   - Navigate to the backend directory:

     ```bash
     cd Server
     ```

   - Install backend dependencies:

     ```bash
     npm install
     ```

   - Configure environment variables:

     Create a `.env` file in the `Server` directory with the following content:

     ```env
     PORT=3000
     DB_HOST=your_database_host
     DB_USER=your_database_user
     DB_PASS=your_database_password
     DB_NAME=your_database_name
     ```

     Replace the placeholder values with your actual database credentials.

   - Initialize the database:

     - Execute the `CreateTable.sql` script in your database to create the necessary tables.
     - Run the Python script to insert initial data:

       ```bash
       python insertData.py
       ```

   - Start the backend server:

     ```bash
     npm run dev
     ```

3. **Set up the frontend**:

   - Navigate to the frontend directory:

     ```bash
     cd ../Client/StockWebFrontEnd
     ```

   - Install frontend dependencies:

     ```bash
     npm install
     ```

   - Start the frontend application:

     ```bash
     npm run dev
     ```

## Important Notice

All passwords and sensitive information found within this repository are for example purposes only and do not hold any real value. Ensure you replace these placeholders with your own secure credentials before deploying the application.



