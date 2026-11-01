# Dapoyumya Menu Recommendation Assistant

## 1. Project Information

| Informasi          | Keterangan                                                 |
| ------------------ | ---------------------------------------------------------- |
| Nama Proyek        | Dapoyumya Menu Recommendation Assistant                    |
| Use Case           | Rekomendasi kombinasi menu berdasarkan kebutuhan pelanggan |
| Jenis Aplikasi     | Generative AI Application                                  |
| Bahasa Pemrograman | Python                                                     |
| Framework API      | FastAPI                                                    |
| LLM Provider       | Groq                                                       |
| LLM Model          | `openai/gpt-oss-120b`                                      |
| Dataset            | Katalog produk Dapoyumya                                   |
| Jumlah Dataset     | 31 produk                                                  |
| Format Dataset     | JSON                                                       |

### Deskripsi Singkat

Dapoyumya Menu Recommendation Assistant merupakan aplikasi berbasis Generative AI yang saya kembangkan untuk membantu pelanggan UMKM Dapoyumya dalam menentukan kombinasi menu makanan sesuai kebutuhan mereka. Dapoyumya merupakan UMKM di bidang kuliner yang menawarkan berbagai produk makanan, terutama dimsum dan camilan, dengan pilihan varian rasa, kategori, serta ukuran paket yang beragam.

Dalam proses pemesanan, pelanggan dapat memiliki kebutuhan yang berbeda-beda. Ada pelanggan yang ingin membeli makanan dengan budget tertentu, mencari kombinasi rasa, atau memilih menu untuk dinikmati bersama beberapa orang. Oleh karena itu, saya membuat aplikasi ini agar pelanggan dapat menyampaikan kebutuhannya melalui beberapa informasi, yaitu budget, jumlah orang, preferensi rasa, dan jenis menu yang diinginkan.

Aplikasi menggunakan Large Language Model (LLM) melalui Groq API untuk memahami kebutuhan pelanggan dan menyusun rekomendasi kombinasi menu berdasarkan katalog produk Dapoyumya. Dengan bantuan LLM, sistem dapat memberikan rekomendasi dalam bentuk yang lebih fleksibel dibandingkan pencarian berdasarkan nama produk saja.

Namun, saya tidak sepenuhnya menyerahkan informasi produk dan perhitungan harga kepada AI. Saya menggunakan Python untuk memeriksa kembali nama produk, ukuran paket, dan jumlah pembelian berdasarkan katalog asli. Setelah itu, Python mengambil harga dari katalog dan menghitung subtotal serta total harga setiap kombinasi menu.

Dengan demikian, AI bertugas memahami kebutuhan pelanggan dan menyusun rekomendasi, sedangkan Python bertugas memastikan bahwa produk dan perhitungan harga yang ditampilkan sesuai dengan data yang tersedia.

### Tujuan Proyek

Melalui proyek ini, saya ingin:

1. Memahami penerapan Generative AI dan Large Language Model dalam sebuah aplikasi.
2. Mengintegrasikan LLM dengan aplikasi Python menggunakan Groq API.
3. Membangun REST API menggunakan FastAPI.
4. Menerapkan Pydantic untuk memvalidasi input pengguna.
5. Mempelajari penggunaan system prompt dan prompt engineering.
6. Menghasilkan respons terstruktur dalam format JSON.
7. Menggabungkan kemampuan LLM dengan validasi data dan perhitungan menggunakan Python.
8. Membandingkan hasil dari beberapa versi prompt untuk mengetahui pengaruh instruksi terhadap jawaban yang dihasilkan.

---

## 2. Tech Stack

Saya menggunakan beberapa teknologi berikut untuk membangun aplikasi.

| Teknologi             | Fungsi                                                                                         |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| Python                | Bahasa pemrograman utama untuk mengatur proses aplikasi, validasi data, dan perhitungan harga. |
| FastAPI               | Framework untuk membangun REST API yang menerima input dan mengembalikan hasil rekomendasi.    |
| Groq API              | Layanan API yang menghubungkan aplikasi dengan model LLM.                                      |
| `openai/gpt-oss-120b` | Model LLM yang digunakan untuk memahami kebutuhan pelanggan dan menghasilkan rekomendasi.      |
| Pydantic              | Memvalidasi struktur dan nilai input yang diterima oleh API.                                   |
| `python-dotenv`       | Membaca API key dari file `.env` agar informasi rahasia tidak ditulis langsung di dalam kode.  |
| JSON                  | Format penyimpanan katalog produk Dapoyumya.                                                   |
| Swagger UI            | Antarmuka dokumentasi dan pengujian endpoint API.                                              |

### A. Dataset

Dataset yang saya gunakan adalah katalog produk Dapoyumya dalam format JSON. Dataset ini berisi 31 produk yang dikelompokkan ke dalam enam kategori.

Atribut yang terdapat pada setiap data produk meliputi:

| Atribut    | Keterangan                                                                      |
| ---------- | ------------------------------------------------------------------------------- |
| `name`     | Nama produk.                                                                    |
| `text`     | Deskripsi produk, termasuk informasi mengenai karakteristik atau varian produk. |
| `category` | Kategori produk.                                                                |
| `price`    | Daftar harga berdasarkan ukuran paket yang tersedia.                            |

Enam kategori produk yang terdapat dalam dataset adalah:

1. `dimsum_family`
2. `dimsum_premium`
3. `dimsum_reguler`
4. `favorit_goreng`
5. `frozen_dimsum`
6. `frozen_snack`

Katalog ini menjadi sumber informasi utama bagi aplikasi. Saya menggunakan data tersebut agar LLM memiliki informasi mengenai produk yang dapat direkomendasikan, sedangkan Python dapat memeriksa kembali nama produk, ukuran paket, dan harga berdasarkan data yang sama.

Dengan menggunakan katalog sebagai sumber informasi, saya berusaha mengurangi kemungkinan AI memberikan nama produk atau harga yang sebenarnya tidak tersedia.

### B. Alasan Pemilihan Dataset

Saya menggunakan produk Dapoyumya karena variasi produknya memungkinkan saya menguji beberapa kebutuhan pelanggan. Contohnya, pelanggan dapat mencari dimsum dengan rasa pedas, memilih paket untuk keluarga, atau mencari camilan yang dapat disimpan dalam kondisi beku.

Dataset ini juga dapat digunakan untuk menguji kondisi ketika kebutuhan pelanggan tidak tersedia dalam katalog. Misalnya, ketika pelanggan meminta minuman kopi susu, sedangkan data yang saya gunakan hanya berisi produk makanan.

Dengan beberapa kondisi tersebut, saya dapat mengamati apakah aplikasi mampu memberikan rekomendasi yang sesuai dan bagaimana sistem merespons ketika kebutuhan pelanggan tidak dapat dipenuhi.

---

## 3. Application Flow

Aplikasi ini memiliki dua proses utama, yaitu menerima kebutuhan pelanggan dan menghasilkan rekomendasi menu. Proses tersebut melibatkan FastAPI, LLM melalui Groq API, katalog JSON, serta fungsi validasi dan perhitungan yang saya buat menggunakan Python.

### A. Alur Rekomendasi Menu

Berikut tahapan yang terjadi ketika pelanggan mengirimkan permintaan rekomendasi melalui endpoint `POST /recommend`.

