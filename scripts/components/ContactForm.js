export class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.successMessage = document.getElementById('formSuccess');
        this.apiEndpoint = 'http://localhost:3000/api/contact';
        this.submitBtn = null;
        this.init();
    }

    init() {
        if (this.form) {
            this.submitBtn = this.form.querySelector('.btn-submit');
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            this.setupValidation();
            this.setupAutoSave();
            this.setupDebounceValidation();
        }
    }

    setupValidation() {
        const fields = [
            { id: 'name', validate: this.validateName, errorId: 'nameError', required: true },
            { id: 'email', validate: this.validateEmail, errorId: 'emailError', required: true },
            { id: 'message', validate: this.validateMessage, errorId: 'messageError', required: true },
            { id: 'phone', validate: this.validatePhone, errorId: 'phoneError', required: false }
        ];

        fields.forEach(field => {
            const input = document.getElementById(field.id);
            if (input) {
                input.addEventListener('blur', () => this.validateField(field));
                input.addEventListener('input', () => {
                    this.clearError(field);
                    if (field.required) this.markFieldAsTouched(input);
                });
            }
        });
    }

    setupDebounceValidation() {
        let debounceTimer;
        const inputs = this.form.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    this.checkFieldOnServer(input);
                }, 1500);
            });
        });
    }

    async checkFieldOnServer(input) {
        if (!input.value.trim()) return;

        try {
            const response = await fetch(`${this.apiEndpoint}/validate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    field: input.id,
                    value: input.value
                })
            });
            const result = await response.json();

            if (result.valid === false && result.suggestion) {
                this.showInlineSuggestion(input.id, result.suggestion);
            }
        } catch (e) {
            // Silencioso - solo validación en tiempo real
        }
    }

    showInlineSuggestion(fieldId, suggestion) {
        const input = document.getElementById(fieldId);
        if (input) {
            input.setAttribute('data-suggestion', suggestion);
            input.classList.add('has-suggestion');
        }
    }

    setupAutoSave() {
        const formFields = ['name', 'email', 'phone', 'service', 'message'];

        formFields.forEach(fieldId => {
            const input = document.getElementById(fieldId);
            if (input) {
                input.addEventListener('input', () => {
                    this.autoSaveDraft(input.id, input.value);
                });
            }
        });

        this.loadDraft();
    }

    autoSaveDraft(field, value) {
        const drafts = JSON.parse(localStorage.getItem('techflow_draft') || '{}');
        drafts[field] = { value, timestamp: Date.now() };
        localStorage.setItem('techflow_draft', JSON.stringify(drafts));
    }

    loadDraft() {
        const drafts = JSON.parse(localStorage.getItem('techflow_draft') || '{}');
        const fields = ['name', 'email', 'phone', 'service', 'message'];

        fields.forEach(field => {
            if (drafts[field] && drafts[field].value) {
                const input = document.getElementById(field);
                if (input && !input.value) {
                    input.value = drafts[field].value;
                    input.classList.add('draft-loaded');
                }
            }
        });
    }

    clearDraft() {
        localStorage.removeItem('techflow_draft');
    }

    markFieldAsTouched(input) {
        input.classList.add('touched');
    }

    validateName(field) {
        const value = document.getElementById(field.id).value.trim();
        if (!value) return 'El nombre es obligatorio';
        if (value.length < 2) return 'El nombre debe tener al menos 2 caracteres';
        if (!/^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/.test(value)) return 'El nombre solo puede contener letras';
        if (value.length > 50) return 'El nombre es demasiado largo';
        return null;
    }

    validateEmail(field) {
        const value = document.getElementById(field.id).value.trim();
        if (!value) return 'El correo electrónico es obligatorio';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Ingresa un correo electrónico válido';
        return null;
    }

    validatePhone(field) {
        const value = document.getElementById(field.id).value.trim();
        if (!value) return null;
        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        if (!phoneRegex.test(value)) return 'Ingresa un número de teléfono válido';
        if (value.replace(/\D/g, '').length < 8) return 'El teléfono debe tener al menos 8 dígitos';
        return null;
    }

    validateMessage(field) {
        const value = document.getElementById(field.id).value.trim();
        if (!value) return 'El mensaje es obligatorio';
        if (value.length < 10) return 'El mensaje debe tener al menos 10 caracteres';
        if (value.length > 1000) return 'El mensaje es demasiado largo (máx 1000 caracteres)';
        return null;
    }

    validateField(field) {
        const input = document.getElementById(field.id);
        const errorElement = document.getElementById(field.errorId);
        const error = field.validate(field);

        if (error) {
            input.classList.add('error');
            input.classList.remove('valid');
            errorElement.textContent = error;
            this.animateError(input);
            return false;
        } else {
            input.classList.remove('error');
            input.classList.add('valid');
            errorElement.textContent = '';
            return true;
        }
    }

    animateError(input) {
        input.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
    }

    clearError(field) {
        const input = document.getElementById(field.id);
        const errorElement = document.getElementById(field.errorId);
        input.classList.remove('error');
        input.classList.remove('touched');
        errorElement.textContent = '';
    }

    getFormData() {
        return {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            service: document.getElementById('service').value,
            message: document.getElementById('message').value.trim(),
            timestamp: new Date().toISOString()
        };
    }

    async handleSubmit(e) {
        e.preventDefault();

        const fields = [
            { id: 'name', validate: this.validateName, errorId: 'nameError', required: true },
            { id: 'email', validate: this.validateEmail, errorId: 'emailError', required: true },
            { id: 'message', validate: this.validateMessage, errorId: 'messageError', required: true },
            { id: 'phone', validate: this.validatePhone, errorId: 'phoneError', required: false }
        ];

        let isValid = true;
        let firstErrorField = null;

        fields.forEach(field => {
            if (field.required && !this.validateField(field)) {
                isValid = false;
                if (!firstErrorField) firstErrorField = field.id;
            }
        });

        if (!isValid) {
            this.scrollToError(firstErrorField);
            return;
        }

        const data = this.getFormData();
        this.setLoadingState(true);

        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                this.onSuccess(result);
            } else if (result.errors && result.errors.length > 0) {
                this.handleValidationErrors(result.errors);
            } else {
                this.onError(result.message || 'Error al enviar el mensaje');
            }
        } catch (error) {
            console.error('Error:', error);

            if (!navigator.onLine) {
                this.saveOfflineSubmission(data);
                this.onSuccess({ message: 'Mensaje guardado. Se envío cuando tengas conexión.' });
            } else {
                this.onError('No se pudo conectar con el servidor. ¿Quieres guardar el mensaje localmente?');
            }
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

    setLoadingState(isLoading) {
        if (!this.submitBtn) return;

        if (isLoading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;

            const btnText = this.submitBtn.querySelector('.btn-text');
            const btnIcon = this.submitBtn.querySelector('.btn-icon');

            if (btnText) btnText.textContent = 'Enviando...';
            if (btnIcon) btnIcon.style.display = 'none';

            this.submitBtn.innerHTML = `
                <span class="spinner"></span>
                <span class="btn-text">Enviando...</span>
            `;
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;

            this.submitBtn.innerHTML = `
                <span class="btn-text">Enviar Mensaje</span>
                <span class="btn-icon">→</span>
            `;
        }
    }

    onSuccess(result) {
        this.form.reset();
        this.clearDraft();
        this.clearValidStates();

        const successMessage = document.getElementById('formSuccess');
        const successText = successMessage.querySelector('p');

        if (result.message) {
            successText.textContent = result.message;
        } else {
            successText.textContent = '¡Mensaje enviado exitosamente! Te contactaremos pronto.';
        }

        successMessage.classList.add('show');

        this.trackSubmissionEvent('success', result);

        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 6000);
    }

    onError(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-error';
        alertDiv.innerHTML = `
            <span class="alert-icon">⚠️</span>
            <span>${message}</span>
            <button class="alert-close" onclick="this.parentElement.remove()">✕</button>
        `;

        this.form.insertBefore(alertDiv, this.form.firstChild);

        setTimeout(() => alertDiv.remove(), 5000);

        this.trackSubmissionEvent('error', { message });
    }

    handleValidationErrors(errors) {
        errors.forEach(error => {
            const fieldPath = error.path;
            const input = document.getElementById(fieldPath);
            const errorElement = document.getElementById(`${fieldPath}Error`);

            if (input && errorElement) {
                input.classList.add('error');
                errorElement.textContent = error.msg;
            }
        });

        if (errors.length > 0) {
            this.scrollToError(errors[0].path);
        }
    }

    clearValidStates() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.classList.remove('valid', 'touched', 'draft-loaded');
        });
    }

    saveOfflineSubmission(data) {
        const submissions = JSON.parse(localStorage.getItem('techflow_submissions') || '[]');
        submissions.push({
            ...data,
            timestamp: new Date().toISOString(),
            synced: false,
            status: 'pending'
        });
        localStorage.setItem('techflow_submissions', JSON.stringify(submissions));
        this.scheduleSync();
    }

    scheduleSync() {
        if (window.syncInterval) return;

        window.syncInterval = setInterval(async () => {
            if (navigator.onLine) {
                await this.syncPendingSubmissions();
            }
        }, 30000);
    }

    async syncPendingSubmissions() {
        const submissions = JSON.parse(localStorage.getItem('techflow_submissions') || '[]');
        const pending = submissions.filter(s => !s.synced);

        for (const submission of pending) {
            try {
                const response = await fetch(this.apiEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(submission)
                });

                if (response.ok) {
                    submission.synced = true;
                    submission.syncedAt = new Date().toISOString();
                }
            } catch (e) {
                break;
            }
        }

        localStorage.setItem('techflow_submissions', JSON.stringify(submissions));

        if (pending.every(s => s.synced)) {
            clearInterval(window.syncInterval);
            window.syncInterval = null;
        }
    }

    trackSubmissionEvent(event, data) {
        const analytics = {
            event: 'form_submission',
            status: event,
            timestamp: Date.now(),
            ...data
        };

        console.log('[Analytics]', analytics);

        if (window.gtag) {
            window.gtag('event', event === 'success' ? 'form_submission_success' : 'form_submission_error', {
                event_category: 'engagement',
                event_label: 'contact_form'
            });
        }
        if (!result.success) {
            console.log(result.errors);
            alert(result.errors[0].msg);
            return;
        }
    }
}