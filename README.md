# CarNC - Platform Prediksi Harga Mobil Bekas

Repositori Monorepo Multi-Container untuk aplikasi prediksi estimasi nilai pasar wajar mobil bekas di Indonesia, didukung oleh model **Machine Learning Random Forest** dan antarmuka web interaktif.

---

## Deskripsi Proyek

**CarNC** (*Car Price Prediction Platform*) adalah solusi terintegrasi yang menggabungkan rekayasa data, kecerdasan buatan (*Machine Learning*), dan arsitektur web modern dalam satu monorepo yang dikelola secara kontainer menggunakan Docker Compose.

Platform ini bertujuan memberikan transparansi harga pasar mobil bekas bagi pembeli maupun penjual dengan menganalisis 18 parameter kendaraan secara komprehensif (mulai dari merek, model, tahun, kilometer tempuh, transmisi, tipe plat nomor, hingga fitur-fitur keamanan dan kenyamanan elektrik).

### Arsitektur Layanan (Multi-Container Architecture)

Aplikasi ini terbagi menjadi 2 (dua) layanan terisolasi:

1. **`landing-app` (Frontend Service - Port 3000)**
   - Dibangun menggunakan **React 18**, **Vite 8**, **TypeScript 6**.
   - Desain mengusung tema *Clean Forest Minimalist* dengan dominasi warna putih bersih, teks kontras gelap, dan aksen hijau hutan (*Forest Green* `#047857` & *Emerald* `#10b981`).
   - Responsif penuh untuk layar desktop (14"–27") maupun layar handphone/smartphone (rentang `320px` – `480px`).
   - Menerapkan arsitektur visual-first pada perangkat mobile dan bebas akselerasi perangkat keras berlebih (*zero hardware acceleration lag*) untuk performa yang sangat ringan dan mulus.

2. **`models-app` (Backend Service - Port 8000)**
   - Layanan RESTful API berkecepatan tinggi menggunakan **Python 3.11**, **FastAPI**, dan server **Uvicorn**.
   - Memuat (*loading*) pipeline model scikit-learn (`random_forest_used_car.pkl`) saat *startup* untuk inferensi harga secara instan (*real-time*).
   - Dilengkapi validasi skema data ketat via **Pydantic v2** dan dukungan CORS penuh untuk komunikasi dengan frontend.

---

## Struktur Folder dan File

Berikut adalah struktur direktori lengkap dari monorepo proyek ini:

