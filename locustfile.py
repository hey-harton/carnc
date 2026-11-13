import random
from locust import HttpUser, task, between


class ModelApiUser(HttpUser):
    # Jeda waktu antar request setiap pengguna (0.1 - 0.5 detik)
    wait_time = between(0.1, 0.5)

    @task(3)
    def predict_endpoint(self):
        """Simulasi pengujian input acak spesifikasi mobil ke endpoint /predict"""
        brands = ["Toyota", "Honda", "Daihatsu", "Mitsubishi", "Suzuki"]
        car_names = [
            "Toyota Avanza 1.3 G",
            "Honda CR-V 1.5 Prestige Turbo",
            "Daihatsu Xenia 1.3 R",
            "Mitsubishi Xpander 1.5 Ultimate",
            "Honda Brio 1.2 E Satya",
        ]
        locations = ["Jakarta Selatan", "Jakarta Pusat", "Jakarta Barat", "Bandung", "Surabaya"]

        payload = {
            "car name": random.choice(car_names),
            "brand": random.choice(brands),
            "location": random.choice(locations),
            "transmission": random.choice(["Automatic", "Manual"]),
            "plate type": random.choice(["even plate", "odd plate"]),
            "year": random.randint(2015, 2023),
            "mileage (km)": round(random.uniform(15000.0, 120000.0), 1),
            "rear camera": random.choice([0, 1]),
            "sun roof": random.choice([0, 1]),
            "auto retract mirror": random.choice([0, 1]),
            "electric parking brake": random.choice([0, 1]),
            "map navigator": random.choice([0, 1]),
            "vehicle stability control": random.choice([0, 1]),
            "keyless push start": random.choice([0, 1]),
            "sports mode": random.choice([0, 1]),
            "360 camera view": random.choice([0, 1]),
            "power sliding door": random.choice([0, 1]),
            "auto cruise control": random.choice([0, 1]),
        }

        headers = {"Content-Type": "application/json"}
        self.client.post("/predict", json=payload, headers=headers)

    @task(1)
    def health_check_endpoint(self):
        """Simulasi pengecekan status server / health check"""
        self.client.get("/")
