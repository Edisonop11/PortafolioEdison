const modalOverlay = document.getElementById('modal-overlay');
const modalBody = document.getElementById('modal-body');
const modalTitle = document.getElementById('modal-title');
const closeBtn = document.querySelector('.close-btn');

const navLinks = document.querySelectorAll('nav a, .feature-card');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const section = this.getAttribute('data-section');
        openModal(section);
    });
});

closeBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

function openModal(section) {
    modalBody.innerHTML = '';
    
    if (section === 'experiencia') {
        modalTitle.textContent = 'Mi Experiencia';
        modalBody.innerHTML = `
            <div class="skills-grid">
                <div class="skill-item" data-skill="python">
                    <div class="skill-title">
                        <i class='bx bxl-python'></i>
                        Python
                    </div>
                    <div class="skill-desc">Automatización y backend</div>
                    <div class="skill-detail" id="python-detail">
                        Dominio avanzado en el desarrollo de scripts personalizados, automatización de procesos empresariales y análisis de datos. Experiencia con librerías clave como Flask, Requests, Pandas y Selenium, y sólida comprensión en integración de servicios de backend y APIs.
                    </div>
                </div>
                <div class="skill-item" data-skill="css">
                    <div class="skill-title">
                        <i class='bx bxl-css3'></i>
                        CSS
                    </div>
                    <div class="skill-desc">Diseño responsivo y UX/UI</div>
                    <div class="skill-detail" id="css-detail">
                        Creación de interfaces fluidas y modernas utilizando Flexbox y CSS Grid. Experiencia en el diseño de experiencias de usuario (UX/UI) con énfasis en la estética, accesibilidad y la implementación de animaciones y transiciones suaves para una interacción dinámica.
                    </div>
                </div>
                <div class="skill-item" data-skill="html">
                    <div class="skill-title">
                        <i class='bx bxl-html5'></i>
                        HTML
                    </div>
                    <div class="skill-desc">Estructura semántica</div>
                    <div class="skill-detail" id="html-detail">
                        Capacidad para crear estructuras web limpias, semánticas y optimizadas bajo estándares W3C. Integración eficiente con JavaScript y CSS para garantizar la compatibilidad y el rendimiento en diversos dispositivos y navegadores (cross-browser compatibility).
                    </div>
                </div>
                <div class="skill-item" data-skill="javascript">
                    <div class="skill-title">
                        <i class='bx bxl-javascript'></i>
                        JavaScript
                    </div>
                    <div class="skill-desc">Interactividad y lógica frontend</div>
                    <div class="skill-detail" id="javascript-detail">
                        Habilidad para construir interfaces dinámicas, manejar la lógica frontend y consumir APIs de manera eficiente. Dominio de la asincronía (promesas, async/await) y la estructuración de código modular para proyectos escalables. Alta comprensión del ciclo de vida cliente-servidor.
                    </div>
                </div>
                <div class="skill-item" data-skill="webdev">
                    <div class="skill-title">
                        <i class='bx bx-globe'></i>
                        Desarrollo web
                    </div>
                    <div class="skill-desc">Ciclo completo de proyectos</div>
                    <div class="skill-detail" id="webdev-detail">
                        Experiencia integral en el desarrollo de proyectos web: desde el análisis y diseño hasta la programación, integración con bases de datos y despliegue (CI/CD). Manejo de entornos Linux, Git y prácticas de seguridad y rendimiento a largo plazo.
                    </div>
                </div>
            </div>
        `;
        
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('click', function() {
                const skill = this.getAttribute('data-skill');
                const detail = document.getElementById(`${skill}-detail`);
                
                if (detail.style.display === 'block') {
                    detail.style.display = 'none';
                    this.style.background = 'var(--surface-light)';
                } else {
                    document.querySelectorAll('.skill-detail').forEach(d => {
                        d.style.display = 'none';
                    });
                    document.querySelectorAll('.skill-item').forEach(i => {
                        i.style.background = 'var(--surface-light)';
                    });
                    detail.style.display = 'block';
                    this.style.background = 'var(--surface)';
                }
            });
        });
    } 
    else if (section === 'trabajos') {
        modalTitle.textContent = 'Trabajos - Demostración';
        modalBody.innerHTML = `
            <div class="project-intro">
                <h3 style="color: var(--accent); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class='bx bx-brain'></i>
                    IA de Corrección Gramatical
                </h3>
                <p style="color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.6;">
                    Sistema en desarrollo que utiliza inteligencia artificial para corregir textos automáticamente. 
                    Escribe cualquier texto y la IA lo mejorará gramaticalmente, corrigiendo errores de ortografía, 
                    puntuación y estilo.
                </p>
            </div>
            <div class="ai-corrector">
                <textarea class="text-input" placeholder="Escribe el texto que quieres corregir gramaticalmente..."></textarea>
                <button class="correct-btn">
                    <i class='bx bx-check'></i>
                    Corregir Texto
                </button>
                <div class="corrected-text" id="corrected-text">
                    El texto corregido aparecerá aquí...
                </div>
            </div>
        `;
        
        const correctBtn = document.querySelector('.correct-btn');
        const textInput = document.querySelector('.text-input');
        const correctedText = document.getElementById('corrected-text');
        
        correctBtn.addEventListener('click', async function() {
            const text = textInput.value.trim();
            if (!text) {
                correctedText.textContent = 'Por favor, ingresa un texto para corregir.';
                correctedText.style.color = 'var(--error)';
                return;
            }
            
            correctedText.textContent = 'Procesando con IA...';
            correctedText.style.color = 'var(--warning)';
            correctBtn.disabled = true;
            correctBtn.innerHTML = '<i class="bx bx-loader-circle bx-spin"></i> Procesando...';
            
            try {
                const result = await correctText(text);
                correctedText.textContent = result;
                correctedText.style.color = 'var(--text)';
                correctedText.style.borderColor = 'var(--success)';
            } catch (error) {
                console.error('Error:', error);
                correctedText.textContent = 'Error: ' + error.message;
                correctedText.style.color = 'var(--error)';
            } finally {
                correctBtn.disabled = false;
                correctBtn.innerHTML = '<i class="bx bx-check"></i> Corregir Texto';
            }
        });
    } 
    else if (section === 'otros') {
        modalTitle.textContent = 'Contacto y Más';
        modalBody.innerHTML = `
            <div class="contact-info">
                <h3 style="color: var(--primary); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class='bx bx-envelope'></i>
                    Información de Contacto
                </h3>
                <div class="contact-item">
                    <div class="contact-label">
                        <i class='bx bx-envelope'></i>
                        Correo Electrónico:
                    </div>
                    <div>e123disonff@gmail.com</div>
                </div>
                <div class="contact-item">
                    <div class="contact-label">
                        <i class='bx bxl-discord-alt'></i>
                        Discord:
                    </div>
                    <div>edison_op1</div>
                </div>
            </div>
            <div class="learning">
                <h3 style="color: var(--accent); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class='bx bx-book-open'></i>
                    Actualmente Aprendiendo
                </h3>
                <div class="learning-item">
                    <i class='bx bx-server'></i>
                    Configurar servidores de Minecraft
        `;
    }
    
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

