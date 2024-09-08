// Interfaces
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
    skills: string[];
    picture?: string;
}

// Resume Template Generation
export function generateResumeTemplate(data: ResumeData): string {
    return `
        <header>
            <div class="header-content">
                <img id="resumePicture" src="${data.picture || '../../public/default-profile.jpg'}" alt="Profile Picture">
                <div class="header-text">
                    <h1 id="resumeName" data-field="name">${data.name}</h1>
                    <p id="resumeProfession" data-field="profession">${data.profession}</p>
                </div>
            </div>
        </header>

        <main>
            <section class="contact">
                <ul>
                    <li><i class="fas fa-envelope"></i> <span id="resumeEmail" data-field="email">${data.email}</span></li>
                    <li><i class="fas fa-phone"></i> <span id="resumePhone" data-field="phone">${data.phone}</span></li>
                    <li><i class="fas fa-map-marker-alt"></i> <span id="resumeLocation" data-field="location">${data.location}</span></li>
                    <li><i class="fas fa-globe"></i> <a id="resumeWebsite" data-field="website" href="${data.website}">${data.website}</a></li>
                </ul>
            </section>

            <section class="summary">
                <h2>Professional Summary</h2>
                <p id="resumeSummary" data-field="summary">${data.summary}</p>
            </section>

            <section class="experience">
                <h2>Work Experience</h2>
                ${data.workExperience.map((job, index) => generateJobHTML(job, index)).join('')}
            </section>

            <section class="education">
                <h2>Education</h2>
                <div class="degree">
                    <h3 data-field="education.degree">${data.education.degree}</h3>
                    <p class="school" data-field="education.school">${data.education.school}</p>
                    <p class="date" data-field="education.date">${data.education.date}</p>
                </div>
            </section>

            <section class="skills">
                <h2>Skills</h2>
                <ul>
                    ${data.skills.map((skill, index) => `
                        <li data-field="skills[${index}]">${skill}</li>
                    `).join('')}
                </ul>
            </section>
        </main>
    `;
}

function generateJobHTML(job: Job, index: number): string {
    return `
        <div class="job" id="job-${index}">
            <div class="job-header">
                <h3 data-field="workExperience[${index}].title">${job.title}</h3>
                <p class="company" data-field="workExperience[${index}].company">${job.company}</p>
            </div>
            <p class="date" data-field="workExperience[${index}].date">${job.date}</p>
            <ul>
                ${job.responsibilities.map((responsibility, rIndex) => `
                    <li data-field="workExperience[${index}].responsibilities[${rIndex}]">${responsibility}</li>
                `).join('')}
            </ul>
        </div>
    `;
}

// Global Resume Data


