
import { generateResumeTemplate } from './templates';
// Define interfaces for resume data
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
console.log("kuch Nazar Aaya to mujhe message karo")
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

// Initialize resume data
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

// Load resume data from localStorage
function loadResumeData(): void {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
        resumeData = JSON.parse(savedData) as ResumeData;
        // Ensure picture is handled as a data URL
        if (resumeData.picture && typeof resumeData.picture === 'string') {
            resumeData.picture = resumeData.picture;
        }
    }
updateResumeTemplate()
}

// Save resume data to localStorage
function saveResumeData(): void {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
}

// Update resume template and render it
function updateResumeTemplate(): void {
    const resumeContainer = document.getElementById('resume');
    if (resumeContainer) {
        resumeContainer.innerHTML = generateResumeTemplate(resumeData);
        addEditableListeners();
    }
}

// Add event listeners for editable elements
function addEditableListeners(): void {
    const editableElements = document.querySelectorAll('[data-field]');
    editableElements.forEach(element => {
        element.setAttribute('contenteditable', 'true');
        element.addEventListener('blur', handleEdit);
        // @ts-ignore - TypeScript doesn't recognize the event type correctly here
        element.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                (e.target as HTMLElement).blur();
            }
        });
    });
}

// Handle editing of fields
function handleEdit(e: Event): void {
    const target = e.target as HTMLElement;
    const field = target.getAttribute('data-field');
    if (field) {
        updateResumeField(field, target.textContent || '');
        debouncedUpdateResumeTemplate();
    }
}

// Debounce function to limit update frequency
const debouncedUpdateResumeTemplate = debounce(() => {
    updateResumeTemplate();
}, 500); // Adjust the delay time as needed

// Update a specific field in resume data
function updateResumeField(field: string, value: string): void {
    const keys = field.split('.');
    let obj: any = resumeData;
    for (let i = 0; i < keys.length - 1; i++) {
        // @ts-ignore - Dynamic access of nested properties
        if (keys[i].includes('[')) {
            const [arrayName, indexStr] = keys[i].split('[');
            const index = parseInt(indexStr.replace(']', ''), 10);
            obj = obj[arrayName][index];
        } else {
            obj = obj[keys[i]];
        }
    }
    const lastKey = keys[keys.length - 1];
    // @ts-ignore - Dynamic access of nested properties
    if (lastKey.includes('[')) {
        const [arrayName, indexStr] = lastKey.split('[');
        const index = parseInt(indexStr.replace(']', ''), 10);
        obj[arrayName][index] = value;
    } else {
        obj[lastKey] = value;
    }
    saveResumeData();
}

// Add new work experience entry
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

// Add new skill entry
function addSkill(): void {
    resumeData.skills.push('New Skill');
    renderForm();
    saveResumeData();
    updateResumeTemplate();
}

// Initialize form with existing data and setup event listeners
function initializeForm(): void {
    loadResumeData();
    renderForm();
    updateResumeTemplate();

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

// Render form fields based on resume data
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
            document.getElementById(`skill${index}`)?.addEventListener('input', (e) => {
                updateSkillField(index, (e.target as HTMLInputElement).value);
            });
        });
    }
}

// Create form fields for experience
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

// Create form fields for skills
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

// Update a specific field in work experience
function updateExperienceField(index: number, field: keyof WorkExperience, value: string | string[]): void {
    if (index >= 0 && index < resumeData.workExperience.length) {
        const experience = resumeData.workExperience[index];
        // @ts-ignore
        experience[field] = value;
        saveResumeData();
        updateResumeTemplate();
    }
}

// Update a specific skill
function updateSkillField(index: number, value: string): void {
    if (index >= 0 && index < resumeData.skills.length) {
        resumeData.skills[index] = value;
        saveResumeData();
        updateResumeTemplate();
    }
}

// Delete a work experience
function deleteExperience(index: number): void {
    if (index >= 0 && index < resumeData.workExperience.length) {
        resumeData.workExperience.splice(index, 1);
        renderForm();
        saveResumeData();
        updateResumeTemplate();
    }
}

// Delete a skill
function deleteSkill(index: number): void {
    if (index >= 0 && index < resumeData.skills.length) {
        resumeData.skills.splice(index, 1);
        renderForm();
        saveResumeData();
        updateResumeTemplate();
    }
}

