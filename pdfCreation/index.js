const User = require("../models/userModel");
const {
  findCourse,
  findCourseSubjects,
} = require("./../controllers/courseController");

const puppeteer = require("puppeteer");
const coverPage = require("./htmlComponents/coverpage");
const msgPrefacePage = require("./htmlComponents/mesage-preface");
const committeeContentPage = require("./htmlComponents/committee-content");
const basicInfoPage = require("./htmlComponents/basicInfo");
const categoriesPage = require("./htmlComponents/categories");
const semestersPage = require("./htmlComponents/semester");
const Resource = require("../models/resourceModel");

// Function to convert course data to HTML
async function generateHTML(commonId, next) {
  const course = await findCourse({ commonId, next });
  const committee = await User.find({
    "courses.id": { $in: [commonId] },
  }).setOptions({ skipPostHook: true });

  const subjects = await findCourseSubjects({ commonId, next });
  let referenceIds = await subjects.map((el) => {
    const ids = el.doc.referenceMaterial?.cur?.map((el) => el.cur);
    return ids;
  });
  referenceIds = referenceIds.flat().filter((el) => el);
  const resourse = await Resource.find({ _id: { $in: referenceIds } }).select(
    "title author"
  );

  const semesters = {};
  for (let semNo in course.semesters) {
    semesters[semNo] = [];
    for (let i in course.semesters[semNo]) {
      const sub = subjects.find(
        (sub) =>
          sub.doc.common_id?.toString() ===
          course.semesters[semNo][i]?.cur?.common_id?.toString()
      );

      for (let i in sub.doc.referenceMaterial?.cur) {
        sub.doc.referenceMaterial.cur[i] = resourse.find(
          (r) =>
            r._id.toString() ===
            sub.doc.referenceMaterial?.cur[i]?.cur.toString()
        );
      }
      semesters[semNo].push({});
      semesters[semNo][i].cur = course.semesters[semNo][i].cur;
      semesters[semNo][i].sub = sub.doc;
    }
  }
  // console.log(semesters['1'])

  let html = `
    <!DOCTYPE >
    <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="AICTE" />
      <style>
        ${STYLE}
      </style>
    </head>
    <body>
        ${coverPage({ title: course.title, level: course.level })}
        ${msgPrefacePage({
          message: course?.message,
          preface: course?.preface,
        })}
        ${committeeContentPage({ committee })}
        ${basicInfoPage({
          definitionOfCredits: course.definitionOfCredits,
          codesAndDef: course.codesAndDef,
          rangeOfCredits: course.rangeOfCredits,
        })}
        ${categoriesPage({ categories: course?.categories })}
        ${semestersPage({ semesters })}
    </body>
    </html>
    `;
  return html;
}
exports.generateHTML = generateHTML;

// Function to generate PDF from HTML using Puppeteer

exports.generatePDF = async function (commonId, res, next) {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/usr/bin/chromium-browser",
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--no-zygote',
      // '--single-process',
    ],
  });

  const page = await browser.newPage({ timeout: 60000 });
  const html = await generateHTML(commonId, next);
  await page.setContent(html);

  // Generate the PDF as a readable stream
  // const pdfStream = await page.createPDFStream({
  //   format: "A4"
  // })

  const pdf = await page.pdf({
    // path:"./course.pdf" ,
    format: "A4",
  });
  await browser.close();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'inline; filename="output.pdf"');
  res.status(200).type("pdf").send(pdf);
};

