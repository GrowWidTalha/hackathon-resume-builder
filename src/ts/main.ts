import { generateResumeTemplate } from './templates.js';

interface Education {
    degree: string;
    school: string;
    date: string;
}

interface WorkExperience {
    title: string;
    company: string;
    date: string;
    responsibilities: string[];
}

interface ResumeData {
    name: string;
    profession: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    summary: string;
    workExperience: WorkExperience[];
    education: Education;
    skills: string[];
    picture?: string;
}

let resumeData: ResumeData = {
    name: 'John Doe',
    profession: 'Full Stack Developer',
    email: 'johndoe@example.com',
    phone: '(555) 123-4567',
    location: 'City, State',
    website: 'https://johndoe.com',
    summary: 'Passionate full stack developer with 5 years of experience in building robust web applications.',
    workExperience: [
        {
            title: 'Senior Developer',
            company: 'Tech Innovations Inc.',
            date: 'March 2020 - Present',
            responsibilities: [
                'Lead development of client projects',
                'Mentor junior developers',
                'Optimize application performance'
            ]
        }
    ],
    education: {
        degree: 'Bachelor of Science in Computer Science',
        school: 'University of Technology',
        date: 'Graduated May 2018'
    },
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL']
};

function loadResumeData(): void {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
        resumeData = JSON.parse(savedData) as ResumeData;
        // Ensure picture is handled as a data URL
        if (resumeData.picture && typeof resumeData.picture === 'string') {
            resumeData.picture = resumeData.picture;
        }
    }
}

function saveResumeData(): void {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
}

function updateResumeTemplate(): void {
    const resumeContainer = document.getElementById('resume');
    if (resumeContainer) {
        resumeContainer.innerHTML = generateResumeTemplate(resumeData);
        addEditableListeners();
    }
}

function addEditableListeners(): void {
    const editableElements = document.querySelectorAll('[data-field]');
    editableElements.forEach(element => {
        element.setAttribute('contenteditable', 'true');
        element.addEventListener('blur', handleEdit);
        // @ts-ignore
        element.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                (e.target as HTMLElement).blur();
            }
        });
    });
}

function handleEdit(e: Event): void {
    const target = e.target as HTMLElement;
    const field = target.getAttribute('data-field');
    if (field) {
        updateResumeField(field, target.textContent || '');
        debouncedUpdateResumeTemplate();
    }
}

const debouncedUpdateResumeTemplate = debounce(() => {
    updateResumeTemplate();
}, 500); // Adjust the delay time as needed

function updateResumeField(field: string, value: string): void {
    const keys = field.split('.');
    let obj: any = resumeData;
    for (let i = 0; i < keys.length - 1; i++) {
        // @ts-ignore
        if (keys[i].includes('[')) {
            const [arrayName, indexStr] = keys[i].split('[');
            const index = parseInt(indexStr.replace(']', ''), 10);
            obj = obj[arrayName][index];
        } else {
            obj = obj[keys[i]];
        }
    }
    const lastKey = keys[keys.length - 1];
    // @ts-ignore
    if (lastKey.includes('[')) {
        const [arrayName, indexStr] = lastKey.split('[');
        const index = parseInt(indexStr.replace(']', ''), 10);
        obj[arrayName][index] = value;
    } else {
        obj[lastKey] = value;
    }
    saveResumeData();
}

function addExperience(): void {
    resumeData.workExperience.push({
        title: 'New Position',
        company: 'Company Name',
        date: 'Start Date - End Date',
        responsibilities: ['Responsibility 1']
    });
    renderForm();
    saveResumeData();
    updateResumeTemplate();
}

function addSkill(): void {
    resumeData.skills.push('New Skill');
    renderForm();
    saveResumeData();
    updateResumeTemplate();
}

function initializeForm(): void {
    loadResumeData();
    renderForm();
    updateResumeTemplate();

    // Add event listeners for editable elements
    document.addEventListener('input', handleEdit);

    document.getElementById('addExperience')?.addEventListener('click', addExperience);
    document.getElementById('addSkill')?.addEventListener('click', addSkill);

    const form = document.getElementById('resumeForm') as HTMLFormElement;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        // Update resumeData with basic information
        resumeData.name = formData.get('name') as string || '';
        resumeData.profession = formData.get('profession') as string || '';
        resumeData.email = formData.get('email') as string || '';
        resumeData.phone = formData.get('phone') as string || '';
        resumeData.location = formData.get('location') as string || '';
        resumeData.website = formData.get('website') as string || '';
        resumeData.summary = formData.get('summary') as string || '';

        // Update education
        resumeData.education.degree = formData.get('educationDegree') as string || '';
        resumeData.education.school = formData.get('educationSchool') as string || '';
        resumeData.education.date = formData.get('educationDate') as string || '';

        saveResumeData();
        updateResumeTemplate();
    });
}

document.querySelectorAll('.section-toggle').forEach(toggle => {
    toggle.addEventListener('click', toggleFormSection);
});

const toggleFormButton = document.getElementById('toggleForm');
toggleFormButton?.addEventListener('click', () => {
    const formContainer = document.getElementById('form');
    formContainer?.classList.toggle('hidden');
});

