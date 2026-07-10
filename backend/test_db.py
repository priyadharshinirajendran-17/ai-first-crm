from sqlalchemy import text
from app.database.database import SessionLocal

db = SessionLocal()

print("COUNT:")
print(db.execute(text("SELECT COUNT(*) FROM interactions")).fetchone())

print("\nROWS:")
for row in db.execute(text("SELECT * FROM interactions")).fetchall():
    print(row)

db.close()