const STYLE = `
* {
    margin: 0;
    padding: 0;
    text-indent: 0;
  }

  .s1 {
    color: #006FC0;
    font-family: Cambria, serif;
    font-style: italic;
    font-weight: bold;
    text-decoration: none;
    font-size: 12pt;
  }

  .s2 {
    color: #FFF;
    font-family: Calibri, sans-serif;
    font-style: normal;
    font-weight: bold;
    text-decoration: none;
    font-size: 31pt;
  }

  h1 {
    color: #FFF;
    font-family: Calibri, sans-serif;
    font-style: normal;
    font-weight: bold;
    text-decoration: none;
    font-size: 48pt;
  }

  .s3 {
    color: #FFF;
    font-family: Calibri, sans-serif;
    font-style: normal;
    font-weight: bold;
    text-decoration: none;
    font-size: 28pt;
  }

  .s4 {
    color: #FFF;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: normal;
    text-decoration: none;
    font-size: 24pt;
  }

  .s7 {
    color: #FFF;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: normal;
    text-decoration: none;
    font-size: 20pt;
  }

  h2 {
    color: #006FC0;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: bold;
    text-decoration: none;
    font-size: 36pt;
  }

  .s8 {
    color: #006FC0;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: bold;
    text-decoration: underline;
    font-size: 36pt;
  }

  .s9 {
    color: #006FC0;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: bold;
    text-decoration: none;
    font-size: 16pt;
  }

  .s10 {
    color: #00F;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: bold;
    text-decoration: underline;
    font-size: 16pt;
  }

  .s11 {
    color: black;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: bold;
    text-decoration: none;
    font-size: 13pt;
  }

  .s12 {
    color: black;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: normal;
    text-decoration: none;
    font-size: 13pt;
  }

  .s13 {
    color: black;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: normal;
    text-decoration: none;
    font-size: 8.5pt;
    vertical-align: 3pt;
  }

  .s14 {
    color: black;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: bold;
    text-decoration: none;
    font-size: 16pt;
  }

  .s15 {
    color: black;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: bold;
    text-decoration: none;
    font-size: 12pt;
  }

  .s16 {
    color: black;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: normal;
    text-decoration: none;
    font-size: 12pt;
  }

  .s17 {
    color: #212121;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: normal;
    text-decoration: none;
    font-size: 12pt;
  }

  .s18 {
    color: black;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: bold;
    text-decoration: none;
    font-size: 14pt;
  }

  .s19 {
    color: #006FC0;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: bold;
    text-decoration: none;
    font-size: 26pt;
  }

  .s20 {
    color: black;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: bold;
    text-decoration: none;
    font-size: 12pt;
  }

  .p,
  p {
    color: black;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: normal;
    text-decoration: none;
    font-size: 12pt;
    margin: 0pt;
  }

  .s21 {
    color: #010202;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: normal;
    text-decoration: none;
    font-size: 12pt;
  }

  .s22 {
    color: #010202;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: bold;
    text-decoration: none;
    font-size: 12pt;
  }

  .s24 {
    color: #010202;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: bold;
    text-decoration: none;
    font-size: 11pt;
  }

  .s25 {
    color: black;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: bold;
    text-decoration: none;
    font-size: 11pt;
  }

  .s26 {
    color: black;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: bold;
    text-decoration: none;
    font-size: 7pt;
    vertical-align: 2pt;
  }

  .s27 {
    color: #010202;
    font-family: Cambria, serif;
    font-style: italic;
    font-weight: normal;
    text-decoration: none;
    font-size: 11pt;
  }

  .s28 {
    color: #221F1F;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: bold;
    text-decoration: none;
    font-size: 12pt;
  }

  .s29 {
    color: #221F1F;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: normal;
    text-decoration: none;
    font-size: 12pt;
  }

  a {
    color: #00F;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: normal;
    text-decoration: underline;
    font-size: 12pt;
  }

  h4 {
    color: #006FC0;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: bold;
    text-decoration: none;
    font-size: 28pt;
  }

  .s38 {
    color: black;
    font-family: Calibri, sans-serif;
    font-style: normal;
    font-weight: bold;
    text-decoration: none;
    font-size: 11pt;
  }

  li {
    display: block;
  }

  #l2 {
    padding-left: 0pt;
    counter-reset: d1 1;
  }

  #l2>li>*:first-child:before {
    counter-increment: d1;
    content: counter(d1, upper-latin)". ";
    color: black;
    font-style: normal;
    font-weight: normal;
    text-decoration: none;
  }

  #l2>li:first-child>*:first-child:before {
    counter-increment: d1 0;
  }

  #l5 {
    padding-left: 0pt;
    counter-reset: e1 1;
  }

  #l5>li>*:first-child:before {
    counter-increment: e1;
    content: "(" counter(e1, lower-roman)") ";
    color: black;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: normal;
    text-decoration: none;
    font-size: 12pt;
  }

  #l5>li:first-child>*:first-child:before {
    counter-increment: e1 0;
  }

  #l27 {
    padding-left: 0pt;
    counter-reset: z1 1;
  }

  #l27>li>*:first-child:before {
    counter-increment: z1;
    content: counter(z1, decimal)". ";
    color: black;
    font-family: Cambria, serif;
    font-style: normal;
    font-weight: normal;
    text-decoration: none;
    font-size: 12pt;
  }

  #l27>li:first-child>*:first-child:before {
    counter-increment: z1 0;
  }

  #l28 {
    padding-left: 0pt;
  }

  #l28>li>*:first-child:before {
    content: "● ";
    color: black;
    font-family: "Times New Roman", serif;
    font-style: normal;
    font-weight: normal;
    text-decoration: none;
    font-size: 12pt;
  }

  .page-break{
    page-break-before: always;
    page-break-after: always;
  }

  .page-margin{
    page-break-before: always;
  }

  @page {
    margin: 1.5cm;
  }

  table,
  tbody {
    vertical-align: top;
    overflow: visible;
    page-break-inside: avoid;
    margin-block:18pt
  }
  td{
    padding-inline: 6pt;
    padding-block: 4pt;
  }
`;