1. **User Input**

   Pengguna memasukkan kebutuhan menu berupa budget, jumlah orang, preferensi rasa, dan jenis menu yang diinginkan.

2. **FastAPI menerima request**

   FastAPI menerima data yang dikirim pengguna melalui endpoint `POST /recommend`.

3. **Pydantic Validation**

   Sebelum diproses lebih lanjut, Pydantic memeriksa struktur input dan nilai yang diberikan. Contohnya, budget dan jumlah orang harus berupa angka yang lebih besar dari nol.

4. **Load Dataset**

   Aplikasi membaca katalog produk Dapoyumya dari file `menu_data.json`. Katalog tersebut digunakan sebagai sumber informasi produk dan harga.

5. **Mengirim instruksi ke LLM**

   Aplikasi mengirimkan system prompt, katalog produk, dan kebutuhan pelanggan melalui Groq API. Pada tahap ini, LLM bertugas memahami kebutuhan pengguna dan memilih kombinasi menu yang dianggap sesuai.

6. **Generate Structured Output**

   LLM menghasilkan rekomendasi dalam format JSON sesuai struktur yang telah ditentukan dalam system prompt.

7. **Python Validation**

   Setelah menerima hasil dari LLM, Python memeriksa kembali nama produk, ukuran paket, dan jumlah pembelian. Produk yang tidak ditemukan dalam katalog atau menggunakan ukuran paket yang tidak tersedia tidak dimasukkan ke dalam hasil validasi.

8. **Price Calculation**

   Jika produk dan ukuran paket sesuai dengan katalog, Python mengambil harga asli dan menghitung subtotal setiap menu serta total harga keseluruhan.

9. **Budget Validation**

   Python membandingkan total harga hasil perhitungan dengan budget pelanggan. Berdasarkan hasil tersebut, aplikasi menentukan status kesesuaian budget.

10. **API Response**

    Aplikasi mengembalikan hasil rekomendasi yang telah diproses, termasuk daftar menu, total harga, status budget, alasan rekomendasi, dan pilihan alternatif.

### B. Pembagian Tugas AI dan Python

Dalam proyek ini, saya membagi pekerjaan antara AI dan Python agar masing-masing digunakan sesuai fungsinya.

**AI / LLM**

AI digunakan untuk memahami kebutuhan pelanggan dan menyusun rekomendasi. Tugasnya meliputi:

- Memahami budget, jumlah orang, preferensi rasa, dan jenis menu yang diminta.
- Memilih produk berdasarkan informasi dalam katalog.
- Menyusun kombinasi menu rekomendasi.
- Memberikan alasan pemilihan menu.
- Menyediakan kombinasi alternatif.
- Menghasilkan jawaban dalam format JSON sesuai instruksi.

**Python**

Python digunakan untuk mengolah dan memeriksa hasil yang diberikan AI. Tugasnya meliputi:

- Membaca katalog produk dari file JSON.
- Memeriksa nama produk berdasarkan katalog.
- Memastikan ukuran paket tersedia.
- Memeriksa jumlah pembelian.
- Mengambil harga asli dari katalog.
- Menghitung subtotal dan total harga.
- Menentukan status kesesuaian budget.

Pembagian ini penting karena LLM dapat memahami kebutuhan pengguna dan menyusun jawaban secara fleksibel, tetapi informasi harga tetap perlu diambil dari sumber data yang jelas. Oleh karena itu, saya menggunakan Python untuk melakukan validasi dan perhitungan agar hasil akhir tidak hanya bergantung pada perkiraan model.

### C. Gambaran Alur Sistem

```text
Pengguna
   |
   v
Mengisi kebutuhan menu
(Budget, Jumlah Orang, Preferensi Rasa, Jenis Menu)
   |
   v
POST /recommend
   |
   v
FastAPI + Pydantic Validation
   |
   v
Membaca Katalog Dapoyumya
(menu_data.json)
   |
   v
Mengirim System Prompt + Katalog + Input
ke Groq API
   |
   v
LLM Menghasilkan Rekomendasi JSON
   |
   v
Validasi Produk dan Ukuran Paket
(Python)
   |
   v
Mengambil Harga dan Menghitung Total
(Python)
   |
   v
Memeriksa Kesesuaian Budget
   |
   v
Mengembalikan Hasil Rekomendasi
melalui API Response
```

---

## 4. Project Structure

Struktur folder proyek yang saya gunakan adalah sebagai berikut.

```text
tugas_genAI_LLM/
│
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── prompts.py
│   ├── menu_data.py
│   └── menu_data.json
│
├── .env
├── .gitignore
├── requirements.txt
└── README.md
```

### Keterangan File dan Folder

| File/Folder        | Fungsi                                                                                                                      |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `app/`             | Menyimpan seluruh file kode dan data yang digunakan oleh aplikasi.                                                          |
| `__init__.py`      | Menandai folder `app` sebagai package Python.                                                                               |
| `main.py`          | Mengatur aplikasi FastAPI, menerima request, memanggil Groq API, dan menyediakan endpoint `/recommend` serta `/experiment`. |
| `prompts.py`       | Menyimpan system prompt utama atau Prompt C, serta Prompt A dan Prompt B untuk eksperimen.                                  |
| `menu_data.py`     | Membaca katalog, mencari produk, memvalidasi nama dan ukuran paket, serta menghitung harga.                                 |
| `menu_data.json`   | Menyimpan 31 data produk Dapoyumya beserta deskripsi, kategori, dan harga.                                                  |
| `.env`             | Menyimpan API key Groq yang digunakan aplikasi secara lokal.                                                                |
| `.gitignore`       | Menentukan file dan folder yang tidak perlu diunggah ke GitHub.                                                             |
| `requirements.txt` | Menyimpan daftar library Python yang dibutuhkan untuk menjalankan aplikasi.                                                 |
| `README.md`        | Berisi dokumentasi, cara instalasi, penjelasan aplikasi, dan hasil eksperimen.                                              |

Folder `.venv/` juga digunakan ketika mengembangkan aplikasi di komputer lokal, tetapi tidak perlu dimasukkan ke repository GitHub. Begitu pula dengan file `.env` karena di dalamnya terdapat API key yang bersifat pribadi.

---

## 5. Installation and Setup

Bagian ini menjelaskan langkah-langkah yang saya gunakan untuk menyiapkan dan menjalankan aplikasi.

### A. Clone Repository

Jika ingin menjalankan proyek dari repository GitHub pada komputer lain, repository perlu diunduh terlebih dahulu menggunakan perintah:

```bash
git clone https://github.com/USERNAME/tugas-genai-llm.git
cd tugas-genai-llm
```

Ganti `USERNAME` dengan username GitHub pemilik repository.

**Catatan:** Perintah ini digunakan untuk mengunduh repository dari GitHub. Jika proyek sudah tersedia di komputer lokal, langkah clone tidak perlu dilakukan kembali.

### B. Membuat Virtual Environment

Setelah masuk ke folder proyek, saya membuat virtual environment agar library yang digunakan proyek terpisah dari instalasi Python utama.

```bash
python -m venv .venv
```

Aktifkan virtual environment melalui Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Jika berhasil, nama environment biasanya akan terlihat di bagian awal baris terminal.

