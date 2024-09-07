var _a;
import { generateResumeTemplate } from './templates.js';
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
        school: 'University of Technology',
        date: 'Graduated May 2018'
    },
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL']
};
function loadResumeData() {
    var savedData = localStorage.getItem('resumeData');
    if (savedData) {
        resumeData = JSON.parse(savedData);
        // Ensure picture is handled as a data URL
        if (resumeData.picture && typeof resumeData.picture === 'string') {
            resumeData.picture = resumeData.picture;
        }
    }
}
function saveResumeData() {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
}
function updateResumeTemplate() {
    var resumeContainer = document.getElementById('resume');
    if (resumeContainer) {
        resumeContainer.innerHTML = generateResumeTemplate(resumeData);
        addEditableListeners();
    }
}
function addEditableListeners() {
    var editableElements = document.querySelectorAll('[data-field]');
    editableElements.forEach(function (element) {
        element.setAttribute('contenteditable', 'true');
        element.addEventListener('blur', handleEdit);
        // @ts-ignore
        element.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                e.target.blur();
            }
        });
    });
}
function handleEdit(e) {
    var target = e.target;
    var field = target.getAttribute('data-field');
    if (field) {
        updateResumeField(field, target.textContent || '');
        debouncedUpdateResumeTemplate();
    }
}
var debouncedUpdateResumeTemplate = debounce(function () {
    updateResumeTemplate();
}, 500); // Adjust the delay time as needed
function updateResumeField(field, value) {
    var keys = field.split('.');
    var obj = resumeData;
    for (var i = 0; i < keys.length - 1; i++) {
        // @ts-ignore
        if (keys[i].includes('[')) {
            var _a = keys[i].split('['), arrayName = _a[0], indexStr = _a[1];
            var index = parseInt(indexStr.replace(']', ''), 10);
            obj = obj[arrayName][index];
        }
        else {
            obj = obj[keys[i]];
        }
    }
    var lastKey = keys[keys.length - 1];
    // @ts-ignore
    if (lastKey.includes('[')) {
        var _b = lastKey.split('['), arrayName = _b[0], indexStr = _b[1];
        var index = parseInt(indexStr.replace(']', ''), 10);
        obj[arrayName][index] = value;
    }
    else {
        obj[lastKey] = value;
    }
    saveResumeData();
}
function addExperience() {
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
function addSkill() {
    resumeData.skills.push('New Skill');
    renderForm();
    saveResumeData();
    updateResumeTemplate();
}
function initializeForm() {
    var _a, _b;
    loadResumeData();
    renderForm();
    updateResumeTemplate();
    // Add event listeners for editable elements
    document.addEventListener('input', handleEdit);
    (_a = document.getElementById('addExperience')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', addExperience);
    (_b = document.getElementById('addSkill')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', addSkill);
    var form = document.getElementById('resumeForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var formData = new FormData(form);
        // Update resumeData with basic information
        resumeData.name = formData.get('name') || '';
        resumeData.profession = formData.get('profession') || '';
        resumeData.email = formData.get('email') || '';
        resumeData.phone = formData.get('phone') || '';
        resumeData.location = formData.get('location') || '';
        resumeData.website = formData.get('website') || '';
        resumeData.summary = formData.get('summary') || '';
        // Update education
        resumeData.education.degree = formData.get('educationDegree') || '';
        resumeData.education.school = formData.get('educationSchool') || '';
        resumeData.education.date = formData.get('educationDate') || '';
        saveResumeData();
        updateResumeTemplate();
    });
}
document.querySelectorAll('.section-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', toggleFormSection);
});
var toggleFormButton = document.getElementById('toggleForm');
toggleFormButton === null || toggleFormButton === void 0 ? void 0 : toggleFormButton.addEventListener('click', function () {
    var formContainer = document.getElementById('form');
    formContainer === null || formContainer === void 0 ? void 0 : formContainer.classList.toggle('hidden');
});
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
        });
    }
}
function createExperienceField(index) {
    return "\n        <div class=\"work-experience-group\" id=\"experience".concat(index, "\">\n            <div class=\"input-group\">\n                <label for=\"experienceTitle").concat(index, "\">Title:</label>\n                <input type=\"text\" id=\"experienceTitle").concat(index, "\" name=\"experienceTitle").concat(index, "\">\n            </div>\n            <div class=\"input-group\">\n                <label for=\"experienceCompany").concat(index, "\">Company:</label>\n                <input type=\"text\" id=\"experienceCompany").concat(index, "\" name=\"experienceCompany").concat(index, "\">\n            </div>\n            <div class=\"input-group\">\n                <label for=\"experienceDate").concat(index, "\">Date:</label>\n                <input type=\"text\" id=\"experienceDate").concat(index, "\" name=\"experienceDate").concat(index, "\">\n            </div>\n            <div class=\"input-group\">\n                <label for=\"experienceResponsibilities").concat(index, "\">Responsibilities:</label>\n                <textarea id=\"experienceResponsibilities").concat(index, "\" name=\"experienceResponsibilities").concat(index, "\"></textarea>\n            </div>\n            <button type=\"button\" onclick=\"deleteExperience(").concat(index, ")\" class=\"delete-button\">Delete</button>\n        </div>\n    ");
}
function createSkillField(index, skill) {
    return "\n        <div class=\"skill-group\" id=\"skillGroup".concat(index, "\">\n            <div class=\"input-group\">\n                <label for=\"skill").concat(index, "\">Skill:</label>\n                <input type=\"text\" id=\"skill").concat(index, "\" name=\"skill").concat(index, "\" value=\"").concat(skill || '', "\">\n            </div>\n            <button type=\"button\" onclick=\"deleteSkill(").concat(index, ")\" class=\"delete-button\">Delete</button>\n        </div>\n    ");
}
function updateExperienceField(index, field, value) {
    if (index >= 0 && index < resumeData.workExperience.length) {
        var experience = resumeData.workExperience[index];
        experience[field] = value;
        saveResumeData();
        updateResumeTemplate();
    }
}
function updateSkill(index, value) {
    if (index >= 0 && index < resumeData.skills.length) {
        resumeData.skills[index] = value;
        saveResumeData();
        updateResumeTemplate();
    }
}
function deleteExperience(index) {
    if (index >= 0 && index < resumeData.workExperience.length) {
        resumeData.workExperience.splice(index, 1);
        renderForm();
        saveResumeData();
        updateResumeTemplate();
    }
}
function deleteSkill(index) {
    if (index >= 0 && index < resumeData.skills.length) {
        resumeData.skills.splice(index, 1);
        renderForm();
        saveResumeData();
        updateResumeTemplate();
    }
}
function debounce(func, wait) {
    var timeout = null;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var context = this;
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(function () { return func.apply(context, args); }, wait);
    };
}
document.addEventListener('DOMContentLoaded', function () {
    initializeForm();
});
document.querySelectorAll('[contenteditable="true"]').forEach(function (element) {
    element.addEventListener('input', function () {
        var sanitizedValue = (element.textContent || '').replace(/[^a-zA-Z0-9\s]/g, ''); // Allow only alphanumeric characters and spaces
        element.textContent = sanitizedValue;
    });
});
(_a = document.getElementById('profilePicture')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function (e) {
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
function toggleFormSection(event) {
    var target = event.target;
    if (target.classList.contains('section-toggle')) {
        var content = target.nextElementSibling;
        if (content) {
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
            var icon = target.querySelector('i');
            icon === null || icon === void 0 ? void 0 : icon.classList.toggle('fa-chevron-down');
            icon === null || icon === void 0 ? void 0 : icon.classList.toggle('fa-chevron-up');
        }
    }
}
