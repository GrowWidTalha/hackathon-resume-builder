// Function to generate a resume template

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
    picture?: string; // Add this line
}

export function generateResumeTemplate(data: ResumeData): string {
    return `
    <div class="container" id="resume">
        <header>
            <div class="header-content">
                <img id="resumePicture" src="${data.picture || 'default-profile.png'}" alt="Profile Picture">
                <h1 id="resumeName">${data.name}</h1>
                <p id="resumeProfession">${data.profession}</p>
            </div>
        </header>

        <main>
            <section class="contact">
                <ul>
                    <li><i class="fas fa-envelope"></i><span id="resumeEmail">${data.email}</span></li>
                    <li><i class="fas fa-phone"></i><span id="resumePhone">${data.phone}</span></li>
                    <li><i class="fas fa-map-marker-alt"></i><span id="resumeLocation">${data.location}</span></li>
                    <li><i class="fas fa-globe"></i><a id="resumeWebsite" href="${data.website}">${data.website}</a></li>
                </ul>
            </section>

            <section class="summary">
                <h2>Professional Summary</h2>
                <p id="resumeSummary">${data.summary}</p>
            </section>

            <section class="experience">
                <h2>Work Experience</h2>
                ${data.workExperience.map((job, index) => `
                    <div class="job" id="job-${index}">
                        <div class="job-header">
                            <h3>${job.title}</h3>
                            <p class="company">${job.company}</p>
                        </div>
                        <p class="date">${job.date}</p>
                        <ul>
                            ${job.responsibilities.map((responsibility) => `<li>${responsibility}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </section>

            <section class="education">
                <h2>Education</h2>
                    <div class="degree">
                        <h3>${data.education.degree}</h3>
                        <p class="school">${data.education.school}</p>
                        <p class="date">${data.education.date}</p>
                    </div>
            </section>

            <section class="skills">
                <h2>Skills</h2>
                <ul>
                    ${data.skills.map((skill) => `<li>${skill}</li>`).join('')}
                </ul>
            </section>
        </main>
    </div>
    `;
}


// Export the function for use in other modules
