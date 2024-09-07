import { generateResumeTemplate } from './templates.js';

interface Job {
    title: string;
    company: string;
    date: string;
    responsibilities: string[];
}

interface Education {
    degree: string;
    school: string;
    date: string;
}

interface ResumeData {
    name: string;
    profession: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    summary: string;
    workExperience: Job[];
    education: Education;
    picture?: string;

    skills: string[];
}

// Mock data (initial state)
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
        school: 'University of Example',
        date: 'Graduated: May 2016'
    },
    skills: ['HTML5', 'CSS3', 'JavaScript']
};

// Load data from local storage or use the default mock data
function loadResumeData() {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
        resumeData = JSON.parse(savedData);
        // Ensure picture is handled as a data URL
        if (resumeData.picture) {
            resumeData.picture = resumeData.picture;
        }
    }
}

// Save resume data to local storage
function saveResumeData() {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
}

// Render the form with the current resume data
function renderForm() {
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
            const skillInput = document.getElementById(`skill${index}`) as HTMLInputElement;
            skillInput.value = skill;

            // Add event listener for real-time updates
            skillInput.addEventListener('input', (e) => {
                updateSkill(index, (e.target as HTMLInputElement).value);
            });
        });
    }
}

// Create HTML for experience fields
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
                <label for="experienceResponsibilities${index}">Responsibilities (comma separated):</label>
                <textarea id="experienceResponsibilities${index}" name="experienceResponsibilities${index}"></textarea>
            </div>
            <button type="button" onclick="deleteExperience(${index})" class="delete-button">Delete</button>
        </div>
    `;
}

// Create HTML for skill fields
function createSkillField(index: number, skill?: string): string {
    return `
        <div class="skill-group" id="skillGroup${index}">
            <div class="input-group">
                <label for="skill${index}">Skill:</label>
                <input type="text" id="skill${index}" name="skill${index}" value="${skill ? skill : ""}">
            </div>
            <button type="button" onclick="deleteSkill(${index})" class="delete-button">Delete</button>
        </div>
    `;
}

// Update functions for real-time synchronization
function updateSkill(index: number, value: string) {
    resumeData.skills[index] = value;
    saveResumeData();
    updateResumeTemplate();
}

function updateExperienceField(index: number, field: keyof Job, value: string | string[]) {
    resumeData.workExperience[index][field] = value as any;
    saveResumeData();
    updateResumeTemplate();
}

// Functions to add and delete skills and experiences
function addExperience() {
    resumeData.workExperience.push({
        title: '',
        company: '',
        date: '',
        responsibilities: []
    });
    renderForm();
    saveResumeData();
}

function deleteExperience(index: number) {
    resumeData.workExperience.splice(index, 1);
    renderForm();
    saveResumeData();
}

function addSkill() {
    resumeData.skills.push('');
    renderForm();
    saveResumeData();
}

function deleteSkill(index: number) {
    resumeData.skills.splice(index, 1);
    renderForm();
    saveResumeData();
}

// Update resume template with current data
function updateResumeTemplate() {
    const resumeTemplate = generateResumeTemplate(resumeData);
    const resumeContainer = document.getElementById('resume');
    if (resumeContainer) {
        resumeContainer.innerHTML = resumeTemplate;
    }
}

// Initialize form on document ready
function initializeForm() {
    loadResumeData(); // Load data from local storage
    renderForm();     // Render form with current data
    updateResumeTemplate();

    const form = document.getElementById('resumeForm') as HTMLFormElement;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        // Update resumeData with basic information
        resumeData.name = formData.get('name') as string;
        resumeData.profession = formData.get('profession') as string;
        resumeData.email = formData.get('email') as string;
        resumeData.phone = formData.get('phone') as string;
        resumeData.location = formData.get('location') as string;
        resumeData.website = formData.get('website') as string;
        resumeData.summary = formData.get('summary') as string;

        // Update education data
        resumeData.education.degree = (document.getElementById('educationDegree') as HTMLInputElement).value;
        resumeData.education.school = (document.getElementById('educationSchool') as HTMLInputElement).value;
        resumeData.education.date = (document.getElementById('educationDate') as HTMLInputElement).value;

        // Update work experience data
        resumeData.workExperience = [];
        document.querySelectorAll('.work-experience-group').forEach((group, index) => {
            const title = (group.querySelector(`#experienceTitle${index}`) as HTMLInputElement).value;
            const company = (group.querySelector(`#experienceCompany${index}`) as HTMLInputElement).value;
            const date = (group.querySelector(`#experienceDate${index}`) as HTMLInputElement).value;
            const responsibilities = (group.querySelector(`#experienceResponsibilities${index}`) as HTMLTextAreaElement).value.split(',').map(r => r.trim());

            resumeData.workExperience.push({
                title,
                company,
                date,
                responsibilities
            });
        });

        // Update skills data
        resumeData.skills = [];
        document.querySelectorAll('.skill-group').forEach((group, index) => {
            const skill = (group.querySelector(`#skill${index}`) as HTMLInputElement).value;
            resumeData.skills.push(skill);
        });

        saveResumeData();
        updateResumeTemplate();
    });

    document.querySelectorAll('.section-toggle').forEach(toggle => {
        toggle.addEventListener('click', toggleFormSection);
    });

    const toggleFormButton = document.getElementById('toggleForm');
    toggleFormButton?.addEventListener('click', () => {
        const formContainer = document.getElementById('form');
        formContainer?.classList.toggle('hidden');
    });
}

// Toggle form sections
function toggleFormSection(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('section-toggle')) {
        const content = target.nextElementSibling as HTMLElement;
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
        target.querySelector('i')?.classList.toggle('fa-chevron-down');
        target.querySelector('i')?.classList.toggle('fa-chevron-up');
    }
}

// Initialize the form on page load
document.addEventListener('DOMContentLoaded', initializeForm);
(window as any).addExperience = addExperience;
(window as any).deleteExperience = deleteExperience;
(window as any).addSkill = addSkill;
(window as any).deleteSkill = deleteSkill;

document.getElementById('color')?.addEventListener('change', (e) => {
    const color = (e.target as HTMLInputElement).value;
    const roottheme = document.querySelector(':root') as HTMLElement;
    roottheme.style.setProperty('--primary-color', color);
});

document.getElementById('profilePicture')?.addEventListener('change', (e) => {
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
