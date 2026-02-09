# FastAPI Project Boilerplate

Starter template for **FastAPI** projects with JWT authentication and asynchronous **SQLAlchemy** operations.  
Designed to help you quickly set up a scalable backend with proper structure, authentication, and database integration.

---

## Features

- JWT authentication using **FastAPI Users**  
- Asynchronous SQLAlchemy database operations  
- Organized folder structure with API versioning, routers, DB, auth, and schemas  
- Environment variable configuration for easy setup  
- Ready for local development  

---

## Tech Stack

- Python 3.13.5  
- [FastAPI](https://fastapi.tiangolo.com/)  
- [SQLAlchemy (Async)](https://docs.sqlalchemy.org/)  
- [FastAPI Users](https://frankie567.github.io/fastapi-users/) for JWT authentication  
- [aiomysql](https://aiomysql.readthedocs.io/en/latest/) (Async MySQL driver)  
- [python-dotenv](https://pypi.org/project/python-dotenv/) for environment variables  
- [Uvicorn](https://www.uvicorn.org/) (ASGI server)  

---

## Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/fastapi-project-boilerplate.git
cd fastapi-project-boilerplate
```
2. Create a virtual environment and activate it:
```
python -m venv venv
source venv/bin/activate   # Linux / macOS
venv\Scripts\activate      # Windows

```

3. Install dependencies:
```
pip install -r requirements.txt

```

4. Create a .env file in the project root with the following content:
```
DATABASE_URL=mysql+aiomysql://root:password@localhost/fastapi_db
SECRET_KEY=your-secret-key
```

5. Run the server
```
uvicorn main:app --reload

```

6. Access the API documentation at:
   http://127.0.0.1:8000/docs


## Folder Structure

- api/ – Organize your API routes by version
- db/ – Database models, tables, and session setup
- auth/ – Authentication logic, JWT handling, user services
- schemas/ – Request and response data structures using Pydantic
- main.py – FastAPI app entry point

## Additional Resources

- [FastAPI](https://fastapi.tiangolo.com/)  
- [SQLAlchemy (Async)](https://docs.sqlalchemy.org/)  
- [FastAPI Users](https://frankie567.github.io/fastapi-users/)
