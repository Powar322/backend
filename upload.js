const multer = require('multer');
const path = require('path');

// Настройка Multer для обработки файлов в памяти (без сохранения на диск)
const upload = multer({
    storage: multer.memoryStorage(), // Хранение файла как Buffer в памяти
    limits: {
        fileSize: 10 * 1024 * 1024, // Лимит: 10MB
        files: 1 // Разрешить только 1 файл за раз
    },
    fileFilter: (req, file, cb) => {
        // Проверка типа файла (разрешаем только изображения и произвольные бинарные данные)
        const allowedTypes = ['image/jpeg', 'image/png', 'application/octet-stream'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Only JPEG, PNG, or binary files are allowed'));
        }
        cb(null, true);
    }
});

module.exports = upload;