function renderForm(): void {
    // Render basic information
    Object.keys(resumeData).forEach(key => {
        const element = document.getElementById(key);
        if (element && key !== 'workExperience' && key !== 'education' && key !== 'skills') {
            (element as HTMLInputElement).value = resumeData[key as keyof ResumeData] as string || '';
        }
    });

    // Render education
    const educationDegree = document.getElementById('educationDegree') as HTMLInputElement;
    const educationSchool = document.getElementById('educationSchool') as HTMLInputElement;
    const educationDate = document.getElementById('educationDate') as HTMLInputElement;

    if (educationDegree && educationSchool && educationDate) {
        educationDegree.value = resumeData.education.degree;
        educationSchool.value = resumeData.education.school;
        educationDate.value = resumeData.education.date;
    }

    // Render work experience
    const workExperienceInputs = document.getElementById('workExperienceInputs');
    if (workExperienceInputs) {
        workExperienceInputs.innerHTML = '';
        resumeData.workExperience.forEach((job, index) => {
            workExperienceInputs.innerHTML += createExperienceField(index);
            (document.getElementById(`experienceTitle${index}`) as HTMLInputElement).value = job.title;
            (document.getElementById(`experienceCompany${index}`) as HTMLInputElement).value = job.company;
            (document.getElementById(`experienceDate${index}`) as HTMLInputElement).value = job.date;
            (document.getElementById(`experienceResponsibilities${index}`) as HTMLTextAreaElement).value = job.responsibilities.join(', ');

            // Add event listeners for real-time updates
            document.getElementById(`experienceTitle${index}`)?.addEventListener('input', (e) => {
                updateExperienceField(index, 'title', (e.target as HTMLInputElement).value);
            });
            document.getElementById(`experienceCompany${index}`)?.addEventListener('input', (e) => {
                updateExperienceField(index, 'company', (e.target as HTMLInputElement).value);
            });
            document.getElementById(`experienceDate${index}`)?.addEventListener('input', (e) => {
                updateExperienceField(index, 'date', (e.target as HTMLInputElement).value);
            });
            document.getElementById(`experienceResponsibilities${index}`)?.addEventListener('input', (e) => {
                updateExperienceField(index, 'responsibilities', (e.target as HTMLTextAreaElement).value.split(',').map(r => r.trim()));
            });
        });
    }

    // Render skills
    const skillsInputs = document.getElementById('skillsInputs');
    if (skillsInputs) {
        skillsInputs.innerHTML = '';
        resumeData.skills.forEach((skill, index) => {
            skillsInputs.innerHTML += createSkillField(index, skill);
        });
    }
}

function createExperienceField(index: number): string {
    return `
        <div class="work-experience-group" id="experience${index}">
            <div class="input-group">
                <label for="experienceTitle${index}">Title:</label>
                <input type="text" id="experienceTitle${index}" name="experienceTitle${index}">
            </div>
            <div class="input-group">
                <label for="experienceCompany${index}">Company:</label>
                <input type="text" id="experienceCompany${index}" name="experienceCompany${index}">
            </div>
            <div class="input-group">
                <label for="experienceDate${index}">Date:</label>
                <input type="text" id="experienceDate${index}" name="experienceDate${index}">
            </div>
            <div class="input-group">
                <label for="experienceResponsibilities${index}">Responsibilities:</label>
                <textarea id="experienceResponsibilities${index}" name="experienceResponsibilities${index}"></textarea>
            </div>
            <button type="button" onclick="deleteExperience(${index})" class="delete-button">Delete</button>
        </div>
    `;
}

function createSkillField(index: number, skill: string): string {
    return `
        <div class="skill-group" id="skillGroup${index}">
            <div class="input-group">
                <label for="skill${index}">Skill:</label>
                <input type="text" id="skill${index}" name="skill${index}" value="${skill || ''}">
            </div>
            <button type="button" onclick="deleteSkill(${index})" class="delete-button">Delete</button>
        </div>
    `;
}

function updateExperienceField(index: number, field: keyof WorkExperience, value: string | string[]): void {
    if (index >= 0 && index < resumeData.workExperience.length) {
        const experience = resumeData.workExperience[index];
        experience[field] = value as any;
        saveResumeData();
        updateResumeTemplate();
    }
}

function updateSkill(index: number, value: string): void {
    if (index >= 0 && index < resumeData.skills.length) {
        resumeData.skills[index] = value;
        saveResumeData();
        updateResumeTemplate();
    }
}

function deleteExperience(index: number): void {
    if (index >= 0 && index < resumeData.workExperience.length) {
        resumeData.workExperience.splice(index, 1);
        renderForm();
        saveResumeData();
        updateResumeTemplate();
    }
}

function deleteSkill(index: number): void {
    if (index >= 0 && index < resumeData.skills.length) {
        resumeData.skills.splice(index, 1);
        renderForm();
        saveResumeData();
        updateResumeTemplate();
    }
}

function debounce<F extends (...args: any[]) => any>(func: F, wait: number): (...args: Parameters<F>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return function(this: ThisParameterType<F>, ...args: Parameters<F>) {
        const context = this;
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

document.addEventListener('DOMContentLoaded', () => {
    initializeForm();
});

document.querySelectorAll('[contenteditable="true"]').forEach(element => {
    element.addEventListener('input', () => {
        const sanitizedValue = (element.textContent || '').replace(/[^a-zA-Z0-9\s]/g, ''); // Allow only alphanumeric characters and spaces
        element.textContent = sanitizedValue;
    });
});

document.getElementById('profilePicture')?.addEventListener('change', (e: Event) => {
    const fileInput = e.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const imageDataUrl = reader.result as string;
            resumeData.picture = imageDataUrl;
            saveResumeData();
            renderForm();
            updateResumeTemplate();
        };

        reader.readAsDataURL(file);
    }
});

function toggleFormSection(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('section-toggle')) {
        const content = target.nextElementSibling as HTMLElement;
        if (content) {
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
            const icon = target.querySelector('i');
            icon?.classList.toggle('fa-chevron-down');
            icon?.classList.toggle('fa-chevron-up');
        }
    }
}