### C. Install Dependencies

Setelah virtual environment aktif, install seluruh library yang tercantum di `requirements.txt`.

```bash
pip install -r requirements.txt
```

Library tersebut dibutuhkan agar aplikasi dapat menjalankan FastAPI, menghubungkan diri dengan Groq API, membaca environment variable, dan memvalidasi input.

### D. Configure Environment Variable

Aplikasi membutuhkan API key agar dapat mengakses Groq API.

Buat file bernama `.env` pada direktori utama proyek, sejajar dengan folder `app/` dan file `requirements.txt`.

Isi file `.env` menggunakan format berikut:

```env
GROQ_API_KEY=your_groq_api_key
```

Ganti `your_groq_api_key` dengan API key Groq milik masing-masing pengguna.

**Penting:** Baris di atas hanya contoh untuk dokumentasi. API key asli tetap disimpan di file `.env` lokal dan tidak boleh ditulis di README atau diunggah ke GitHub.

Saya juga memasukkan `.env` ke dalam `.gitignore` agar file tersebut tidak ikut terunggah ke repository.

Contoh isi `.gitignore`:

```gitignore
.env
.venv/
venv/
__pycache__/
*.py[cod]
.vscode/
```

### E. Menjalankan Aplikasi

Setelah dependency dan API key disiapkan, jalankan aplikasi melalui terminal:

```bash
fastapi dev app/main.py
```

Jika aplikasi berhasil berjalan, FastAPI akan menampilkan alamat server lokal.

Buka dokumentasi API melalui browser:

```text
http://127.0.0.1:8000/docs
```

Swagger UI digunakan untuk melihat endpoint yang tersedia, memasukkan request body, menjalankan pengujian, dan melihat respons JSON dari aplikasi.

---

## 6. API Endpoint

Saya menyediakan dua endpoint utama untuk menjalankan aplikasi dan melakukan eksperimen prompt engineering.

| Method | Endpoint      | Fungsi                                                                 |
| ------ | ------------- | ---------------------------------------------------------------------- |
| POST   | `/recommend`  | Menghasilkan rekomendasi menu berdasarkan kebutuhan pelanggan.         |
| POST   | `/experiment` | Menguji dan membandingkan hasil dari Prompt A, Prompt B, dan Prompt C. |

### A. POST `/recommend`

Endpoint ini merupakan fitur utama aplikasi. Pengguna mengirimkan kebutuhan menu, kemudian sistem memprosesnya untuk menghasilkan rekomendasi kombinasi produk Dapoyumya.

**Request Body**

| Parameter           | Tipe Data      | Keterangan                                                                  |
| ------------------- | -------------- | --------------------------------------------------------------------------- |
| `budget`            | Integer        | Budget pelanggan dalam rupiah. Nilainya harus lebih besar dari nol.         |
| `people_count`      | Integer        | Jumlah orang yang akan menikmati menu. Nilainya harus lebih besar dari nol. |
| `taste_preferences` | List of String | Daftar preferensi rasa yang diinginkan pelanggan.                           |
| `menu_type`         | String         | Jenis atau kategori menu yang diinginkan pelanggan.                         |

Contoh request:

```json
{
  "budget": 100000,
  "people_count": 3,
  "taste_preferences": ["gurih", "pedas"],
  "menu_type": "dimsum premium"
}
```

Pada contoh tersebut, pelanggan memiliki budget Rp100.000, kebutuhan untuk tiga orang, menyukai rasa gurih dan pedas, serta menginginkan menu dari kategori dimsum premium.

Setelah request diterima, sistem memproses kebutuhan tersebut melalui LLM dan melakukan validasi kembali menggunakan Python.

### B. POST `/experiment`

Endpoint ini saya buat untuk menguji pengaruh perbedaan instruksi pada prompt terhadap hasil yang diberikan oleh LLM.

Endpoint menerima input kebutuhan pelanggan yang sama, kemudian menjalankan salah satu dari tiga versi prompt.

| Nilai `prompt_version` | Jenis Prompt                                       | Isi Instruksi                                                         |
| ---------------------- | -------------------------------------------------- | --------------------------------------------------------------------- |
| `A`                    | Simple Prompt                                      | Instruksi sederhana mengenai tugas rekomendasi.                       |
| `B`                    | Role + Task + Context                              | Instruksi yang menjelaskan peran, tugas, dan konteks aplikasi.        |
| `C`                    | Role + Task + Context + Constraint + Output Format | Instruksi lengkap dengan batasan dan struktur output yang diharapkan. |

Dengan menggunakan input yang sama, saya dapat membandingkan perbedaan hasil dari masing-masing versi prompt.

Pengujian ini dilakukan melalui endpoint `/experiment`, sehingga hasilnya dapat diamati tanpa harus mengubah system prompt utama yang digunakan oleh endpoint `/recommend`.

---

## 7. Example Request and Response

Pada bagian ini, saya menggunakan hasil pengujian endpoint `/recommend` untuk menunjukkan bagaimana aplikasi menerima kebutuhan pelanggan dan mengembalikan rekomendasi menu.

### A. Example Request

Berikut input yang saya gunakan dalam pengujian:

```json
{
  "budget": 100000,
  "people_count": 3,
  "taste_preferences": ["gurih", "pedas"],
  "menu_type": "dimsum premium"
}
```

Saya menggunakan input tersebut untuk menguji apakah aplikasi dapat memberikan kombinasi menu dengan rasa gurih dan pedas, sesuai kategori yang diminta, serta tetap mempertimbangkan budget pelanggan.

### B. Example Response

Salah satu hasil pengujian menghasilkan rekomendasi utama berupa Original Premium ukuran 8 dan Mentai Spicy ukuran 8.

Berikut data menu dan perhitungan harga yang tercatat pada hasil pengujian:

```json
{
  "recommended_menus": [
    {
      "name": "Original Premium",
      "size": "8",
      "quantity": 1,
      "unit_price": 36000,
      "subtotal": 36000
    },
    {
      "name": "Mentai Spicy",
      "size": "8",
      "quantity": 1,
      "unit_price": 51000,
      "subtotal": 51000
    }
  ],
  "estimated_total": 87000,
  "budget_status": "within budget",
  "recommendation_reason": "GANTI DENGAN ALASAN DARI RESPONS SWAGGER UI",
  "alternatives": [
    {
      "menus": [
        {
          "name": "Original Premium",
          "size": "8",
          "quantity": 1,
          "unit_price": 36000,
          "subtotal": 36000
        },
        {
          "name": "Mentai Spicy",
          "size": "6",
          "quantity": 1,
          "unit_price": 38000,
          "subtotal": 38000
        }
      ],
      "estimated_total": 74000,
      "reason": "GANTI DENGAN ALASAN ALTERNATIF PERTAMA DARI RESPONS SWAGGER UI"
    },
    {
      "menus": [
        {
          "name": "Mix Mentai Spicy Cheese",
          "size": "8",
          "quantity": 1,
          "unit_price": 43000,
          "subtotal": 43000
        },
        {
          "name": "Original Premium",
          "size": "6",
          "quantity": 1,
          "unit_price": 35000,
          "subtotal": 35000
        }
      ],
      "estimated_total": 78000,
      "reason": "GANTI DENGAN ALASAN ALTERNATIF KEDUA DARI RESPONS SWAGGER UI"
    }
  ]
}
```