// Helper function to create a debounced version of a function
function debounce(func: Function, wait: number): Function {
    let timeout: ReturnType<typeof setTimeout>;
    return function(this: any, ...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Initialize everything on page load
function initialize(): void {
    initializeForm();
}

// Mount functions to the window object
// @ts-ignore
window.addExperience = addExperience;
// @ts-ignore
window.addSkill = addSkill;
// @ts-ignore
window.deleteSkill = deleteSkill;
// @ts-ignore
window.deleteExperience = deleteExperience;
// @ts-ignore
window.initialize = initialize;

// Run initialization
initialize();

// Add these event listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeForm();

    document.querySelectorAll('.section-toggle').forEach(toggle => {
        toggle.addEventListener('click', toggleFormSection);
    });

    document.querySelectorAll('[contenteditable="true"]').forEach(element => {
        element.addEventListener('input', () => {
            const sanitizedValue = (element.textContent || '').replace(/[^a-zA-Z0-9\s]/g, '');
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
// update primary color

document.getElementById('color')?.addEventListener('change', (e) => {
    const color = (e.target as HTMLInputElement).value;
    const roottheme = document.querySelector(':root') as HTMLElement;
    roottheme.style.setProperty('--primary-color', color);
});


const sdk = new Appwrite.Client();
sdk.setEndpoint("https://cloud.appwrite.io/v1")
.setProject("66dd215600334796bc22")
// Your Appwrite endpoint
const storage = new Appwrite.Storage(sdk);

// Handle Generate PDF button click
document.getElementById("generatePDF")!.addEventListener("click", async () => {
    const loader = document.getElementById("loader")!;
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    const uploadButton = document.getElementById("uploadButton")!;
    const shareableLink = document.getElementById("shareableLink") as HTMLInputElement;
    const copyLinkButton = document.getElementById("copyLinkButton")!;
    const uploadStatus = document.getElementById("uploadStatus")!;

    loader.style.display = "block";
    uploadButton.style.display = "none";
    shareableLink.style.display = "none";
    copyLinkButton.style.display = "none";
    uploadStatus.style.display = "none";

    try {
        const element = document.querySelector(".resume-wrapper")!;
        const username = (document.getElementById("name") as HTMLInputElement).value || "user";
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const fileName = `${username}-resume-${timestamp}.pdf`;

        if (typeof html2canvas === "undefined") {
            throw new Error("html2canvas is not loaded");
        }

        const canvas = await html2canvas(element);
// @ts-ignore
        if (typeof window.jspdf === "undefined") {
            throw new Error("jspdf is not loaded");
        }
// @ts-ignore
        const { jsPDF } = window.jspdf;

        // Set the PDF to A4 size
// @ts-ignore
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        const imgData = canvas.toDataURL("image/png");
        const imgProps = pdf.getImageProperties(imgData);

        // Calculate scaling to fit the image within A4 dimensions while maintaining aspect ratio
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const widthRatio = pdfWidth / imgProps.width;
        const heightRatio = pdfHeight / imgProps.height;
        const scale = Math.min(widthRatio, heightRatio);

        const scaledWidth = imgProps.width * scale;
        const scaledHeight = imgProps.height * scale;

        // Center the image on the page
        const x = (pdfWidth - scaledWidth) / 2;
        const y = (pdfHeight - scaledHeight) / 2;

        // Add the image to the PDF
        pdf.addImage(imgData, "PNG", x, y, scaledWidth, scaledHeight);

        // Save the PDF
        pdf.save(fileName);

        const file = new File([pdf.output("blob")], fileName, { type: "application/pdf" });
        const result = await storage.createFile(
            "66dec1400021ed45f67e", // Replace with your bucket ID
            Appwrite.ID.unique(),
            file
        );

        const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/66dec1400021ed45f67e/files/${result.$id}/view?project=66dec004002cacc7608a`;
        localStorage.setItem("resumePDFUrl", fileUrl);

        loader.style.display = "none";
        uploadButton.style.display = "block";
        shareableLink.style.display = "block";
        copyLinkButton.style.display = "block";
        uploadStatus.style.display = "block";
        shareableLink.value = fileUrl;
        uploadStatus.innerText = "File uploaded successfully!";
    } catch (error) {
        console.error("Error:", error);
        loader.style.display = "none";
        uploadStatus.style.display = "block";
        uploadStatus.innerText = "An error occurred. Please try again.";
    }
});

// Handle Upload PDF button click
document.getElementById("uploadButton")!.addEventListener("click", async () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;
    const uploadStatus = document.getElementById("uploadStatus")!;
    const shareableLink = document.getElementById("shareableLink") as HTMLInputElement;

    if (file) {
        try {
            const result = await storage.createFile(
                "66dd217e00339b050ccd", // Replace with your bucket ID
                Appwrite.ID.unique(),
                file
            );
            const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/66dd217e00339b050ccd/files/${result.$id}/view?project=66dd215600334796bc22`;
            localStorage.setItem("resumePDFUrl", fileUrl);

            shareableLink.value = fileUrl;
            uploadStatus.innerText = "File uploaded successfully!";
        } catch (error) {
            console.error("Error uploading file:", error);
            uploadStatus.innerText = "Error uploading file.";
        }
    }
});

// Handle Copy Link button click
document.getElementById("copyLinkButton")!.addEventListener("click", () => {
    const shareableLink = document.getElementById("shareableLink") as HTMLInputElement;
    shareableLink.select();
    document.execCommand("copy");
    alert("Link copied to clipboard!");
});

// Initialize modal and handle visibility
document.getElementById("showDialogButton")!.addEventListener("click", () => {
    showPdfDialog();
    const fileUrl = localStorage.getItem("resumePDFUrl");
    if (fileUrl) {
        const shareableLink = document.getElementById("shareableLink") as HTMLInputElement;
        shareableLink.value = fileUrl;
    }
});


// PDF dialog functions
const showPdfDialog = () => {
    document.getElementById("dialog")!.style.display = "block";
};

const hidePdfDialog = () => {
    document.getElementById("dialog")!.style.display = "none";
};

// Template dialog functions


// Update event listeners
document.getElementById("showDialogButton")?.addEventListener("click", showPdfDialog);
document.getElementById("closeDialog")?.addEventListener("click", hidePdfDialog);

// Function to get resume data
function getResumeData(): ResumeData {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
        return JSON.parse(savedData) as ResumeData;
    } else {
        return {
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
            skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL'],
            picture: ''
        };
    }
}

// Apply template based on selection
