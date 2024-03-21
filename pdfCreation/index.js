// const style = require("./htmlComponents/style");

// const HTML = `
//     <!DOCTYPE html>
//     <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Curriculum</title>
//         ${style}
//       </head>
//       <body>
//         <p class="secondary-heading">Table of Content</p>
        
//       </body>
//     </html>
// `;

const puppeteer = require('puppeteer');

// Function to convert course data to HTML
function generateHTML(courseData) {
    let html = `
        <html>
            <head>
                <style>
                    /* Add your CSS styles here */
                </style>
            </head>
            <body>
                <h1>${courseData.title}</h1>
                <p><strong>Program:</strong> ${courseData.program}</p>
                <p><strong>Level:</strong> ${courseData.level}</p>
                <p><strong>Message:</strong> ${courseData.message}</p>
                <p><strong>Preface:</strong> ${courseData.preface}</p>
                <p><strong>Acknowledgement:</strong> ${courseData.acknowledgement}</p>
                <p><strong>Committee:</strong> ${courseData.committee.join(', ')}</p>
                <p><strong>Definition of Credits:</strong></p>
                <ul>
    `;

    courseData.definitionOfCredits.forEach(credit => {
        html += `<li>${credit.activity}: ${credit.overallCredits}</li>`;
    });

    html += `
                </ul>
                <p><strong>Range of Credits:</strong> ${courseData.rangeOfCredits}</p>
                <p><strong>Guidelines:</strong></p>
                <ul>
    `;

    courseData.guidlines.forEach(guideline => {
        html += `<li>${guideline}</li>`;
    });

    html += `
                </ul>
                <p><strong>Codes and Definitions:</strong></p>
                <ul>
    `;

    courseData.codesAndDef.forEach(codeDef => {
        html += `<li>${codeDef.code}: ${codeDef.definition}</li>`;
    });

    html += `
                </ul>
                <p><strong>Subjects:</strong></p>
                <ul>
    `;

    courseData.subjects.forEach(subject => {
        html += `
            <li>
                <p><strong>Title:</strong> ${subject.title}</p>
                <p><strong>Credits:</strong> ${subject.credits}</p>
                <p><strong>L:</strong> ${subject.l}</p>
                <p><strong>T:</strong> ${subject.t}</p>
                <p><strong>P:</strong> ${subject.p}</p>
                <p><strong>Category:</strong> ${subject.category}</p>
                <p><strong>Code:</strong> ${subject.code}</p>
                <p><strong>Semester:</strong> ${subject.semester}</p>
                <p><strong>Weekly Hours:</strong> ${subject.weeklyHours}</p>
            </li>
        `;
    });

    html += `
                </ul>
                <p><strong>Date of Committee:</strong> ${courseData.dateOfCommit}</p>
            </body>
        </html>
    `;

    return html;
}

// Function to generate PDF from HTML using Puppeteer
async function generatePDF(html) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html);
    await page.pdf({ path: 'course.pdf', format: 'A4' });

    await browser.close();
}
