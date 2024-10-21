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
                <img id="resumePicture" src="${data.picture || '/default-profile.jpg'}" alt="Profile Picture">
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
        div class="job" id="job-${index}">
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
        </div><
    `;
}
