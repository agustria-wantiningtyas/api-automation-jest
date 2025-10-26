# API Automation (Jest)

Ringkasan singkat proyek pengujian API menggunakan Jest + Supertest.

- Test runner: [`jest` config in package.json](package.json)  
- Request library: `supertest` (dipakai di [`tests/user.test.js`](tests/user.test.js))  
- Reporter: `jest-html-reporter` menghasilkan laporan di [reports/api-test-report.html](reports/api-test-report.html)  

Prerequisites
- Node.js (v16+ direkomendasikan)
- npm

Instalasi
- NPM install
```bash
npm install
```

- Inisialisasi project
```bash
npm init -y
```

- Install dependency
```bash
npm install jest supertest --save-dev
```

- Install HTML reporter
```bash
npm install dotenv --save-dev
```

Menjalankan test
```bash
npm test
```

Hasil laporan
- Laporan HTML dibangun otomatis ke: [reports/api-test-report.html](reports/api-test-report.html)
  - Buka file tersebut di browser setelah menjalankan test.

Konfigurasi environment
- Variabel environment didefinisikan di file [.env](.env) dan dimuat oleh `dotenv` melalui konfigurasi Jest (`setupFiles: ["dotenv/config"]`) di [`package.json`](package.json).
- Variabel di `.env`:
  - `BASE_URL` — base URL API (contoh: https://reqres.in)
  - `API_KEY` — header x-api-key yang dipakai oleh request
  - `USER_NAME`, `USER_JOB` — data untuk create
  - `USER_NAME_UPDATE`, `USER_JOB_UPDATE` — data untuk update

File penting
- Tes: [`tests/user.test.js`](tests/user.test.js)
- Konfigurasi & skrip: [`package.json`](package.json)
- Environment: [.env](.env)
- Laporan hasil: [reports/api-test-report.html](reports/api-test-report.html)

Deskripsi test (ditemukan di [`tests/user.test.js`](tests/user.test.js))
- GET /users - memvalidasi list pengguna
- POST /users - membuat user baru
- PUT /users/:id - update user (PUT)
- PATCH /users/:id - update user (PATCH)
- DELETE /users/:id - menghapus user