```text
docker-learning/
│
├── .gitignore                          # Daftar file dan direktori yang diabaikan Git
├── docker-compose.yml                  # Konfigurasi orkestrasi container Docker (Frontend & Backend)
├── README.md                           # Dokumentasi utama proyek CarNC
│
├── landing-app/                        # [Frontend] React + Vite + TypeScript + IBM Carbon
│   ├── .dockerignore                   # File pengecualian saat build Docker frontend
│   ├── .npmrc                          # Konfigurasi npm (legacy-peer-deps=true)
│   ├── Dockerfile                      # Dockerfile image Node 24 Alpine untuk frontend
│   ├── index.html                      # Entry point HTML aplikasi
│   ├── package.json                    # Metadata proyek frontend dan dependensi npm
│   ├── package-lock.json               # Lockfile versi paket npm
│   ├── tsconfig.json                   # Konfigurasi TypeScript compiler (moduleResolution: bundler)
│   ├── vite.config.mts                 # Konfigurasi Vite dev server & hot-reload polling
│   │
│   ├── public/                         # Aset publik statis
│   │   ├── fonts/                      # Font lokal self-hosted (tanpa CDN eksternal)
│   │   │   ├── Outfit-Variable.ttf     # Font utama CarNC (Headings & Typography)
│   │   │   └── Manrope-Variable.ttf    # Font pendukung CarNC
│   │   └── images/                     # Aset gambar & vektor
│   │       ├── carnc-logo.svg          # Logo resmi CarNC (vektor SVG)
│   │       └── hero-bg.svg             # Background hero SVG (foto mobil & showroom)
│   │
│   └── src/                            # Kode sumber aplikasi frontend
│       ├── declarations.d.ts           # Deklarasi tipe modul pihak ketiga & Vite client
│       ├── index.tsx                   # Entry point React (mount root & styling Carbon)
│       │
│       ├── app/                        # Shell layout aplikasi
│       │   ├── layout.tsx              # Wrapper layout umum (Header, Main, Footer)
│       │   └── page.tsx                # Halaman utama aplikasi
│       │
│       └── components/                 # Komponen-komponen modular UI
│           ├── layout/                 # Komponen struktur navigasi
│           │   ├── header.tsx          # Navigasi atas (Logo CarNC & tautan GitHub)
│           │   └── footer.tsx          # Footer bawah (Hak cipta dan identitas platform)
│           │
│           ├── section/                # Bagian-bagian konten halaman
│           │   ├── home-pages/         # Halaman Beranda
│           │   │   ├── bodyhome.tsx    # Penyusun komponen Hero dan PredictionForm
│           │   │   └── part/
│           │   │       └── hero.tsx    # Bagian Hero (Visual mobil mobile & call-to-action)
│           │   └── prediction/         # Bagian formulir inferensi ML
│           │       └── PredictionForm.tsx # Formulir 18 fitur mobil, preset, & kartu hasil
│           │
│           └── theme/                  # Konfigurasi styling & tema CarNC
│               ├── index.ts            # Entry point export modul tema
│               ├── theme.ts            # Design tokens JavaScript (warna, bayangan, tipografi)
│               └── theme.css           # Override IBM Carbon, layout responsif & styling tema
│
└── models-app/                         # [Backend] FastAPI + Scikit-Learn Model Inference
    ├── Dockerfile                      # Dockerfile image Python 3.11 Slim untuk backend
    ├── requirements.txt                # Dependensi Python (FastAPI, uvicorn, scikit-learn, pandas)
    ├── main.py                         # Skrip utama FastAPI, definisi endpoint & Pydantic schema
    └── random_forest_used_car.pkl      # File model pipeline Random Forest terlatih (18 fitur)
```

---

## Fitur-Fitur Utama

1. **Prediksi Harga Akurat Berbasis 18 Parameter:**
   - **Informasi Utama Kendaraan:** Nama/Model Mobil, Merek, Lokasi Kota, Jenis Transmisi (*Automatic* / *Manual*), Tipe Plat (*Ganjil* / *Genap*), Tahun Pembuatan, dan Jarak Tempuh (*Kilometer*).
   - **Fitur Keselamatan & Kenyamanan:** Kamera Mundur (*Rear Camera*), Sunroof, Spion Lipat Otomatis (*Auto Retract Mirror*), Rem Parkir Elektrik (*EPB*), GPS Navigator, Kontrol Stabilitas (*VSC*), *Keyless Push Start*, Mode Sport, Kamera 360°, Pintu Geser Elektrik (*Power Sliding Door*), dan *Adaptive Cruise Control*.

2. **Preset Spesifikasi Cepat (Quick Load):**
   - Menyediakan 3 tombol preset instan untuk mobil populer di Indonesia: **Toyota Avanza 2019**, **Honda CR-V 2020**, dan **Honda Brio 2021** untuk pengujian langsung tanpa perlu mengisi semua form secara manual.

3. **Kartu Hasil Prediksi Informatif:**
   - Menampilkan estimasi nilai wajar pasar mobil dalam format mata uang Rupiah (`Rp xxx.xxx.xxx`) yang jelas dengan rincian ringkasan parameter input.

4. **Tampilan Responsif & Ringan:**
   - Mendukung resolusi dari layar besar 14"–27" hingga smartphone ringkas (`320px` – `480px`).
   - Tidak ada lag akselerasi hardware (*zero heavy blur filter / 3D transform*).

---

## Spesifikasi Teknologi (Tech Stack)