**Catatan sebelum pengumpulan:** Tiga bagian yang diawali dengan `GANTI DENGAN` bukan output asli dan wajib diganti menggunakan kalimat yang benar-benar muncul pada respons Swagger UI. Jangan membiarkan teks tersebut dalam README yang dikumpulkan.

Berdasarkan angka pada contoh, perhitungan rekomendasi utama adalah:

- Original Premium: Rp36.000 × 1 paket = Rp36.000.
- Mentai Spicy: Rp51.000 × 1 paket = Rp51.000.
- Total: Rp36.000 + Rp51.000 = **Rp87.000**.
- Sisa budget: Rp100.000 − Rp87.000 = **Rp13.000**.

Karena total harga lebih kecil daripada budget pelanggan, Python menetapkan status `within budget`.

Contoh ini memperlihatkan bahwa aplikasi tidak hanya menampilkan rekomendasi dari AI, tetapi juga memeriksa harga dan menghitung total berdasarkan katalog.

---

## 8. Structured Output

Saya menggunakan structured output dalam format JSON agar hasil yang diberikan LLM memiliki susunan data yang lebih teratur dan dapat diproses kembali oleh Python.

Tanpa struktur yang ditentukan, model dapat memberikan jawaban dengan susunan field yang berbeda-beda. Hal tersebut dapat menyulitkan aplikasi ketika ingin mengambil nama produk, ukuran paket, jumlah pembelian, dan alasan rekomendasi.

Oleh karena itu, saya menentukan struktur output yang berisi rekomendasi utama, alasan rekomendasi, dan pilihan alternatif.

### A. Struktur Output dari LLM

Struktur JSON yang diminta melalui system prompt adalah:

```json
{
  "recommended_menus": [
    {
      "name": "Nama produk",
      "size": "Ukuran paket",
      "quantity": 1
    }
  ],
  "recommendation_reason": "Alasan rekomendasi",
  "alternatives": [
    {
      "menus": [
        {
          "name": "Nama produk",
          "size": "Ukuran paket",
          "quantity": 1
        }
      ],
      "reason": "Alasan alternatif"
    }
  ]
}
```

LLM hanya diminta memberikan nama produk, ukuran paket, jumlah pembelian, dan alasan rekomendasi. Harga tidak diminta untuk dihitung oleh LLM karena perhitungan tersebut dilakukan oleh Python.

### B. Field pada Hasil Akhir API

Setelah hasil dari LLM diterima dan diproses oleh Python, respons API memiliki beberapa field tambahan.

| Field                   | Fungsi                                                                                         |
| ----------------------- | ---------------------------------------------------------------------------------------------- |
| `recommended_menus`     | Menyimpan daftar menu rekomendasi utama yang telah divalidasi.                                 |
| `estimated_total`       | Menampilkan total harga rekomendasi utama berdasarkan perhitungan Python.                      |
| `budget_status`         | Menunjukkan apakah rekomendasi sesuai budget atau tidak tersedia menu yang memenuhi kebutuhan. |
| `recommendation_reason` | Menjelaskan alasan pemilihan menu.                                                             |
| `alternatives`          | Menyimpan kombinasi menu alternatif beserta total harga dan alasannya.                         |

Setiap item menu pada hasil akhir memiliki field berikut:

| Field        | Fungsi                                                |
| ------------ | ----------------------------------------------------- |
| `name`       | Nama produk yang ditemukan dalam katalog.             |
| `size`       | Ukuran paket yang tersedia.                           |
| `quantity`   | Jumlah paket yang direkomendasikan.                   |
| `unit_price` | Harga satu paket berdasarkan katalog.                 |
| `subtotal`   | Hasil perkalian harga satu paket dengan jumlah paket. |

### C. Alasan Pemilihan Field

Saya memilih field tersebut karena aplikasi ini bertujuan membantu pelanggan menentukan kombinasi menu, bukan hanya memberikan satu nama produk.

Field `recommended_menus` digunakan untuk menampilkan kombinasi utama yang disarankan oleh AI. Sementara itu, `alternatives` memberikan pilihan lain agar pelanggan dapat mempertimbangkan kombinasi yang berbeda.

Field `recommendation_reason` digunakan untuk menjelaskan alasan pemilihan menu, sehingga pelanggan dapat memahami hubungan antara produk yang direkomendasikan dan preferensi yang dimasukkan.

Selanjutnya, `estimated_total` dan `budget_status` digunakan untuk membantu pelanggan mengetahui perkiraan biaya dan kesesuaiannya dengan budget.

Saya juga memisahkan proses pemberian rekomendasi dengan proses perhitungan harga. LLM memberikan nama produk, ukuran, dan jumlah paket, sedangkan Python mengambil harga dari katalog dan menghitung totalnya. Dengan cara ini, aplikasi tidak hanya mengandalkan angka yang dihasilkan AI.

---

## 9. Prompt Engineering Experiment

Pada proyek ini, saya melakukan eksperimen prompt engineering untuk mengetahui bagaimana perbedaan instruksi dapat memengaruhi hasil rekomendasi yang diberikan oleh LLM.

Saya menguji tiga versi prompt dengan tingkat instruksi yang berbeda, yaitu:

1. Prompt A — Simple Prompt.
2. Prompt B — Role + Task + Context.
3. Prompt C — Role + Task + Context + Constraint + Output Format.

Ketiga versi diuji menggunakan input pelanggan yang sama agar hasilnya dapat dibandingkan.

### A. Input Pengujian

```json
{
  "budget": 100000,
  "people_count": 3,
  "taste_preferences": ["gurih", "pedas"],
  "menu_type": "dimsum premium"
}
```

Saya menggunakan input tersebut karena memuat beberapa kebutuhan sekaligus. Dengan demikian, saya dapat melihat apakah model memperhatikan budget, jumlah orang, preferensi rasa, dan jenis menu yang diminta.

### B. Prompt A — Simple Prompt

**Prompt yang Digunakan**

```text
Berikan rekomendasi kombinasi menu Dapoyumya berdasarkan
budget, jumlah orang, preferensi rasa, dan jenis menu pelanggan.
```

Prompt A merupakan instruksi paling sederhana yang saya gunakan. Saya hanya menjelaskan tugas utama model tanpa memberikan penjelasan lebih lanjut mengenai peran, sumber data, batasan, atau struktur jawaban yang harus dihasilkan.

**Actual Output A**

```json
{
  "budget": 100000,
  "total_cost": 98000,
  "remaining_budget": 2000,
  "total_pieces": 16,
  "recommendations": [
    {
      "name": "Original Premium",
      "pack_size": 4,
      "quantity": 1,
      "price": 18000
    },
    {
      "name": "Mentai Spicy",
      "pack_size": 4,
      "quantity": 1,
      "price": 28000
    },
    {
      "name": "Mentai Original",
      "pack_size": 4,
      "quantity": 1,
      "price": 24000
    },
    {
      "name": "Mix Mentai Spicy Cheese",
      "pack_size": 4,
      "quantity": 1,
      "price": 28000
    }
  ],
  "notes": "Menu premium mencakup rasa gurih (Original Premium) dan pedas (Mentai Spicy). Total 16 buah cukup untuk 3 orang dengan sisa anggaran Rp2.000."
}
```

