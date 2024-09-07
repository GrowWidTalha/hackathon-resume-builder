var _a, _b;
import { generateResumeTemplate } from './templates.js';
// Mock data (initial state)
var resumeData = {
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
    var savedData = localStorage.getItem('resumeData');
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
    Object.keys(resumeData).forEach(function (key) {
        var element = document.getElementById(key);
        if (element && key !== 'workExperience' && key !== 'education' && key !== 'skills') {
            element.value = resumeData[key] || '';
        }
    });
    // Render education
    var educationDegree = document.getElementById('educationDegree');
    var educationSchool = document.getElementById('educationSchool');
    var educationDate = document.getElementById('educationDate');
    if (educationDegree && educationSchool && educationDate) {
        educationDegree.value = resumeData.education.degree;
        educationSchool.value = resumeData.education.school;
        educationDate.value = resumeData.education.date;
    }
    // Render work experience
    var workExperienceInputs = document.getElementById('workExperienceInputs');
    if (workExperienceInputs) {
        workExperienceInputs.innerHTML = '';
        resumeData.workExperience.forEach(function (job, index) {
            var _a, _b, _c, _d;
            workExperienceInputs.innerHTML += createExperienceField(index);
            document.getElementById("experienceTitle".concat(index)).value = job.title;
            document.getElementById("experienceCompany".concat(index)).value = job.company;
            document.getElementById("experienceDate".concat(index)).value = job.date;
            document.getElementById("experienceResponsibilities".concat(index)).value = job.responsibilities.join(', ');
            // Add event listeners for real-time updates
            (_a = document.getElementById("experienceTitle".concat(index))) === null || _a === void 0 ? void 0 : _a.addEventListener('input', function (e) {
                updateExperienceField(index, 'title', e.target.value);
            });
            (_b = document.getElementById("experienceCompany".concat(index))) === null || _b === void 0 ? void 0 : _b.addEventListener('input', function (e) {
                updateExperienceField(index, 'company', e.target.value);
            });
            (_c = document.getElementById("experienceDate".concat(index))) === null || _c === void 0 ? void 0 : _c.addEventListener('input', function (e) {
                updateExperienceField(index, 'date', e.target.value);
            });
            (_d = document.getElementById("experienceResponsibilities".concat(index))) === null || _d === void 0 ? void 0 : _d.addEventListener('input', function (e) {
                updateExperienceField(index, 'responsibilities', e.target.value.split(',').map(function (r) { return r.trim(); }));
            });
        });
    }
    // Render skills
    var skillsInputs = document.getElementById('skillsInputs');
    if (skillsInputs) {
        skillsInputs.innerHTML = '';
        resumeData.skills.forEach(function (skill, index) {
            skillsInputs.innerHTML += createSkillField(index, skill);
            var skillInput = document.getElementById("skill".concat(index));
            skillInput.value = skill;
            // Add event listener for real-time updates
            skillInput.addEventListener('input', function (e) {
                updateSkill(index, e.target.value);
            });
        });
    }
}
// Create HTML for experience fields
function createExperienceField(index) {
    return "\n        <div class=\"work-experience-group\" id=\"experience".concat(index, "\">\n            <div class=\"input-group\">\n                <label for=\"experienceTitle").concat(index, "\">Title:</label>\n                <input type=\"text\" id=\"experienceTitle").concat(index, "\" name=\"experienceTitle").concat(index, "\">\n            </div>\n            <div class=\"input-group\">\n                <label for=\"experienceCompany").concat(index, "\">Company:</label>\n                <input type=\"text\" id=\"experienceCompany").concat(index, "\" name=\"experienceCompany").concat(index, "\">\n            </div>\n            <div class=\"input-group\">\n                <label for=\"experienceDate").concat(index, "\">Date:</label>\n                <input type=\"text\" id=\"experienceDate").concat(index, "\" name=\"experienceDate").concat(index, "\">\n            </div>\n            <div class=\"input-group\">\n                <label for=\"experienceResponsibilities").concat(index, "\">Responsibilities (comma separated):</label>\n                <textarea id=\"experienceResponsibilities").concat(index, "\" name=\"experienceResponsibilities").concat(index, "\"></textarea>\n            </div>\n            <button type=\"button\" onclick=\"deleteExperience(").concat(index, ")\" class=\"delete-button\">Delete</button>\n        </div>\n    ");
}
// Create HTML for skill fields
function createSkillField(index, skill) {
    return "\n        <div class=\"skill-group\" id=\"skillGroup".concat(index, "\">\n            <div class=\"input-group\">\n                <label for=\"skill").concat(index, "\">Skill:</label>\n                <input type=\"text\" id=\"skill").concat(index, "\" name=\"skill").concat(index, "\" value=\"").concat(skill ? skill : "", "\">\n            </div>\n            <button type=\"button\" onclick=\"deleteSkill(").concat(index, ")\" class=\"delete-button\">Delete</button>\n        </div>\n    ");
}
// Update functions for real-time synchronization
function updateSkill(index, value) {
    resumeData.skills[index] = value;
    saveResumeData();
    updateResumeTemplate();
}
function updateExperienceField(index, field, value) {
    resumeData.workExperience[index][field] = value;
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
function deleteExperience(index) {
    resumeData.workExperience.splice(index, 1);
    renderForm();
    saveResumeData();
}
function addSkill() {
    resumeData.skills.push('');
    renderForm();
    saveResumeData();
}
function deleteSkill(index) {
    resumeData.skills.splice(index, 1);
    renderForm();
    saveResumeData();
}
// Update resume template with current data
function updateResumeTemplate() {
    var resumeTemplate = generateResumeTemplate(resumeData);
    var resumeContainer = document.getElementById('resume');
    if (resumeContainer) {
        resumeContainer.innerHTML = resumeTemplate;
    }
}
// Initialize form on document ready
function initializeForm() {
    loadResumeData(); // Load data from local storage
    renderForm(); // Render form with current data
    updateResumeTemplate();
    var form = document.getElementById('resumeForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var formData = new FormData(form);
        // Update resumeData with basic information
        resumeData.name = formData.get('name');
        resumeData.profession = formData.get('profession');
        resumeData.email = formData.get('email');
        resumeData.phone = formData.get('phone');
        resumeData.location = formData.get('location');
        resumeData.website = formData.get('website');
        resumeData.summary = formData.get('summary');
        // Update education data
        resumeData.education.degree = document.getElementById('educationDegree').value;
        resumeData.education.school = document.getElementById('educationSchool').value;
        resumeData.education.date = document.getElementById('educationDate').value;
        // Update work experience data
        resumeData.workExperience = [];
        document.querySelectorAll('.work-experience-group').forEach(function (group, index) {
            var title = group.querySelector("#experienceTitle".concat(index)).value;
            var company = group.querySelector("#experienceCompany".concat(index)).value;
            var date = group.querySelector("#experienceDate".concat(index)).value;
            var responsibilities = group.querySelector("#experienceResponsibilities".concat(index)).value.split(',').map(function (r) { return r.trim(); });
            resumeData.workExperience.push({
                title: title,
                company: company,
                date: date,
                responsibilities: responsibilities
            });
        });
        // Update skills data
        resumeData.skills = [];
        document.querySelectorAll('.skill-group').forEach(function (group, index) {
            var skill = group.querySelector("#skill".concat(index)).value;
            resumeData.skills.push(skill);
        });
        saveResumeData();
        updateResumeTemplate();
    });
    document.querySelectorAll('.section-toggle').forEach(function (toggle) {
        toggle.addEventListener('click', toggleFormSection);
    });
    var toggleFormButton = document.getElementById('toggleForm');
    toggleFormButton === null || toggleFormButton === void 0 ? void 0 : toggleFormButton.addEventListener('click', function () {
        var formContainer = document.getElementById('form');
        formContainer === null || formContainer === void 0 ? void 0 : formContainer.classList.toggle('hidden');
    });
}
// Toggle form sections
function toggleFormSection(event) {
    var _a, _b;
    var target = event.target;
    if (target.classList.contains('section-toggle')) {
        var content = target.nextElementSibling;
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
        (_a = target.querySelector('i')) === null || _a === void 0 ? void 0 : _a.classList.toggle('fa-chevron-down');
        (_b = target.querySelector('i')) === null || _b === void 0 ? void 0 : _b.classList.toggle('fa-chevron-up');
    }
}
// Initialize the form on page load
document.addEventListener('DOMContentLoaded', initializeForm);
window.addExperience = addExperience;
window.deleteExperience = deleteExperience;
window.addSkill = addSkill;
window.deleteSkill = deleteSkill;
(_a = document.getElementById('color')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function (e) {
    var color = e.target.value;
    var roottheme = document.querySelector(':root');
    roottheme.style.setProperty('--primary-color', color);
});
(_b = document.getElementById('profilePicture')) === null || _b === void 0 ? void 0 : _b.addEventListener('change', function (e) {
    var fileInput = e.target;
    if (fileInput.files && fileInput.files[0]) {
        var file = fileInput.files[0];
        var reader_1 = new FileReader();
        reader_1.onload = function () {
            var imageDataUrl = reader_1.result;
            resumeData.picture = imageDataUrl;
            saveResumeData();
            renderForm();
            updateResumeTemplate();
        };
        reader_1.readAsDataURL(file);
    }
});