async function correctText(text) {
    // Por ahora, simularemos la corrección
    return `${text} (Versión corregida)`;
    
    try {
        // Aquí iría la integración real con un servicio de IA
        // Por ahora, solo devolvemos el texto con una marca de "corregido"
        return `${text} (Versión corregida)`;
        
    } catch (error) {
        console.error('Error al corregir el texto:', error);
        throw new Error(`No se pudo conectar con el servicio de corrección: ${error.message}`);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        profileImg.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDI4MCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMjgwIiByeD0iMjQiIGZpbGw9IiMzMzQxNTUiLz4KPHBhdGggZD0iTTE0MCAxNDBMMTYwIDE2MEwxNDAgMTgwTDEyMCAxNjBMMTQwIDE0MFoiIGZpbGw9IiM2MGE1ZmEiLz4KPHBhdGggZD0iTTE0MCA3MEMxNTYuNTY5IDcwIDE3MCA4My40MzEgMTcwIDEwMEMxNzAgMTE2LjU2OSAxNTYuNTY5IDEzMCAxNDAgMTMwQzEyMy40MzEgMTMwIDExMCAxMTYuNTY5IDExMCAxMDBDMTEwIDgzLjQzMSAxMjMuNDMxIDcwIDE0MCA3MFoiIGZpbGw9IiM2MGE1ZmEiLz4KPC9zdmc+';
        });
    }
});