**Observation**

Pada Prompt A, model dapat memberikan beberapa pilihan menu berdasarkan kebutuhan pelanggan. Model juga memberikan informasi budget, total biaya, sisa anggaran, dan jumlah produk.

Namun, struktur JSON yang dihasilkan belum sesuai dengan struktur yang saya rencanakan untuk aplikasi. Contohnya, model menggunakan field `recommendations`, `total_cost`, dan `notes`, sedangkan aplikasi saya menggunakan `recommended_menus`, `estimated_total`, dan `recommendation_reason`.

Selain itu, model menyatakan bahwa 16 buah dimsum cukup untuk tiga orang. Padahal, katalog produk tidak menyediakan informasi yang dapat memastikan kecukupan porsi tersebut.

Dari hasil ini, saya memahami bahwa instruksi yang terlalu sederhana memberikan kebebasan lebih besar kepada model dalam menentukan bentuk dan isi jawaban. Akibatnya, respons belum tentu sesuai dengan struktur yang dibutuhkan aplikasi.

### C. Prompt B — Role + Task + Context

**Prompt yang Digunakan**

```text
# ROLE
Kamu adalah asisten rekomendasi menu Dapoyumya.

# TASK
Berikan rekomendasi kombinasi menu berdasarkan budget,
jumlah orang, preferensi rasa, dan jenis menu pelanggan.

# CONTEXT
Kamu akan menerima katalog produk Dapoyumya yang berisi
nama produk, deskripsi, kategori, dan pilihan harga.
Gunakan katalog tersebut untuk membantu memberikan rekomendasi.
```

Pada Prompt B, saya mulai menambahkan tiga komponen instruksi.

- **Role:** Menentukan peran model sebagai asisten rekomendasi menu Dapoyumya.
- **Task:** Menjelaskan pekerjaan yang harus dilakukan model.
- **Context:** Memberikan informasi mengenai katalog produk yang menjadi sumber rekomendasi.

Dengan penambahan tersebut, saya ingin melihat apakah model dapat memberikan jawaban yang lebih terarah dibandingkan Prompt A.

**Actual Output B**

```json
{
  "recommended_items": [
    {
      "name": "Original Premium",
      "pack_size": 4,
      "price": 18000,
      "description": "Dimsum original premium dengan cita rasa gurih."
    },
    {
      "name": "Mentai Spicy",
      "pack_size": 4,
      "price": 28000,
      "description": "Dimsum premium dengan saus mentai bercita rasa pedas."
    },
    {
      "name": "Mix Mentai Spicy Cheese",
      "pack_size": 4,
      "price": 28000,
      "description": "Dimsum premium dengan kombinasi varian mentai, rasa pedas, dan keju."
    },
    {
      "name": "Original Premium",
      "pack_size": 4,
      "price": 18000,
      "description": "Dimsum original premium dengan cita rasa gurih."
    }
  ],
  "total_price": 92000,
  "total_pieces": 16,
  "budget": 100000,
  "jumlah_orang": 3,
  "catatan": "Total 16 buah dimsum cukup untuk 3 orang (≈5-6 buah per orang). Kombinasi ini mencakup rasa gurih (Original Premium) dan pedas (Mentai Spicy, Mix Mentai Spicy Cheese) serta tetap berada di bawah batas budget Rp100.000."
}
```

**Observation**

Dibandingkan Prompt A, Prompt B menghasilkan deskripsi produk yang lebih terperinci. Model menjelaskan karakteristik beberapa produk, misalnya rasa gurih pada Original Premium serta rasa pedas pada Mentai Spicy.

Namun, struktur output masih belum sesuai dengan format yang dibutuhkan aplikasi. Model menggunakan `recommended_items`, `total_price`, dan `catatan`, bukan field yang telah saya tentukan.

Saya juga menemukan bahwa Original Premium muncul dua kali dalam daftar rekomendasi. Selain itu, model masih memberikan klaim bahwa jumlah dimsum cukup untuk tiga orang, padahal informasi tersebut tidak dapat dipastikan dari katalog.

Hasil ini menunjukkan bahwa penambahan role, task, dan context membantu memberikan arah kepada model. Akan tetapi, ketiga komponen tersebut belum cukup untuk membatasi seluruh isi dan struktur jawaban.

### D. Prompt C — Role + Task + Context + Constraint + Output Format

**Prompt yang Digunakan**

Prompt C merupakan system prompt utama yang saya simpan dalam file `app/prompts.py`.

Berikut instruksi yang digunakan:

```text
# ROLE
Kamu adalah Dapoyumya Menu Recommendation Assistant,
asisten AI yang membantu pelanggan memilih kombinasi menu Dapoyumya.

# TASK
Berikan rekomendasi menu berdasarkan:
1. Budget pelanggan.
2. Jumlah orang.
3. Preferensi rasa.
4. Jenis menu yang diinginkan.

Pilih kombinasi menu yang paling sesuai dengan kebutuhan pelanggan.

# CONTEXT
Kamu akan menerima katalog produk Dapoyumya dalam format JSON.
Setiap produk memiliki nama, deskripsi, kategori, dan pilihan harga
berdasarkan jumlah isi dalam satu paket.

Gunakan katalog tersebut sebagai satu-satunya sumber informasi produk.

# CONSTRAINT
1. Jangan membuat nama produk yang tidak ada di katalog.
2. Jangan mengubah atau mengarang harga produk.
3. Gunakan hanya pilihan paket yang tersedia dalam katalog.
4. Usahakan rekomendasi utama sesuai dengan budget pelanggan.
5. Jangan menyatakan atau menyiratkan bahwa jumlah makanan
   pasti cukup untuk jumlah orang tertentu.
   Jumlah orang hanya digunakan sebagai pertimbangan rekomendasi,
   bukan sebagai dasar klaim kecukupan porsi.
6. Jika preferensi pelanggan tidak dapat dipenuhi, jelaskan alasannya.
7. Jangan mengarang informasi stok atau ketersediaan produk.
8. Berikan alasan yang relevan berdasarkan deskripsi produk.
9. Jangan menghitung atau menuliskan harga dan total biaya.
   Perhitungan harga akan dilakukan oleh sistem Python.
10. Setiap alternatif harus berisi daftar menu yang lengkap,
    bukan hanya satu menu dengan penjelasan yang menyebutkan menu lain.
11. Jika tidak ada menu yang sesuai dengan budget:
    - Jangan memberikan rekomendasi utama yang melebihi budget.
    - Kembalikan recommended_menus sebagai daftar kosong.
    - Jelaskan alasan rekomendasi tidak dapat diberikan.
    - Berikan saran agar pelanggan dapat menyesuaikan budget
      atau memilih jenis menu lain.
    - Jangan mengarang harga maupun produk alternatif.

# OUTPUT FORMAT
Berikan jawaban dalam format JSON yang valid dengan struktur:

{
    "recommended_menus": [
        {
            "name": "Nama produk",
            "size": "Ukuran paket",
            "quantity": 1
        }
    ],
    "recommendation_reason": "Alasan rekomendasi",
    "alternatives": [
        {
            "menus": [
                {
                    "name": "Nama produk",
                    "size": "Ukuran paket",
                    "quantity": 1
                }
            ],
            "reason": "Alasan alternatif"
        }
    ]
}

Jangan menambahkan teks atau Markdown di luar JSON.
```

