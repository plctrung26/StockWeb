import pyodbc
import datetime
import csv
import os

SERVER = 'LAPTOP-9T98U3JP\CHITRUNG'
DATABASE = 'Stock'
DATA_FOLDER = "D:/StockWeb/"
table_name = "StockData"
columns_KE_HOACH = [
    'DATE',
    'Item',
    'T1_1',
    'T1_2',
    'T1_3',
    'T2_1',
    'T2_2',
    'T2_3',
    'T3_1',
    'T3_2',
    'T3_3',
    'T4_1',
    'T4_2',
    'T4_3',
    'Type',
    'Delta',
    'Time',
    'ValVN30',
    'VolMax5m'
]

# Database connection
connectionString = f'DRIVER={{ODBC Driver 18 for SQL Server}};SERVER={SERVER};DATABASE={DATABASE};TrustServerCertificate=yes;Trusted_Connection=yes'
conn = pyodbc.connect(connectionString)
cursor = conn.cursor()

for filename in sorted(os.listdir(DATA_FOLDER)):
    if '.csv' not in filename:
        continue
    with open(DATA_FOLDER + filename, mode='r', newline='', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        columns = columns = ', '.join(field.replace("-", "_") for field in csv_reader.fieldnames)  
        values = []
        param_placeholders = ', '.join(['?' for _ in csv_reader.fieldnames])  # Placeholder for parameterized query
        

        # Read rows and prepare parameters
        for row in csv_reader:
            row_values = [
                value if isinstance(value, str) and not value.replace('.', '', 1).replace('-','',1).isdigit() else
                float(value) if value.replace('.', '', 1).replace('-','',1).isdigit() else
                None  # Convert empty values to None (for NULL in SQL)
                for value in row.values()
            ]
            values.append(row_values)

        # Execute query in batches (optional for large files)
        if values:
            sql_query = f"INSERT INTO {table_name} ({columns}) VALUES ({param_placeholders})"
            print(sql_query)
            cursor.executemany(sql_query, values)  # Efficient batch execution
            conn.commit()  # Commit after each file

# Close the connection
cursor.close()
conn.close()


now = datetime.datetime.now()
print(now)