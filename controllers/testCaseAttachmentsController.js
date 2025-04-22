const db = require('../connection.js')

// Загрузка нового вложения
exports.uploadAttachment = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const { test_case_id, is_img } = req.body;
    const fileBuffer = req.file.buffer;

    db.run(
        `INSERT INTO attachments_for_test_cases 
     (test_case_id, file, is_img) 
     VALUES (?, ?, ?)`,
        [test_case_id, fileBuffer, is_img || 0],
        function(err) {
            if (err) {
                return res.status(500).json({
                    error: 'Database error',
                    details: err.message
                });
            }

            res.status(201).json({
                id: this.lastID,
                test_case_id,
                is_img,
                file_size: fileBuffer.length,
                mimetype: req.file.mimetype
            });
        }
    );
};

// Получение метаданных вложения
exports.getAttachmentInfo = (req, res) => {
    db.get(
        `SELECT id, test_case_id, is_img, 
     length(file) as file_size 
     FROM attachments_for_test_cases 
     WHERE id = ?`,
        [req.params.id],
        (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!row) return res.status(404).json({ error: 'Attachment not found' });
            res.json(row);
        }
    );
};

// Скачивание файла
exports.downloadAttachment = (req, res) => {
    db.get(
        `SELECT file, is_img FROM attachments_for_test_cases 
     WHERE id = ?`,
        [req.params.id],
        (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!row) return res.status(404).json({ error: 'Attachment not found' });

            // Определяем Content-Type
            const contentType = row.is_img
                ? 'image/jpeg'
                : 'application/octet-stream';

            res.set({
                'Content-Type': contentType,
                'Content-Disposition': `attachment; filename="file_${req.params.id}"`
            });
            res.send(row.file);
        }
    );
};

// Удаление вложения
exports.deleteAttachment = (req, res) => {
    db.run(
        'DELETE FROM attachments_for_test_cases WHERE id = ?',
        [req.params.id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Attachment not found' });
            }
            res.json({ success: true });
        }
    );
};
