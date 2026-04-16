import express from 'express';
import pool from '../db.js';
import { validationResult, body, param } from 'express-validator';

const router = express.Router();

const sanitizeInput = (value) => {
    if (typeof value !== 'string') return '';
    return value.replace(/<[^>]*>/g, '').trim();
};

const contactValidationRules = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 50 })
        .withMessage('El nombre debe tener entre 2 y 50 caracteres')
        .matches(/^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/)
        .withMessage('El nombre solo puede contener letras'),
    
    body('email')
        .trim()
        .notEmpty()
        .withMessage('El correo electrónico es obligatorio')
        .isEmail()
        .withMessage('Ingresa un correo electrónico válido')
        .normalizeEmail(),
    
    body('phone')
        .optional()
        .trim()
        .matches(/^[\d\s\+\-\(\)]+$/)
        .withMessage('Ingresa un número de teléfono válido'),
    
    body('service')
        .optional()
        .trim()
        .isIn(['web', 'mobile', 'design', 'consulting', 'other'])
        .withMessage('Servicio inválido'),
    
    body('message')
        .trim()
        .notEmpty()
        .withMessage('El mensaje es obligatorio')
        .isLength({ min: 10, max: 1000 })
        .withMessage('El mensaje debe tener entre 10 y 1000 caracteres')
];

router.post('/', contactValidationRules, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg,
                errors: errors.array()
            });
        }

        const { name, email, phone, service, message } = req.body;
        
        const existingContact = await pool.query(
            'SELECT id FROM contactos WHERE email = $1 ORDER BY created_at DESC LIMIT 1',
            [email]
        );

        if (existingContact.rows.length > 0) {
            const recentContact = existingContact.rows[0];
            const timeSinceLastMessage = Date.now() - new Date(recentContact.created_at).getTime();
            
            if (timeSinceLastMessage < 60000) {
                return res.status(429).json({
                    success: false,
                    message: 'Por favor espera un momento antes de enviar otro mensaje'
                });
            }
        }

        const result = await pool.query(
            `INSERT INTO contactos (nombre, email, telefono, servicio, mensaje, ip_address, user_agent)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [
                sanitizeInput(name),
                email.toLowerCase(),
                phone ? sanitizeInput(phone) : null,
                service || 'other',
                sanitizeInput(message),
                req.ip || req.connection.remoteAddress,
                req.get('User-Agent')
            ]
        );

        console.log(`📝 Nuevo contacto: ${email} - ${service || 'general'}`);

        res.status(201).json({
            success: true,
            message: 'Mensaje enviado exitosamente',
            data: {
                id: result.rows[0].id,
                created_at: result.rows[0].created_at
            }
        });

    } catch (error) {
        console.error('Error en contacto:', error);
        
        if (error.code === '23505') {
            return res.status(409).json({
                success: false,
                message: 'Ya has enviado un mensaje recientemente'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error al procesar tu solicitud. Por favor intenta más tarde.'
        });
    }
});

router.post('/validate', async (req, res) => {
    try {
        const { field, value } = req.body;
        
        if (!field || !value) {
            return res.json({ valid: true });
        }

        let valid = true;
        let suggestion = null;

        switch (field) {
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    valid = false;
                    suggestion = '¿Querías decir ejemplo@correo.com?';
                }
                break;
            case 'phone':
                if (value.length > 0 && value.replace(/\D/g, '').length < 8) {
                    valid = false;
                    suggestion = 'El teléfono debe tener al menos 8 dígitos';
                }
                break;
            case 'name':
                if (value.length > 0 && value.length < 2) {
                    valid = false;
                    suggestion = 'El nombre debe tener al menos 2 caracteres';
                }
                break;
        }

        res.json({ valid, suggestion });

    } catch (error) {
        res.json({ valid: true });
    }
});

router.get('/stats', async (req, res) => {
    try {
        const total = await pool.query('SELECT COUNT(*) as total FROM contactos');
        const byService = await pool.query(
            'SELECT servicio, COUNT(*) as count FROM contactos GROUP BY servicio'
        );
        const recent = await pool.query(
            'SELECT * FROM contactos ORDER BY created_at DESC LIMIT 5'
        );

        res.json({
            success: true,
            data: {
                total: parseInt(total.rows[0].total),
                byService: byService.rows,
                recent: recent.rows
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener estadísticas'
        });
    }
});

export default router;