**Actual Output C**

```json
{
  "recommended_menus": [
    {
      "name": "Original Premium",
      "size": "4",
      "quantity": 1
    },
    {
      "name": "Mentai Spicy",
      "size": "4",
      "quantity": 1
    }
  ],
  "recommendation_reason": "Kombinasi Original Premium (gurih) dan Mentai Spicy (pedas) memenuhi preferensi rasa gurih dan pedas, berada dalam kategori dimsum premium, dan diperkirakan tetap berada dalam batas budget Rp100.000 untuk 3 orang.",
  "alternatives": [
    {
      "menus": [
        {
          "name": "Mentai Spicy",
          "size": "6",
          "quantity": 1
        }
      ],
      "reason": "Pilihan ini menekankan rasa pedas dengan Mentai Spicy ukuran 6 buah, tetap dalam budget dan cocok bagi yang mengutamakan rasa pedas."
    },
    {
      "menus": [
        {
          "name": "Mix Mentai Spicy Cheese",
          "size": "4",
          "quantity": 1
        }
      ],
      "reason": "Mix Mentai Spicy Cheese memberikan kombinasi rasa mentai, pedas, dan keju, menawarkan variasi rasa dalam satu paket premium yang masih berada dalam batas budget."
    },
    {
      "menus": [
        {
          "name": "Original Premium",
          "size": "8",
          "quantity": 1
        }
      ],
      "reason": "Original Premium ukuran 8 buah menonjolkan rasa gurih secara maksimal, cocok bagi yang lebih menyukai rasa original dan tetap terjangkau dalam budget."
    }
  ]
}
```

**Observation**

Pada Prompt C, struktur JSON yang dihasilkan sudah paling mendekati format yang dibutuhkan aplikasi. Model memberikan daftar rekomendasi utama, alasan pemilihan menu, serta beberapa alternatif.

Dibandingkan Prompt A dan Prompt B, Prompt C memberikan instruksi yang lebih lengkap. Saya tidak hanya menjelaskan peran, tugas, dan konteks, tetapi juga menambahkan batasan agar model tidak mengarang produk, harga, atau informasi yang tidak tersedia dalam katalog.

Namun, hasilnya belum sepenuhnya mengikuti seluruh instruksi. Contohnya, model masih menggunakan perkiraan mengenai kesesuaian budget dalam alasan rekomendasi, padahal perhitungan harga seharusnya dilakukan oleh Python.

Hal ini menunjukkan bahwa prompt yang lebih lengkap dapat membantu mengarahkan model, tetapi tidak menjamin model selalu mengikuti setiap instruksi. Oleh karena itu, validasi menggunakan Python tetap diperlukan.

---

## 10. Prompt Evaluation

Setelah menjalankan ketiga versi prompt menggunakan input yang sama, saya membandingkan hasilnya berdasarkan struktur output, kelengkapan informasi, dan kesesuaian jawaban dengan kebutuhan aplikasi.

### A. Prompt yang Menghasilkan Output Paling Baik

Menurut saya, Prompt C menghasilkan output yang paling sesuai dengan kebutuhan aplikasi dibandingkan Prompt A dan Prompt B.

Prompt A hanya memberikan instruksi singkat sehingga model memiliki kebebasan lebih besar dalam menentukan isi dan struktur jawaban. Prompt B memberikan arahan yang lebih jelas melalui role, task, dan context, tetapi belum menetapkan batasan serta format output secara terperinci.

Sementara itu, Prompt C memberikan instruksi yang lebih lengkap. Model diberi tahu mengenai perannya, tugas yang harus dilakukan, sumber informasi yang boleh digunakan, batasan jawaban, dan struktur JSON yang diharapkan.

### B. Mengapa Prompt C Lebih Sesuai?

Prompt C lebih sesuai dengan kebutuhan aplikasi karena saya dapat menentukan informasi apa saja yang boleh digunakan oleh model dan bagaimana hasilnya harus disusun.

Contohnya, saya menambahkan aturan agar model tidak membuat nama produk di luar katalog dan tidak mengarang harga. Saya juga menentukan bahwa setiap alternatif harus memiliki daftar menu yang lengkap.

Selain itu, output format membantu aplikasi memperoleh struktur data yang lebih mudah dibaca dan diproses oleh Python.

### C. Perbandingan Prompt

| Aspek                                | Prompt A             | Prompt B            | Prompt C                                       |
| ------------------------------------ | -------------------- | ------------------- | ---------------------------------------------- |
| Instruksi                            | Sederhana            | Role, Task, Context | Role, Task, Context, Constraint, Output Format |
| Penjelasan produk                    | Ada, tetapi terbatas | Lebih terperinci    | Terarah berdasarkan konteks                    |
| Struktur output                      | Belum sesuai target  | Belum sesuai target | Paling sesuai target                           |
| Pengulangan produk                   | Terjadi              | Terjadi             | Tidak terlihat pada rekomendasi utama          |
| Batasan jawaban                      | Minim                | Minim               | Lebih lengkap                                  |
| Kesesuaian dengan kebutuhan aplikasi | Rendah               | Lebih baik dari A   | Paling sesuai dari ketiganya                   |

### D. Kesimpulan Eksperimen Prompt

Berdasarkan hasil pengujian, saya memahami bahwa kualitas instruksi yang diberikan kepada LLM dapat memengaruhi bentuk dan isi jawaban.

Prompt C saya pilih sebagai system prompt utama karena menghasilkan struktur yang paling sesuai dengan kebutuhan aplikasi. Namun, saya juga menemukan bahwa instruksi yang lengkap belum tentu membuat model selalu mengikuti seluruh aturan.

Oleh karena itu, prompt engineering perlu didukung dengan validasi tambahan pada kode Python. Dalam aplikasi ini, Python digunakan untuk memastikan bahwa produk, ukuran paket, dan harga benar-benar sesuai dengan katalog.

**Catatan metodologi:** Ketiga versi prompt diuji melalui endpoint `/experiment` yang menggunakan `response_format={"type": "json_object"}`. Dengan demikian, eksperimen ini membandingkan isi, struktur, dan kepatuhan terhadap instruksi dalam respons JSON, bukan kemampuan masing-masing prompt menghasilkan JSON tanpa bantuan pengaturan format dari API.

---

## 11. Failure Case

Pada bagian ini, saya menguji kondisi ketika pelanggan memasukkan budget yang terlalu rendah untuk membeli produk sesuai kategori dan preferensi yang diinginkan.

Pengujian ini bertujuan mengetahui bagaimana sistem memberikan respons ketika tidak ada kombinasi menu yang memenuhi kebutuhan pelanggan.

### A. Input Pengujian

Saya menggunakan input berikut:

```json
{
  "budget": 10000,
  "people_count": 3,
  "taste_preferences": ["pedas"],
  "menu_type": "dimsum premium"
}
```

Pada pengujian ini, pelanggan hanya memiliki budget Rp10.000 dan menginginkan dimsum premium dengan rasa pedas.

### B. Actual Output Sebelum Perbaikan

Pada pengujian awal, sistem menghasilkan respons berikut:

