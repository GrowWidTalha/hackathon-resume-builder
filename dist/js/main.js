var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b, _c;
// Import necessary functions
import { generateResumeTemplate, template2, template3, template4 } from './templates.js';
// Initialize resume data
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
// Load resume data from localStorage
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
// Save resume data to localStorage
function saveResumeData() {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
}
// Update resume template and render it
function updateResumeTemplate() {
    var resumeContainer = document.getElementById('resume');
    if (resumeContainer) {
        resumeContainer.innerHTML = generateResumeTemplate(resumeData);
        addEditableListeners();
    }
}
// Add event listeners for editable elements
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
// Handle editing of fields
function handleEdit(e) {
    var target = e.target;
    var field = target.getAttribute('data-field');
    if (field) {
        updateResumeField(field, target.textContent || '');
        debouncedUpdateResumeTemplate();
    }
}
// Debounce function to limit update frequency
var debouncedUpdateResumeTemplate = debounce(function () {
    updateResumeTemplate();
}, 500); // Adjust the delay time as needed
// Update a specific field in resume data
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
// Add new work experience entry
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
// Add new skill entry
function addSkill() {
    resumeData.skills.push('New Skill');
    renderForm();
    saveResumeData();
    updateResumeTemplate();
}
// Initialize form with existing data and setup event listeners
function initializeForm() {
    var _a, _b;
    loadResumeData();
    renderForm();
    updateResumeTemplate();
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
// Render form fields based on resume data
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
            var _a;
            skillsInputs.innerHTML += createSkillField(index, skill);
            (_a = document.getElementById("skill".concat(index))) === null || _a === void 0 ? void 0 : _a.addEventListener('input', function (e) {
                updateSkillField(index, e.target.value);
            });
        });
    }
}
// Create form fields for experience
function createExperienceField(index) {
    return "\n        <div class=\"work-experience-group\" id=\"experience".concat(index, "\">\n            <div class=\"input-group\">\n                <label for=\"experienceTitle").concat(index, "\">Title:</label>\n                <input type=\"text\" id=\"experienceTitle").concat(index, "\" name=\"experienceTitle").concat(index, "\">\n            </div>\n            <div class=\"input-group\">\n                <label for=\"experienceCompany").concat(index, "\">Company:</label>\n                <input type=\"text\" id=\"experienceCompany").concat(index, "\" name=\"experienceCompany").concat(index, "\">\n            </div>\n            <div class=\"input-group\">\n                <label for=\"experienceDate").concat(index, "\">Date:</label>\n                <input type=\"text\" id=\"experienceDate").concat(index, "\" name=\"experienceDate").concat(index, "\">\n            </div>\n            <div class=\"input-group\">\n                <label for=\"experienceResponsibilities").concat(index, "\">Responsibilities:</label>\n                <textarea id=\"experienceResponsibilities").concat(index, "\" name=\"experienceResponsibilities").concat(index, "\"></textarea>\n            </div>\n            <button type=\"button\" onclick=\"deleteExperience(").concat(index, ")\" class=\"delete-button\">Delete</button>\n        </div>\n    ");
}
// Create form fields for skills
function createSkillField(index, skill) {
    return "\n        <div class=\"skill-group\" id=\"skillGroup".concat(index, "\">\n            <div class=\"input-group\">\n                <label for=\"skill").concat(index, "\">Skill:</label>\n                <input type=\"text\" id=\"skill").concat(index, "\" name=\"skill").concat(index, "\" value=\"").concat(skill || '', "\">\n            </div>\n            <button type=\"button\" onclick=\"deleteSkill(").concat(index, ")\" class=\"delete-button\">Delete</button>\n        </div>\n    ");
}
// Update a specific field in work experience
function updateExperienceField(index, field, value) {
    if (index >= 0 && index < resumeData.workExperience.length) {
        var experience = resumeData.workExperience[index];
        experience[field] = value;
        saveResumeData();
        updateResumeTemplate();
    }
}
// Update a specific skill
function updateSkillField(index, value) {
    if (index >= 0 && index < resumeData.skills.length) {
        resumeData.skills[index] = value;
        saveResumeData();
        updateResumeTemplate();
    }
}
// Delete a work experience
function deleteExperience(index) {
    if (index >= 0 && index < resumeData.workExperience.length) {
        resumeData.workExperience.splice(index, 1);
        renderForm();
        saveResumeData();
        updateResumeTemplate();
    }
}
// Delete a skill
function deleteSkill(index) {
    if (index >= 0 && index < resumeData.skills.length) {
        resumeData.skills.splice(index, 1);
        renderForm();
        saveResumeData();
        updateResumeTemplate();
    }
}
// Helper function to create a debounced version of a function
function debounce(func, wait) {
    var timeout;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timeout);
        timeout = setTimeout(function () { return func.apply(_this, args); }, wait);
    };
}
// Initialize everything on page load
function initialize() {
    initializeForm();
}
// Mount functions to the window object
window.addExperience = addExperience;
window.addSkill = addSkill;
window.deleteSkill = deleteSkill;
window.deleteExperience = deleteExperience;
window.initialize = initialize;
// Run initialization
initialize();
// Add these event listeners
document.addEventListener('DOMContentLoaded', function () {
    var _a;
    initializeForm();
    document.querySelectorAll('.section-toggle').forEach(function (toggle) {
        toggle.addEventListener('click', toggleFormSection);
    });
    document.querySelectorAll('[contenteditable="true"]').forEach(function (element) {
        element.addEventListener('input', function () {
            var sanitizedValue = (element.textContent || '').replace(/[^a-zA-Z0-9\s]/g, '');
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
// update primary color
(_a = document.getElementById('color')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function (e) {
    var color = e.target.value;
    var roottheme = document.querySelector(':root');
    roottheme.style.setProperty('--primary-color', color);
});
// Initialize Appwrite client
var sdk = new Appwrite.Client();
sdk.setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
    .setProject("66dd215600334796bc22"); // Your project ID
var storage = new Appwrite.Storage(sdk);
// Helper function to display the modal
// Handle Generate PDF button click
document.getElementById("generatePDF").addEventListener("click", function () { return __awaiter(void 0, void 0, void 0, function () {
    var loader, fileInput, uploadButton, shareableLink, copyLinkButton, uploadStatus, element, username, timestamp, fileName, canvas, jsPDF, pdf, imgData, imgProps, pdfWidth, pdfHeight, widthRatio, heightRatio, scale, scaledWidth, scaledHeight, x, y, file, result, fileUrl, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                loader = document.getElementById("loader");
                fileInput = document.getElementById("fileInput");
                uploadButton = document.getElementById("uploadButton");
                shareableLink = document.getElementById("shareableLink");
                copyLinkButton = document.getElementById("copyLinkButton");
                uploadStatus = document.getElementById("uploadStatus");
                loader.style.display = "block";
                uploadButton.style.display = "none";
                shareableLink.style.display = "none";
                copyLinkButton.style.display = "none";
                uploadStatus.style.display = "none";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                element = document.querySelector(".resume-wrapper");
                username = document.getElementById("name").value || "user";
                timestamp = new Date().toISOString().replace(/[:.]/g, "-");
                fileName = "".concat(username, "-resume-").concat(timestamp, ".pdf");
                if (typeof html2canvas === "undefined") {
                    throw new Error("html2canvas is not loaded");
                }
                return [4 /*yield*/, html2canvas(element)];
            case 2:
                canvas = _a.sent();
                if (typeof window.jspdf === "undefined") {
                    throw new Error("jsPDF is not loaded");
                }
                jsPDF = window.jspdf.jsPDF;
                pdf = new jsPDF({
                    orientation: "portrait",
                    unit: "mm",
                    format: "a4"
                });
                imgData = canvas.toDataURL("image/png");
                imgProps = pdf.getImageProperties(imgData);
                pdfWidth = pdf.internal.pageSize.getWidth();
                pdfHeight = pdf.internal.pageSize.getHeight();
                widthRatio = pdfWidth / imgProps.width;
                heightRatio = pdfHeight / imgProps.height;
                scale = Math.min(widthRatio, heightRatio);
                scaledWidth = imgProps.width * scale;
                scaledHeight = imgProps.height * scale;
                x = (pdfWidth - scaledWidth) / 2;
                y = (pdfHeight - scaledHeight) / 2;
                // Add the image to the PDF
                pdf.addImage(imgData, "PNG", x, y, scaledWidth, scaledHeight);
                // Save the PDF
                pdf.save(fileName);
                file = new File([pdf.output("blob")], fileName, { type: "application/pdf" });
                return [4 /*yield*/, storage.createFile("66dd217e00339b050ccd", // Replace with your bucket ID
                    Appwrite.ID.unique(), file)];
            case 3:
                result = _a.sent();
                fileUrl = "https://cloud.appwrite.io/v1/storage/buckets/66dd217e00339b050ccd/files/".concat(result.$id, "/view?project=66dd215600334796bc22");
                localStorage.setItem("resumePDFUrl", fileUrl);
                loader.style.display = "none";
                uploadButton.style.display = "block";
                shareableLink.style.display = "block";
                copyLinkButton.style.display = "block";
                uploadStatus.style.display = "block";
                shareableLink.value = fileUrl;
                uploadStatus.innerText = "File uploaded successfully!";
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error("Error:", error_1);
                loader.style.display = "none";
                uploadStatus.style.display = "block";
                uploadStatus.innerText = "An error occurred. Please try again.";
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Handle Upload PDF button click
document.getElementById("uploadButton").addEventListener("click", function () { return __awaiter(void 0, void 0, void 0, function () {
    var fileInput, file, uploadStatus, shareableLink, result, fileUrl, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fileInput = document.getElementById("fileInput");
                file = fileInput.files ? fileInput.files[0] : null;
                uploadStatus = document.getElementById("uploadStatus");
                shareableLink = document.getElementById("shareableLink");
                if (!file) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, storage.createFile("66dd217e00339b050ccd", // Replace with your bucket ID
                    Appwrite.ID.unique(), file)];
            case 2:
                result = _a.sent();
                fileUrl = "https://cloud.appwrite.io/v1/storage/buckets/66dd217e00339b050ccd/files/".concat(result.$id, "/view?project=66dd215600334796bc22");
                localStorage.setItem("resumePDFUrl", fileUrl);
                shareableLink.value = fileUrl;
                uploadStatus.innerText = "File uploaded successfully!";
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error("Error uploading file:", error_2);
                uploadStatus.innerText = "Error uploading file.";
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Handle Copy Link button click
document.getElementById("copyLinkButton").addEventListener("click", function () {
    var shareableLink = document.getElementById("shareableLink");
    shareableLink.select();
    document.execCommand("copy");
    alert("Link copied to clipboard!");
});
// Initialize modal and handle visibility
document.getElementById("showDialogButton").addEventListener("click", function () {
    showPdfDialog();
    var fileUrl = localStorage.getItem("resumePDFUrl");
    if (fileUrl) {
        var shareableLink = document.getElementById("shareableLink");
        shareableLink.value = fileUrl;
    }
});
// document.getElementById("openTemplateDialogButton")!.addEventListener("click", showPdfDialog);
// document.getElementById("closeDialog")!.addEventListener("click", hidePdfDialog);
// Show the dialog
// Show the dialog
function showDialog() {
    var _a;
    (_a = document.getElementById('templateDialog')) === null || _a === void 0 ? void 0 : _a.style.display = 'block';
}
// Close the dialog
function closeDialog() {
    var _a;
    (_a = document.getElementById('templateDialog')) === null || _a === void 0 ? void 0 : _a.style.display = 'none';
}
// Handle template selection
function selectTemplate(templateName) {
    // Implement logic to switch templates based on selection
    console.log("Selected template: ".concat(templateName));
    // Call a function to apply the selected template to the resume
    applyTemplate(templateName);
    closeDialog();
}
// Attach event listeners
(_b = document.getElementById('openTemplateDialogButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', showDialog);
(_c = document.getElementById('closeDialogButton')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', closeDialog);
var templateButtons = document.querySelectorAll('.template-button');
templateButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        var selectedTemplate = button.getAttribute('data-template');
        applyTemplate(selectedTemplate);
        document.getElementById0("templateDialog").style.display = 'none';
    });
});
// Update these functions for the PDF dialog
var showPdfDialog = function () {
    document.getElementById("dialog").style.display = "block";
};
var hidePdfDialog = function () {
    document.getElementById("dialog").style.display = "none";
};
// Add these functions for the template dialog
var showTemplateDialog = function () {
    document.getElementById("templateDialog").style.display = "block";
};
var hideTemplateDialog = function () {
    document.getElementById("templateDialog").style.display = "none";
};
// Update event listeners
document.getElementById("showDialogButton").addEventListener("click", showPdfDialog);
document.getElementById("closeDialog").addEventListener("click", hidePdfDialog);
document.getElementById("openTemplateDialogButton").addEventListener("click", showTemplateDialog);
document.getElementById("closeTemplateDialog").addEventListener("click", hideTemplateDialog);
// Add template selection S
// const templateButtons = document.querySelectorAll('.template-button');
// templateButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         const selectedTemplate = button.getAttribute('data-template');
//         applyTemplate(selectedTemplate);
//         hideTemplateDialog();
//     });
// });
function getResumeData() {
    // Try to retrieve saved resume data from localStorage
    var savedData = localStorage.getItem('resumeData');
    if (savedData) {
        // Parse and return the saved data if it exists
        return JSON.parse(savedData);
    }
    else {
        // If no saved data, return default resume data
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
function applyTemplate(templateName) {
    var resumeData = getResumeData(); // Implement this function to get current resume data
    var html;
    switch (templateName) {
        case 'template1':
            html = generateResumeTemplate(resumeData);
            break;
        case 'template2':
            html = template2(resumeData);
            break;
        case 'template3':
            html = template3(resumeData);
            break;
        case 'template4':
            html = template4(resumeData);
            break;
        default:
            html = generateResumeTemplate(resumeData); // Default to template1
    }
    document.getElementById('resume').innerHTML = html;
    updateResumeTemplate(); // Call this to ensure all editable fields are set up correctly
}
