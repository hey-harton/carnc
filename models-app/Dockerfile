# Base image Python
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements dan install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy semua file backend
COPY . .

# Expose port
EXPOSE 8000

# Command default (bisa di-override di docker-compose)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]