```json
{
  "recommended_menus": [],
  "estimated_total": 0,
  "alternatives": [],
  "budget_status": "no suitable menu",
  "recommendation_reason": "Dengan budget Rp10.000, tidak ada paket dimsum premium yang tersedia dalam katalog yang harganya berada di bawah atau sama dengan budget tersebut. Semua ukuran paket dimsum premium (Original Premium, Mentai Original, Mentai Cheese, Mentai Spicy, Mix Mentai Spicy Cheese) memiliki harga minimal Rp18.000, sehingga tidak dapat dipenuhi."
}
```

### C. Masalah yang Ditemukan

Pengujian ini bukan kegagalan teknis karena API tetap berhasil memberikan respons HTTP 200. Namun, sistem belum dapat memberikan rekomendasi menu karena tidak ada produk yang memenuhi budget pelanggan.

Saya menemukan beberapa hal:

1. Budget Rp10.000 tidak mencukupi untuk membeli paket dimsum premium yang tersedia dalam katalog.
2. Sistem mengembalikan daftar rekomendasi utama yang kosong.
3. Penjelasan yang diberikan belum memberikan saran yang cukup membantu pelanggan untuk menyesuaikan kebutuhannya.
4. Pada pengujian sebelumnya, saya juga menemukan bahwa status budget sempat menjadi `within budget` meskipun daftar rekomendasi kosong.

Masalah pada poin keempat merupakan kesalahan logika validasi di Python. Status budget seharusnya tidak dinyatakan sesuai jika sistem tidak menghasilkan menu yang dapat divalidasi.

### D. Perbaikan yang Dilakukan

Saya melakukan dua perbaikan.

**1. Memperbaiki logika status budget pada Python**

Saya mengubah kondisi penentuan status budget agar aplikasi memeriksa terlebih dahulu apakah daftar rekomendasi utama kosong.

Logika yang digunakan:

```python
if not validated["recommended_menus"]:
    validated["budget_status"] = "no suitable menu"
elif validated["estimated_total"] <= request.budget:
    validated["budget_status"] = "within budget"
else:
    validated["budget_status"] = "over budget"
```

Dengan kondisi tersebut, jika tidak ada rekomendasi utama yang berhasil divalidasi, sistem akan memberikan status `no suitable menu`.

**2. Menambahkan constraint pada system prompt**

Saya juga menambahkan instruksi khusus pada system prompt agar model menangani kondisi ketika tidak ada menu yang sesuai dengan budget.

Instruksi tambahan:

```text
Jika tidak ada menu yang sesuai dengan budget:
- Jangan memberikan rekomendasi utama yang melebihi budget.
- Kembalikan recommended_menus sebagai daftar kosong.
- Jelaskan alasan rekomendasi tidak dapat diberikan.
- Berikan saran agar pelanggan dapat menyesuaikan budget
  atau memilih jenis menu lain.
- Jangan mengarang harga maupun produk alternatif.
```

Tujuan perubahan ini adalah agar model tidak memaksakan rekomendasi yang sebenarnya tidak sesuai dengan kemampuan budget pelanggan.

### E. Actual Output Setelah Perbaikan

Setelah melakukan perubahan pada system prompt, saya menjalankan kembali pengujian menggunakan input yang sama.

Hasil yang diperoleh:

```json
{
  "recommended_menus": [],
  "estimated_total": 0,
  "alternatives": [],
  "budget_status": "no suitable menu",
  "recommendation_reason": "Tidak ada menu dimsum premium dengan rasa pedas yang tersedia dalam katalog yang memiliki harga di bawah atau sama dengan budget Rp10.000. Semua pilihan dimsum premium, termasuk varian pedas, memiliki harga minimum di atas budget tersebut."
}
```

### F. Evaluasi Hasil Perbaikan

Setelah perbaikan, sistem tetap mengembalikan daftar rekomendasi kosong dan status `no suitable menu`. Hasil tersebut sudah sesuai dengan kondisi ketika tidak ada produk yang memenuhi budget pelanggan.

Saya juga melihat bahwa penjelasan yang diberikan menjadi lebih spesifik terhadap preferensi rasa pedas dan jenis menu yang diminta.

Namun, model belum memberikan saran untuk menyesuaikan budget atau memilih jenis menu lain sebagaimana yang diminta dalam constraint tambahan.

Dengan demikian, perbaikan ini menunjukkan peningkatan pada penjelasan masalah, tetapi belum sepenuhnya menyelesaikan kekurangan yang ditemukan. Dari pengujian ini, saya memahami bahwa penambahan instruksi pada prompt tidak selalu menjamin model akan mengikuti seluruh ketentuan.

Jika aplikasi dikembangkan lebih lanjut, saran penyesuaian budget dapat dibuat menggunakan logika Python berdasarkan harga terendah dari kategori yang diminta. Dengan cara tersebut, aplikasi tidak hanya mengandalkan model untuk memberikan saran, tetapi juga dapat menggunakan informasi harga yang benar-benar tersedia.

---

## 12. Personal Reflection

### 1. Menurut kalian, bagian apa yang paling sulit dari project ini?

Bagian yang cukup sulit bagi saya adalah memahami bagaimana mengatur instruksi kepada LLM agar dapat menghasilkan rekomendasi menu sesuai kebutuhan pengguna dan data produk yang tersedia.

Saya perlu mempelajari cara menyusun system prompt yang jelas agar model dapat memahami informasi seperti budget, jumlah orang, preferensi rasa, dan jenis menu. Selain itu, saya juga perlu memastikan bahwa model hanya menggunakan nama produk dan pilihan ukuran paket yang benar-benar tersedia dalam katalog Dapoyumya.

Tantangan lainnya adalah mengatur hasil keluaran model dalam format JSON agar dapat diproses kembali oleh aplikasi. Saya juga perlu memahami bagaimana hasil rekomendasi divalidasi menggunakan Python untuk menghitung total harga berdasarkan katalog, sehingga perhitungan tidak hanya bergantung pada jawaban yang dihasilkan AI.

### 2. Bagian kode mana yang paling banyak dibantu oleh AI?

Bagian yang paling banyak saya pelajari dengan bantuan AI adalah proses integrasi Groq API pada `main.py`, penyusunan system prompt pada `prompts.py`, serta proses validasi menu dan perhitungan harga pada `menu_data.py`.

Saya menggunakan AI untuk membantu memahami fungsi setiap bagian kode, hubungan antarfungsi, dan cara menghubungkan hasil dari LLM dengan proses pengolahan data menggunakan Python.

Namun, saya tetap perlu membaca dan mencoba kode tersebut secara langsung agar dapat memahami bagaimana aplikasi bekerja ketika dijalankan.

### 3. Setelah melihat kode tersebut, jelaskan menggunakan bahasa kalian sendiri bagaimana bagian tersebut bekerja.

Pada `main.py`, FastAPI menerima input pengguna melalui endpoint `/recommend`. Input tersebut diperiksa terlebih dahulu menggunakan Pydantic agar nilai dan struktur request sesuai dengan ketentuan yang sudah dibuat.

Setelah itu, aplikasi membaca katalog produk dari `menu_data.json` melalui fungsi yang terdapat pada `menu_data.py`. Katalog dan kebutuhan pengguna kemudian dikirimkan bersama system prompt ke Groq API.

