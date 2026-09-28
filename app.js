const express = require("express");

const app = express();

app.use(express.json());

// GET /
app.get("/", (req, res) => {
  res.status(200).json({
    message: "RESTful API Inventaris Kampus"
  });
});

let assets = [
  {
    id: 1,
    kodeAset: "AST001",
    namaAset: "Laptop",
    lokasi: "Lab Komputer",
    kondisi: "baik",
    tahunPengadaan: 2024
  },
  {
    id: 2,
    kodeAset: "AST002",
    namaAset: "Proyektor",
    lokasi: "Ruang Kelas A",
    kondisi: "rusak ringan",
    tahunPengadaan: 2023
  },
  {
    id: 3,
    kodeAset: "AST003",
    namaAset: "Kursi",
    lokasi: "Ruang Kelas B",
    kondisi: "rusak berat",
    tahunPengadaan: 2022
  }
];

let nextId = 4;


// GET /assets
app.get("/assets", (req, res) => {
  const { kondisi } = req.query;

  if (kondisi) {
    const hasil = assets.filter((asset) => asset.kondisi === kondisi);
    return res.status(200).json(hasil);
  }

  res.status(200).json(assets);
});


// GET /assets/:id
app.get("/assets/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const asset = assets.find((item) => item.id === id);

  if (!asset) {
    return res.status(404).json({
      status: "error",
      message: "Asset tidak ditemukan",
      data: null
    });
  }

  res.status(200).json(asset);
});


// POST /assets
app.post("/assets", (req, res) => {
  const {
    kodeAset,
    namaAset,
    lokasi,
    kondisi,
    tahunPengadaan
  } = req.body;

  if (!kodeAset || !namaAset || !lokasi || !kondisi) {
    return res.status(400).json({
      status: "error",
      message: "kodeAset, namaAset, lokasi, dan kondisi wajib diisi",
      data: null
    });
  }

  const kondisiValid = ["baik", "rusak ringan", "rusak berat"];

  if (!kondisiValid.includes(kondisi)) {
    return res.status(400).json({
      status: "error",
      message: "kondisi harus baik, rusak ringan, atau rusak berat",
      data: null
    });
  }

  const newAsset = {
    id: nextId++,
    kodeAset,
    namaAset,
    lokasi,
    kondisi,
    tahunPengadaan
  };

  assets.push(newAsset);

  res.status(201).json({
    status: "success",
    message: "Data asset berhasil ditambahkan",
    data: newAsset
  });
});

// PUT /assets/:id
app.put("/assets/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const assetIndex = assets.findIndex((item) => item.id === id);

  if (assetIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Asset tidak ditemukan",
      data: null
    });
  }

  const {
    kodeAset,
    namaAset,
    lokasi,
    kondisi,
    tahunPengadaan
  } = req.body;

  if (!kodeAset || !namaAset || !lokasi || !kondisi) {
    return res.status(400).json({
      status: "error",
      message: "kodeAset, namaAset, lokasi, dan kondisi wajib diisi",
      data: null
    });
  }

  const kondisiValid = ["baik", "rusak ringan", "rusak berat"];

  if (!kondisiValid.includes(kondisi)) {
    return res.status(400).json({
      status: "error",
      message: "kondisi harus baik, rusak ringan, atau rusak berat",
      data: null
    });
  }

  const updatedAsset = {
    id: id,
    kodeAset,
    namaAset,
    lokasi,
    kondisi,
    tahunPengadaan
  };

  assets[assetIndex] = updatedAsset;

  res.status(200).json({
    status: "success",
    message: "Data asset berhasil diubah",
    data: updatedAsset
  });
});

// DELETE /assets/:id
app.delete("/assets/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const assetIndex = assets.findIndex((item) => item.id === id);

  if (assetIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Asset tidak ditemukan",
      data: null
    });
  }

  assets.splice(assetIndex, 1);

  res.status(200).json({
    status: "success",
    message: "Data asset berhasil dihapus",
    data: null
  });
});

// Catch-all 404
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint tidak ditemukan",
    data: null
  });
});

app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});