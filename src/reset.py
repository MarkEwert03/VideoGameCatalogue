import os
import sqlite3

CURR_PATH = os.path.dirname(os.path.abspath(__file__))
os.chdir(os.path.join(CURR_PATH, ".."))
DB_PATH = 'vgcat.db'
CREATE_PATH = 'SQL/create.sql'
DELETE_PATH = 'SQL/delete.sql'


def main():
    conn = None
    try:
        # Connect to the database
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        # Read the SQL delete script
        with open(DELETE_PATH, 'r') as delete_file:
            # Execute the SQL delete script
            delete_script = delete_file.read()
            cursor.executescript(delete_script)

        # Read the SQL create script
        with open(CREATE_PATH, 'r') as create_file:
            # Execute the SQL create script
            create_script = create_file.read()
            cursor.executescript(create_script)

        conn.commit()
        print("Video game catalogue database created successfully as vgcat.db")

    except sqlite3.Error as e:
        print("sqlite3 error --- ", e)

    finally:
        # Close the database connection if it exists
        if conn:
            conn.close()


if __name__ == '__main__':
    main()
