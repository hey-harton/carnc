import React, { useState } from 'react';
import axios from 'axios';
import {
  Tile,
  Button,
  TextInput,
  Select,
  SelectItem,
  Checkbox,
  InlineLoading,
  InlineNotification,
  Tag,
} from 'carbon-components-react';

/** Response payload returned by the `POST /predict` endpoint of `models-app`. */
interface PredictionResult {
  /** Predicted market price in IDR. */
  predicted_price: number;
  /** Predicted price formatted for display (e.g. `Rp 150.000.000`). */
  predicted_price_formatted: string;
  /** Echo of the feature payload submitted to the model. */
  input: Record<string, any>;
}

/** Base URL of the prediction API. Override with `VITE_API_URL`. */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Car specification form that submits vehicle features to the prediction API
 * and renders the estimated market price.
 */
const PredictionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    car_name: 'Toyota Avanza 1.3 G',
    brand: 'Toyota',
    location: 'Jakarta Selatan',
    transmission: 'Automatic',
    plate_type: 'even plate',
    year: 2019,
    mileage_km: 45000,
    rear_camera: 1,
    sun_roof: 0,
    auto_retract_mirror: 1,
    electric_parking_brake: 0,
    map_navigator: 1,
    vehicle_stability_control: 1,
    keyless_push_start: 1,
    sports_mode: 0,
    camera_360_view: 0,
    power_sliding_door: 0,
    auto_cruise_control: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);

  /** Updates a text, select, or numeric field in the form state. */
  const handleTextChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /** Stores a checkbox value as `1`/`0`, the binary encoding expected by the model. */
  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: checked ? 1 : 0 }));
  };

  /**
   * Populates the form with a predefined vehicle specification.
   *
   * @param presetType - Identifier of the preset to load.
   */
  const loadPreset = (presetType: 'avanza' | 'crv' | 'brio') => {
    if (presetType === 'avanza') {
      setFormData({
        car_name: 'Toyota Avanza 1.3 G',
        brand: 'Toyota',
        location: 'Jakarta Selatan',
        transmission: 'Automatic',
        plate_type: 'even plate',
        year: 2019,
        mileage_km: 45000,
        rear_camera: 1,
        sun_roof: 0,
        auto_retract_mirror: 1,
        electric_parking_brake: 0,
        map_navigator: 1,
        vehicle_stability_control: 1,
        keyless_push_start: 1,
        sports_mode: 0,
        camera_360_view: 0,
        power_sliding_door: 0,
        auto_cruise_control: 0,
      });
    } else if (presetType === 'crv') {
      setFormData({
        car_name: 'Honda CR-V 1.5 Prestige Turbo',
        brand: 'Honda',
        location: 'Jakarta Pusat',
        transmission: 'Automatic',
        plate_type: 'odd plate',
        year: 2021,
        mileage_km: 25000,
        rear_camera: 1,
        sun_roof: 1,
        auto_retract_mirror: 1,
        electric_parking_brake: 1,
        map_navigator: 1,
        vehicle_stability_control: 1,
        keyless_push_start: 1,
        sports_mode: 1,
        camera_360_view: 1,
        power_sliding_door: 0,
        auto_cruise_control: 1,
      });
    } else {
      setFormData({
        car_name: 'Honda Brio 1.2 E Satya',
        brand: 'Honda',
        location: 'Bandung',
        transmission: 'Manual',
        plate_type: 'even plate',
        year: 2018,
        mileage_km: 55000,
        rear_camera: 0,
        sun_roof: 0,
        auto_retract_mirror: 0,
        electric_parking_brake: 0,
        map_navigator: 0,
        vehicle_stability_control: 0,
        keyless_push_start: 0,
        sports_mode: 0,
        camera_360_view: 0,
        power_sliding_door: 0,
        auto_cruise_control: 0,
      });
    }
  };

  /**
   * Submits the form to the prediction API and stores the result or error.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Map snake_case form state to the feature names used during model training.
      const payload = {
        'car name': formData.car_name,
        brand: formData.brand,
        location: formData.location,
        transmission: formData.transmission,
        'plate type': formData.plate_type,
        year: Number(formData.year),
        'mileage (km)': Number(formData.mileage_km),
        'rear camera': formData.rear_camera,
        'sun roof': formData.sun_roof,
        'auto retract mirror': formData.auto_retract_mirror,
        'electric parking brake': formData.electric_parking_brake,
        'map navigator': formData.map_navigator,
        'vehicle stability control': formData.vehicle_stability_control,
        'keyless push start': formData.keyless_push_start,
        'sports mode': formData.sports_mode,
        '360 camera view': formData.camera_360_view,
        'power sliding door': formData.power_sliding_door,
        'auto cruise control': formData.auto_cruise_control,
      };

      const response = await axios.post(`${API_BASE_URL}/predict`, payload);
      setResult(response.data);
    } catch (err: any) {
      const message =
        err.response?.data?.detail ||
        err.message ||
        'Gagal terhubung ke server backend. Pastikan container models-app berjalan di port 8000.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="predict" className="predict-section" style={{ padding: '3rem 2rem 4rem', backgroundColor: '#f8faf9' }}>
      <Tile className="predict-tile" style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginTop: 0, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.5px' }}>
              Form Spesifikasi Mobil
            </h2>
            <p style={{ color: '#64748b', marginTop: '0.25rem', fontSize: '0.95rem' }}>
              Lengkapi data spesifikasi mobil di bawah ini untuk menghitung estimasi harga pasar secara real-time.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 500 }}>Preset Cepat:</span>
            <Button size="small" kind="ghost" onClick={() => loadPreset('avanza')}>
              Avanza 2019
            </Button>
            <Button size="small" kind="ghost" onClick={() => loadPreset('crv')}>
              CR-V 2021
            </Button>
            <Button size="small" kind="ghost" onClick={() => loadPreset('brio')}>
              Brio 2018
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Primary vehicle information */}
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', borderBottom: '1px solid #e0e0e0', paddingBottom: '0.5rem' }}>
            1. Informasi Utama Kendaraan
          </h3>

          <div
            className="predict-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            <TextInput
              id="car_name"
              labelText="Nama Mobil"
              placeholder="Contoh: Toyota Avanza 1.3 G"
              value={formData.car_name}
              onChange={(e: any) => handleTextChange('car_name', e.target.value)}
              required
            />

            <Select
              id="brand"
              labelText="Merek Mobil"
              value={formData.brand}
              onChange={(e: any) => handleTextChange('brand', e.target.value)}
            >
              <SelectItem value="Toyota" text="Toyota" />
              <SelectItem value="Honda" text="Honda" />
              <SelectItem value="Daihatsu" text="Daihatsu" />
              <SelectItem value="Mitsubishi" text="Mitsubishi" />
              <SelectItem value="Suzuki" text="Suzuki" />
              <SelectItem value="Nissan" text="Nissan" />
              <SelectItem value="Mazda" text="Mazda" />
              <SelectItem value="Wuling" text="Wuling" />
              <SelectItem value="Hyundai" text="Hyundai" />
            </Select>

            <TextInput
              id="year"
              type="number"
              labelText="Tahun Pembuatan"
              value={formData.year}
              onChange={(e: any) => handleTextChange('year', parseInt(e.target.value) || 0)}
              required
            />

            <TextInput
              id="mileage_km"
              type="number"
              labelText="Jarak Tempuh (km)"
              value={formData.mileage_km}
              onChange={(e: any) => handleTextChange('mileage_km', parseFloat(e.target.value) || 0)}
              required
            />

            <Select
              id="transmission"
              labelText="Tipe Transmisi"
              value={formData.transmission}
              onChange={(e: any) => handleTextChange('transmission', e.target.value)}
            >
              <SelectItem value="Automatic" text="Otomatis (Automatic)" />
              <SelectItem value="Manual" text="Manual" />
            </Select>

            <Select
              id="plate_type"
              labelText="Tipe Plat Nomor"
              value={formData.plate_type}
              onChange={(e: any) => handleTextChange('plate_type', e.target.value)}
            >
              <SelectItem value="even plate" text="Plat Genap" />
              <SelectItem value="odd plate" text="Plat Ganjil" />
            </Select>

            <Select
              id="location"
              labelText="Lokasi Wilayah / Kota"
              value={formData.location}
              onChange={(e: any) => handleTextChange('location', e.target.value)}
            >
              <SelectItem value="Jakarta Selatan" text="Jakarta Selatan" />
              <SelectItem value="Jakarta Barat" text="Jakarta Barat" />
              <SelectItem value="Jakarta Pusat" text="Jakarta Pusat" />
              <SelectItem value="Jakarta Timur" text="Jakarta Timur" />
              <SelectItem value="Jakarta Utara" text="Jakarta Utara" />
              <SelectItem value="Tangerang" text="Tangerang" />
              <SelectItem value="Bekasi" text="Bekasi" />
              <SelectItem value="Depok" text="Depok" />
              <SelectItem value="Bandung" text="Bandung" />
              <SelectItem value="Surabaya" text="Surabaya" />
            </Select>
          </div>

          {/* Section 2: Features and accessories */}
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', borderBottom: '1px solid #e0e0e0', paddingBottom: '0.5rem' }}>
            2. Fitur &amp; Kelengkapan Kendaraan
          </h3>

          <div
            className="checkbox-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '2.5rem',
            }}
          >
            <Checkbox
              id="rear_camera"
              labelText="Kamera Belakang"
              checked={formData.rear_camera === 1}
              onChange={(_e: any, data: any) => handleCheckboxChange('rear_camera', !!data?.checked)}
            />
            <Checkbox
              id="camera_360_view"
              labelText="Kamera 360 Derajat"
              checked={formData.camera_360_view === 1}
              onChange={(_e: any, data: any) => handleCheckboxChange('camera_360_view', !!data?.checked)}
            />
            <Checkbox
              id="sun_roof"
              labelText="Sunroof"
              checked={formData.sun_roof === 1}
              onChange={(_e: any, data: any) => handleCheckboxChange('sun_roof', !!data?.checked)}
            />
            <Checkbox
              id="auto_retract_mirror"
              labelText="Spion Lipat Otomatis"
              checked={formData.auto_retract_mirror === 1}
              onChange={(_e: any, data: any) => handleCheckboxChange('auto_retract_mirror', !!data?.checked)}
            />
            <Checkbox
              id="electric_parking_brake"
              labelText="Rem Parkir Elektrik"
              checked={formData.electric_parking_brake === 1}
              onChange={(_e: any, data: any) => handleCheckboxChange('electric_parking_brake', !!data?.checked)}
            />
            <Checkbox
              id="map_navigator"
              labelText="Navigasi Peta (GPS)"
              checked={formData.map_navigator === 1}
              onChange={(_e: any, data: any) => handleCheckboxChange('map_navigator', !!data?.checked)}
            />
            <Checkbox
              id="vehicle_stability_control"
              labelText="Kontrol Stabilitas (VSC)"
              checked={formData.vehicle_stability_control === 1}
              onChange={(_e: any, data: any) => handleCheckboxChange('vehicle_stability_control', !!data?.checked)}
            />
            <Checkbox
              id="keyless_push_start"
              labelText="Tombol Start / Keyless"
              checked={formData.keyless_push_start === 1}
              onChange={(_e: any, data: any) => handleCheckboxChange('keyless_push_start', !!data?.checked)}
            />
            <Checkbox
              id="sports_mode"
              labelText="Mode Sport"
              checked={formData.sports_mode === 1}
              onChange={(_e: any, data: any) => handleCheckboxChange('sports_mode', !!data?.checked)}
            />
            <Checkbox
              id="power_sliding_door"
              labelText="Pintu Geser Elektrik"
              checked={formData.power_sliding_door === 1}
              onChange={(_e: any, data: any) => handleCheckboxChange('power_sliding_door', !!data?.checked)}
            />
            <Checkbox
              id="auto_cruise_control"
              labelText="Cruise Control Otomatis"
              checked={formData.auto_cruise_control === 1}
              onChange={(_e: any, data: any) => handleCheckboxChange('auto_cruise_control', !!data?.checked)}
            />
          </div>

          {/* Form actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Button
              type="submit"
              disabled={loading}
              className="predict-submit-btn"
            >
              {loading ? 'Menghitung Prediksi...' : 'Prediksi Sekarang'}
            </Button>
            {loading && <InlineLoading status="active" description="Menghubungi server..." />}
          </div>
        </form>

        {/* Error notification */}
        {error && (
          <div style={{ marginTop: '2rem' }}>
            <InlineNotification
              kind="error"
              title="Terjadi Kesalahan"
              subtitle={error}
              lowContrast
            />
          </div>
        )}

        {/* Prediction result */}
        {result && (
          <div style={{ marginTop: '2.5rem' }}>
            <Tile
              className="result-card"
              style={{
                background: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #059669 100%)',
                color: '#ffffff',
                padding: '3rem',
                borderRadius: '16px',
                border: 'none',
                boxShadow: '0 12px 30px -5px rgba(4, 120, 87, 0.35)',
              }}
            >
              <Tag type="green" style={{ backgroundColor: '#a7f3d0', color: '#064e3b', fontWeight: 700, marginBottom: '1.25rem' }}>
                Hasil Prediksi Model
              </Tag>
              <h3 style={{ fontSize: '1.25rem', color: '#d1fae5', margin: 0, fontWeight: 500 }}>
                Estimasi Nilai Pasar Wajar:
              </h3>
              <div
                className="result-price"
                style={{
                  fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                  fontWeight: 800,
                  marginTop: '0.5rem',
                  marginBottom: '1rem',
                  color: '#ffffff',
                  letterSpacing: '-0.5px',
                  fontFamily: "'Outfit', sans-serif",
                  lineHeight: 1.1,
                  wordBreak: 'break-word',
                }}
              >
                {result.predicted_price_formatted}
              </div>
              <p style={{ color: '#ecfdf5', fontSize: '0.95rem', margin: 0, opacity: 0.9, lineHeight: 1.6 }}>
                Berdasarkan mobil {result.input['brand']} {result.input['car name']} tahun {result.input['year']} dengan jarak tempuh {result.input['mileage (km)'].toLocaleString('id-ID')} km di wilayah {result.input['location']}.
              </p>
            </Tile>
          </div>
        )}
      </Tile>
    </section>
  );
};

export default PredictionForm;