export const template2 = (data: ResumeData) => {
    return `
    <div class="resume-template-2">
        <header class="header-content">
            <img id="resumePicture" src="${data.picture || '../../public/default-profile.jpg'}" alt="Profile Picture">
            <div class="header-text">
                <h1 id="resumeName" data-field="name" contenteditable="true">${data.name}</h1>
                <p id="resumeProfession" data-field="profession" contenteditable="true">${data.profession}</p>
            </div>
        </header>

        <main>
            <div class="content-template-2">
                <div class="left-column-template-2">
                    <section class="contact-info-template-2">
                        <h2>Contact</h2>
                        <ul>
                            <li><i class="fas fa-envelope"></i> <span id="resumeEmail" data-field="email" contenteditable="true">${data.email}</span></li>
                            <li><i class="fas fa-phone"></i> <span id="resumePhone" data-field="phone" contenteditable="true">${data.phone}</span></li>
                            <li><i class="fas fa-map-marker-alt"></i> <span id="resumeLocation" data-field="location" contenteditable="true">${data.location}</span></li>
                            <li><i class="fas fa-globe"></i> <a id="resumeWebsite" data-field="website" href="${data.website}" contenteditable="true">${data.website}</a></li>
                        </ul>
                    </section>
                    <section class="section-template-2">
                        <h2>Skills</h2>
                        <div class="skills-list-template-2">
                            ${data.skills.map((skill, index) => `
                                <span class="skill-template-2" data-field="skills[${index}]" contenteditable="true">${skill}</span>
                            `).join('')}
                        </div>
                    </section>
                </div>
                <div class="right-column-template-2">
                    <section class="section-template-2">
                        <h2>Professional Summary</h2>
                        <p id="resumeSummary" data-field="summary" contenteditable="true">${data.summary}</p>
                    </section>
                    <section class="section-template-2">
                        <h2>Work Experience</h2>
                        ${data.workExperience.map((job, index) => `
                            <div class="job-template-2" id="job-${index}">
                                <div class="job-header-template-2">
                                    <h3 data-field="workExperience[${index}].title" contenteditable="true">${job.title}</h3>
                                    <p class="company-template-2" data-field="workExperience[${index}].company" contenteditable="true">${job.company}</p>
                                </div>
                                <p class="date-template-2" data-field="workExperience[${index}].date" contenteditable="true">${job.date}</p>
                                <ul>
                                    ${job.responsibilities.map((responsibility, rIndex) => `
                                        <li data-field="workExperience[${index}].responsibilities[${rIndex}]" contenteditable="true">${responsibility}</li>
                                    `).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </section>
                    <section class="section-template-2">
                        <h2>Education</h2>
                        <div class="degree-template-2">
                            <h3 data-field="education.degree" contenteditable="true">${data.education.degree}</h3>
                            <p class="school-template-2" data-field="education.school" contenteditable="true">${data.education.school}</p>
                            <p class="date-template-2" data-field="education.date" contenteditable="true">${data.education.date}</p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    </div>
    `
}
// Resume Template 4
// Resume Template 4
export const template4 = (data: ResumeData) => {
    return `
    <div class="resume-template-4">
        <header class="header-content">
            <img id="resumePicture" src="${data.picture || '../../public/default-profile.jpg'}" alt="Profile Picture">
            <div class="header-text">
                <h1 id="resumeName" data-field="name">${data.name}</h1>
                <p id="resumeProfession" data-field="profession">${data.profession}</p>
            </div>
        </header>

        <main>
            <section class="overview">
                <h2>Overview</h2>
                <p id="resumeSummary" data-field="summary">${data.summary}</p>
            </section>

            <section class="experience">
                <h2>Experience</h2>
                ${data.workExperience.map((job, index) => generateJobHTML(job, index)).join('')}
            </section>

            <section class="education">
                <h2>Education</h2>
                <div class="degree">
                    <h3 data-field="education.degree">${data.education.degree}</h3>
                    <p class="school" data-field="education.school">${data.education.school}</p>
                    <p class="date" data-field="education.date">${data.education.date}</p>
                </div>
            </section>

            <section class="skills">
                <h2>Skills</h2>
                <div class="skills-grid">
                    ${data.skills.map((skill, index) => `
                        <div class="skill-item" data-field="skills[${index}]">${skill}</div>
                    `).join('')}
                </div>
            </section>
        </main>
    </div>
    `;
}

// Resume Template 3
// Resume Template 3
export const template3 = (data: ResumeData) => {
    return `
    <div class="resume-template-3">
        <header class="header-content">
            <img id="resumePicture" src="${data.picture || '../../public/default-profile.jpg'}" alt="Profile Picture">
            <div class="header-text">
                <h1 id="resumeName" data-field="name">${data.name}</h1>
                <p id="resumeProfession" data-field="profession">${data.profession}</p>
            </div>
        </header>

        <main>
            <section class="contact-info">
                <ul>
                    <li><i class="fas fa-envelope"></i> <span id="resumeEmail" data-field="email">${data.email}</span></li>
                    <li><i class="fas fa-phone"></i> <span id="resumePhone" data-field="phone">${data.phone}</span></li>
                    <li><i class="fas fa-map-marker-alt"></i> <span id="resumeLocation" data-field="location">${data.location}</span></li>
                    <li><i class="fas fa-globe"></i> <a id="resumeWebsite" data-field="website" href="${data.website}">${data.website}</a></li>
                </ul>
            </section>

            <section class="summary">
                <h2>Summary</h2>
                <p id="resumeSummary" data-field="summary">${data.summary}</p>
            </section>

            <section class="experience-education">
                <div class="experience">
                    <h2>Experience</h2>
                    ${data.workExperience.map((job, index) => generateJobHTML(job, index)).join('')}
                </div>

                <div class="education">
                    <h2>Education</h2>
                    <div class="degree">
                        <h3 data-field="education.degree">${data.education.degree}</h3>
                        <p class="school" data-field="education.school">${data.education.school}</p>
                        <p class="date" data-field="education.date">${data.education.date}</p>
                    </div>
                </div>
            </section>

            <section class="skills">
                <h2>Skills</h2>
                <ul>
                    ${data.skills.map((skill, index) => `
                        <li data-field="skills[${index}]">${skill}</li>
                    `).join('')}
                </ul>
            </section>
        </main>
    </div>
    `;
}

// Resume Template 3