LLM menghasilkan rekomendasi dalam format JSON. Setelah respons diterima, Python memeriksa kembali nama produk, ukuran paket, dan jumlah pembelian melalui fungsi validasi pada `menu_data.py`.

Jika produk dan ukuran paket tersedia, Python mengambil harga dari katalog dan menghitung subtotal serta total harga. Selanjutnya, aplikasi menentukan status budget berdasarkan hasil perhitungan tersebut.

Hasil akhirnya dikembalikan kepada pengguna melalui API. Dengan alur ini, AI bertugas memahami kebutuhan dan menyusun rekomendasi, sedangkan Python memastikan bahwa data produk dan perhitungan harga sesuai dengan katalog.

### 4. Menurut kalian, apa kekurangan terbesar dari aplikasi yang kalian buat jika digunakan oleh user sungguhan?

Menurut saya, kekurangan terbesar aplikasi ini adalah hasil rekomendasi masih bergantung pada kemampuan LLM dalam mengikuti instruksi yang diberikan.

Meskipun sudah menggunakan system prompt dengan beberapa constraint, model terkadang belum mengikuti seluruh ketentuan. Contohnya, pada pengujian budget yang tidak mencukupi, model belum memberikan saran penyesuaian kebutuhan sesuai instruksi tambahan.

Selain itu, aplikasi masih perlu dikembangkan agar dapat menangani kondisi ketika produk tidak ditemukan, preferensi pelanggan tidak tersedia, atau budget terlalu rendah dengan respons yang lebih membantu.

### 5. Jika provider LLM kalian diganti, misalnya dari Groq ke Gemini atau OpenAI, bagian mana dari project yang menurut kalian perlu diubah?

Jika saya ingin mengganti provider LLM, bagian yang perlu disesuaikan terutama adalah konfigurasi API client, API key, nama model, dan cara pemanggilan API.

Saya juga perlu memeriksa kembali format pengiriman system prompt, cara membaca respons, serta dukungan structured output atau JSON mode pada provider yang baru.

Namun, bagian katalog, validasi produk, dan perhitungan harga menggunakan Python pada dasarnya dapat tetap digunakan selama struktur input dan output yang dipertahankan tidak berubah.

### 6. Setelah mencoba aplikasi kalian sendiri, apa satu improvement yang menurut kalian paling penting jika project ini dilanjutkan?

Jika memiliki lebih banyak waktu, saya ingin mengembangkan mekanisme rekomendasi yang dapat memberikan saran ketika budget pengguna tidak mencukupi.

Contohnya, aplikasi dapat memeriksa harga paket terendah dari kategori yang diminta, kemudian memberikan informasi mengenai perkiraan budget minimum berdasarkan katalog. Dengan demikian, pelanggan mendapatkan arahan yang lebih jelas ketika kombinasi menu yang diinginkan belum dapat dipenuhi.

Saya juga ingin menambahkan validasi output yang lebih ketat agar rekomendasi benar-benar sesuai dengan katalog, preferensi pengguna, dan batas budget. Dengan begitu, aplikasi tidak hanya menghasilkan rekomendasi, tetapi juga dapat memberikan respons yang lebih membantu ketika kebutuhan pelanggan tidak dapat dipenuhi.

---

## 13. AI Usage

### A. AI Tools yang Digunakan

aya menggunakan ChatGPT sebagai alat bantu selama proses pengerjaan proyek Dapoyumya Menu Recommendation Assistant. Saya memanfaatkan AI untuk membantu memahami materi, mempelajari cara kerja teknologi yang digunakan, serta mendapatkan arahan ketika mengembangkan aplikasi.

### B. AI Digunakan untuk Membantu Bagian Apa?

AI membantu saya memahami konsep Generative AI, Large Language Model (LLM), dan prompt engineering, termasuk bagaimana sebuah model dapat menghasilkan rekomendasi berdasarkan instruksi dan informasi yang diberikan.

Selain itu, AI membantu saya mempelajari penggunaan Groq API untuk menghubungkan aplikasi dengan LLM, memahami pembuatan endpoint menggunakan FastAPI, serta mengatur struktur data dan validasi input menggunakan Pydantic.

Selama proses pengembangan, saya juga menggunakan AI untuk memahami fungsi setiap file Python, menyusun system prompt, mengatur format keluaran JSON, dan memperbaiki bagian kode yang belum berjalan sesuai harapan. AI turut membantu saya memahami pesan kesalahan serta membandingkan hasil pengujian Prompt A, Prompt B, dan Prompt C untuk mengetahui pengaruh perbedaan instruksi terhadap rekomendasi yang dihasilkan.

### C. Bagian Apa yang Ditentukan, Diperbaiki, atau Diubah Sendiri?

Saya menentukan use case aplikasi, menggunakan katalog produk Dapoyumya sebagai dataset, menyiapkan struktur folder, mengatur environment, dan menjalankan aplikasi.

Saya juga melakukan pengujian endpoint melalui Swagger UI dengan memasukkan beberapa kebutuhan pelanggan, termasuk kondisi ketika budget mencukupi maupun ketika budget tidak mencukupi.

Untuk eksperimen prompt engineering, saya menjalankan Prompt A, Prompt B, dan Prompt C menggunakan input yang sama, kemudian mengamati serta membandingkan respons yang dihasilkan.

Ketika menemukan masalah pada status budget, saya memperbaiki logika validasi pada Python. Saya juga menambahkan constraint pada system prompt setelah menemukan bahwa model belum memberikan respons yang sesuai pada kondisi budget yang tidak mencukupi.

Seluruh hasil pengujian tersebut saya gunakan sebagai dasar untuk menyusun analisis dan refleksi proyek.

---

## 14. Conclusion

Melalui proyek ini, saya berhasil membangun aplikasi Dapoyumya Menu Recommendation Assistant menggunakan Python, FastAPI, Groq API, dan model `openai/gpt-oss-120b`.

Aplikasi dapat menerima kebutuhan pelanggan berupa budget, jumlah orang, preferensi rasa, dan jenis menu. Selanjutnya, LLM digunakan untuk memahami kebutuhan tersebut dan menghasilkan rekomendasi berdasarkan katalog produk Dapoyumya.

Saya juga menerapkan validasi menggunakan Python untuk memeriksa nama produk, ukuran paket, dan jumlah pembelian. Harga produk diambil dari katalog, kemudian Python menghitung subtotal dan total harga serta menentukan status kesesuaian budget.

Melalui eksperimen prompt engineering, saya menemukan bahwa Prompt C menghasilkan struktur jawaban yang paling sesuai dengan kebutuhan aplikasi dibandingkan Prompt A dan Prompt B. Namun, pengujian failure case menunjukkan bahwa model masih dapat mengabaikan sebagian instruksi meskipun sudah diberikan constraint yang lebih lengkap.

Dari proses pengerjaan ini, saya memahami bahwa membangun aplikasi Generative AI tidak hanya sebatas menghubungkan program dengan LLM. Saya juga perlu memperhatikan penyusunan prompt, validasi input dan output, pengelolaan data, penanganan kesalahan, serta evaluasi hasil agar aplikasi dapat memberikan respons yang sesuai dengan kebutuhan pengguna.

---