| Lapisan | Komponen / Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite 8, TypeScript 6 | Lingkungan frontend modern yang cepat dan *type-safe* |
| **Design System** | IBM Carbon Design System v10 | Komponen UI kelas enterprise (`carbon-components-react`) |
| **Fonts** | Outfit & Manrope (Variable Fonts) | Font statis lokal tanpa ketergantungan CDN eksternal |
| **Backend API** | FastAPI, Uvicorn, Pydantic v2 | Server asynchronous berkinerja tinggi dengan validasi schema |
| **Machine Learning**| Scikit-Learn 1.6.1, Joblib, Pandas 2.2+ | Model Random Forest Regressor terlatih untuk data otomotif |
| **DevOps** | Docker, Docker Compose | Kontainerisasi multi-container terpadu |

---

## Panduan Menjalankan Aplikasi

### Opsi 1: Menjalankan dengan Docker Compose (Direkomendasikan)

Pastikan **Docker Desktop** atau Docker Engine sudah terpasang dan berjalan di komputer Anda.

1. Buka terminal di direktori utama repositori (`docker-learning`):
   ```bash
   cd D:\my-project\project_matakuliah\docker-learning
   ```

2. Jalankan seluruh container secara otomatis:
   ```bash
   docker compose up --build
   ```

3. Buka peramban (*browser*) Anda untuk mengakses layanan:
   - **Frontend UI (CarNC):** [http://localhost:3000](http://localhost:3000)
   - **Backend API (FastAPI):** [http://localhost:8000](http://localhost:8000)
   - **Dokumentasi Interaktif API (Swagger UI):** [http://localhost:8000/docs](http://localhost:8000/docs)

4. Untuk menghentikan layanan container:
   ```bash
   docker compose down
   ```

---

### Opsi 2: Menjalankan Secara Manual (Tanpa Docker)

#### 1. Menjalankan Backend (`models-app`)
```bash
cd models-app

# Buat dan aktifkan virtual environment (opsional namun disarankan)
python -m venv venv
# Windows:
.\venv\Scripts\activate

# Install dependensi
pip install -r requirements.txt

# Jalankan server FastAPI
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

#### 2. Menjalankan Frontend (`landing-app`)
```bash
cd landing-app

# Install dependensi npm
npm install

# Jalankan server pengembang Vite
npm start
```
Aplikasi frontend akan aktif di [http://localhost:3000](http://localhost:3000).

---

## 📡 Referensi Endpoint API

### 1. `GET /health`
Mengecek status kesehatan server dan memastikan model machine learning berhasil dimuat.

* **Response (200 OK):**
  ```json
  {
    "status": "healthy",
    "model_loaded": true
  }
  ```

### 2. `POST /predict`
Mengirim data parameter mobil untuk mendapatkan estimasi harga pasar wajar.

* **Contoh Request Payload:**
  ```json
  {
    "car name": "Toyota Avanza 1.3 G",
    "brand": "Toyota",
    "location": "Jakarta Selatan",
    "transmission": "Automatic",
    "plate type": "even plate",
    "year": 2019,
    "mileage (km)": 45000,
    "rear camera": 1,
    "sun roof": 0,
    "auto retract mirror": 1,
    "electric parking brake": 0,
    "map navigator": 1,
    "vehicle stability control": 1,
    "keyless push start": 1,
    "sports mode": 0,
    "camera 360 view": 0,
    "power sliding door": 0,
    "auto cruise control": 0
  }
  ```

* **Contoh Response (200 OK):**
  ```json
  {
    "predicted_price": 232118594.12,
    "predicted_price_formatted": "Rp 232.118.594",
    "input": { ... }
  }
  ```

---

## 📄 Hak Cipta & Repositori

- **Repositori GitHub:** [https://github.com/hey-harton/carnc](https://github.com/hey-harton/carnc)
- **Lisensi:** © 2026 CarNC • Platform Prediksi Harga Mobil Bekas. Hak Cipta Dilindungi.
