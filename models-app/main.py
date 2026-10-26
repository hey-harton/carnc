from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import pandas as pd
import os

app = FastAPI(title="Used Car Price Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = os.getenv("MODEL_PATH", "random_forest_used_car.pkl")
if not os.path.exists(MODEL_PATH) and os.path.exists("model.pkl"):
    MODEL_PATH = "model.pkl"

if os.path.exists(MODEL_PATH):
    try:
        model = joblib.load(MODEL_PATH)
        print(f"Model loaded successfully from {MODEL_PATH}")
    except Exception as e:
        model = None
        print(f"Error loading model: {e}")
else:
    model = None
    print(f"Warning: Model file not found at {MODEL_PATH}")


class UsedCarPredictionRequest(BaseModel):
    car_name: str = Field(..., alias="car name", description="Nama/model mobil, misal: Toyota Avanza")
    brand: str = Field(..., description="Merek mobil, misal: Toyota, Honda, Daihatsu")
    location: str = Field(..., description="Lokasi, misal: Jakarta Selatan, Surabaya, Bandung")
    transmission: str = Field(..., description="Transmisi: Automatic / Manual")
    plate_type: str = Field(..., alias="plate type", description="Tipe plat: even plate / odd plate")
    year: int = Field(..., description="Tahun pembuatan mobil, misal: 2018")
    mileage_km: float = Field(..., alias="mileage (km)", description="Jarak tempuh dalam km, misal: 45000")
    rear_camera: int = Field(0, alias="rear camera")
    sun_roof: int = Field(0, alias="sun roof")
    auto_retract_mirror: int = Field(0, alias="auto retract mirror")
    electric_parking_brake: int = Field(0, alias="electric parking brake")
    map_navigator: int = Field(0, alias="map navigator")
    vehicle_stability_control: int = Field(0, alias="vehicle stability control")
    keyless_push_start: int = Field(0, alias="keyless push start")
    sports_mode: int = Field(0, alias="sports mode")
    camera_360_view: int = Field(0, alias="360 camera view")
    power_sliding_door: int = Field(0, alias="power sliding door")
    auto_cruise_control: int = Field(0, alias="auto cruise control")

    class Config:
        populate_by_name = True


@app.get("/")
def read_root():
    return {
        "message": "Used Car Price Prediction API is running",
        "model_loaded": model is not None,
    }


@app.get("/health")
def health_check():
    return {"status": "healthy", "model_loaded": model is not None}


@app.post("/predict")
def predict(request: UsedCarPredictionRequest):
    if model is None:
        raise HTTPException(status_code=500, detail="Model is not loaded on server")

    try:
        data = {
            "car name": request.car_name,
            "brand": request.brand,
            "location": request.location,
            "transmission": request.transmission,
            "plate type": request.plate_type,
            "year": request.year,
            "mileage (km)": request.mileage_km,
            "rear camera": request.rear_camera,
            "sun roof": request.sun_roof,
            "auto retract mirror": request.auto_retract_mirror,
            "electric parking brake": request.electric_parking_brake,
            "map navigator": request.map_navigator,
            "vehicle stability control": request.vehicle_stability_control,
            "keyless push start": request.keyless_push_start,
            "sports mode": request.sports_mode,
            "360 camera view": request.camera_360_view,
            "power sliding door": request.power_sliding_door,
            "auto cruise control": request.auto_cruise_control,
        }

        df = pd.DataFrame([data])
        prediction = model.predict(df)
        pred_value = float(prediction[0])

        return {
            "success": True,
            "predicted_price": pred_value,
            "predicted_price_formatted": f"Rp {pred_value:,.0f}".replace(",", "."),
            "input": data,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")
