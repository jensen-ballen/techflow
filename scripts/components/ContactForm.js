/**
 * ContactForm.js - Formulario de contacto con simulación realista
 * Sin backend - funciona en Vercel y cualquier hosting estático
 */

export class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.successMessage = document.getElementById('formSuccess');
        this.submitBtn = null;
        this.storageKey = 'contact_messages';
        this.init();
    }

    init() {
        if (this.form) {
            this.submitBtn = this.form.querySelector('.btn-submit');
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            this.setupValidation();
        }
    }

    setupValidation() {
        const fields = [
            { id: 'name', validate: this.validateName, errorId: 'nameError', required: true },
            { id: 'email', validate: this.validateEmail, errorId: 'emailError', required: true },
            { id: 'message', validate: this.validateMessage, errorId: 'messageError', required: true }
        ];

        fields.forEach(field => {
            const input = document.getElementById(field.id);
            if (input) {
                input.addEventListener('blur', () => this.validateField(field));
                input.addEventListener('input', () => this.clearError(field));
            }
        });
    }

    // ═══════════════════════════════════════════════════════════
    // VALIDACIONES
    // ═══════════════════════════════════════════════════════════

    validateName(field) {
        const value = document.getElementById(field.id).value.trim();
        if (!value) return 'El nombre es obligatorio';
        if (value.length < 3) return 'El nombre debe tener al menos 3 caracteres';
        if (!/^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/.test(value)) return 'Solo letras permitidas';
        return null;
    }

    validateEmail(field) {
        const value = document.getElementById(field.id).value.trim();
        if (!value) return 'El email es obligatorio';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Ingresa un email válido';
        return null;
    }

    validateMessage(field) {
        const value = document.getElementById(field.id).value.trim();
        if (!value) return 'El mensaje es obligatorio';
        if (value.length < 10) return 'El mensaje debe tener al menos 10 caracteres';
        return null;
    }

    validateField(field) {
        const input = document.getElementById(field.id);
        const errorElement = document.getElementById(field.errorId);
        const error = field.validate(field);

        if (error) {
            input.classList.add('error');
            errorElement.textContent = error;
            return false;
        } else {
            input.classList.remove('error');
            errorElement.textContent = '';
            return true;
        }
    }

    clearError(field) {
        const input = document.getElementById(field.id);
        const errorElement = document.getElementById(field.errorId);
        input.classList.remove('error');
        errorElement.textContent = '';
    }

    getFormData() {
        return {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim() || null,
            service: document.getElementById('service').value || null,
            message: document.getElementById('message').value.trim(),
            date: new Date().toISOString()
        };
    }

    // ═══════════════════════════════════════════════════════════
    // ENVÍO DEL FORMULARIO
    // ═══════════════════════════════════════════════════════════

    async handleSubmit(e) {
        e.preventDefault();

        const fields = [
            { id: 'name', validate: this.validateName, errorId: 'nameError' },
            { id: 'email', validate: this.validateEmail, errorId: 'emailError' },
            { id: 'message', validate: this.validateMessage, errorId: 'messageError' }
        ];

        let isValid = true;
        let firstError = null;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
                if (!firstError) firstError = field.id;
            }
        });

        if (!isValid) {
            this.scrollToError(firstError);
            return;
        }

        const data = this.getFormData();
        this.setLoadingState(true);

        try {
            const result = await this.fakeApiRequest(data);

            if (result.success) {
                this.onSuccess();
            } else {
                this.onError();
            }
        } catch (error) {
            this.onError();
        } finally {
            this.setLoadingState(false);
        }
    }

    scrollToError(fieldId) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.scrollIntoView({ behavior: 'smooth', block: 'center' });
            field.focus();
        }
    }

    // ═══════════════════════════════════════════════════════════
    // SIMULACIÓN DE API (FUNCIÓN EXTRA)
    // ═══════════════════════════════════════════════════════════

    fakeApiRequest(data) {
        return new Promise((resolve) => {
            const delay = this.randomBetween(1500, 2000);
            
            setTimeout(() => {
                const success = Math.random() < 0.9;
                
                if (success) {
                    this.saveToLocalStorage(data);
                    resolve({
                        success: true,
                        message: 'Mensaje enviado correctamente',
                        data: data
                    });
                } else {
                    resolve({
                        success: false,
                        message: 'Error al enviar, intenta nuevamente'
                    });
                }
            }, delay);
        });
    }

    randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // ═══════════════════════════════════════════════════════════
    // PERSISTENCIA LOCAL
    // ═══════════════════════════════════════════════════════════

    saveToLocalStorage(data) {
        const messages = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        messages.push(data);
        localStorage.setItem(this.storageKey, JSON.stringify(messages));
        console.log('💾 Mensaje guardado en localStorage:', data);
    }

    // ═══════════════════════════════════════════════════════════
    // ESTADOS UI
    // ═══════════════════════════════════════════════════════════

    setLoadingState(isLoading) {
        if (!this.submitBtn) return;

        if (isLoading) {
            this.submitBtn.disabled = true;
            this.submitBtn.classList.add('loading');
            this.submitBtn.innerHTML = '<span class="spinner"></span> Enviando...';
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.classList.remove('loading');
            this.submitBtn.innerHTML = '<span class="btn-text">Enviar Mensaje</span><span class="btn-icon">→</span>';
        }
    }

    onSuccess() {
        this.form.reset();
        
        const successDiv = document.getElementById('formSuccess');
        successDiv.classList.add('show');
        
        setTimeout(() => {
            successDiv.classList.remove('show');
        }, 4000);

        console.log('✅ Formulario enviado exitosamente');
    }

    onError() {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-error';
        alertDiv.innerHTML = `
            <span class="alert-icon">⚠️</span>
            <span>Error al enviar, intenta nuevamente</span>
            <button class="alert-close" onclick="this.parentElement.remove()">✕</button>
        `;
        
        this.form.insertBefore(alertDiv, this.form.firstChild);
        
        setTimeout(() => alertDiv.remove(), 4000);
        
        console.log('❌ Error en el envío');
    }
}