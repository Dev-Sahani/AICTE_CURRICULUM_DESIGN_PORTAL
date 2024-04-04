module.exports = categories = ({ semesters }) => {
  const experiments = () =>
  `<p class="s20" style="text-align: left;">
    EXPERIMENTS THAT MAY BE PERFORMED THROUGH VIRTUAL LABS:
  </p>
  <p style="padding-top: 6pt;text-align: left;"><br /></p>
  <table style="border-collapse:collapse;" cellspacing="0">
    <tr style="height:25pt">
      <td
        style="width:47pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p class="s15" style="padding-top: 5pt;padding-left: 8pt;text-indent: 0pt;text-align: left;">
          S.No.
        </p>
      </td>
      <td
        style="width:204pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p class="s15" style="padding-top: 5pt;padding-left: 52pt;text-indent: 0pt;text-align: left;">
          Experiment Name
        </p>
      </td>
      <td
        style="width:200pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p class="s15" style="padding-top: 5pt;padding-left: 46pt;text-indent: 0pt;text-align: left;">
          Experiment Link(s)
        </p>
      </td>
    </tr>
    <tr style="height:53pt">
      <td
        style="width:47pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p class="s16" style="padding-top: 5pt;text-indent: 0pt;text-align: center;">
          {1}
        </p>
      </td>
      <td
        style="width:204pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p class="s16" style="padding-top: 5pt;text-align: left;">
          {Determination of surface tension and viscosity.}
        </p>
      </td>
      <td
        style="width:200pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p style="padding-top: 5pt;text-align: left;">
          <a href="{http://pcv-au.vlabs.ac.in/physical-}"
            style=" color: #1154CC; font-family:Cambria, serif; font-style: normal; font-weight: normal; text-decoration: underline; font-size: 12pt;">
            {http://pcv-au.vlabs.ac.in/physical-}
          </a>
        </p>
      </td>
    </tr>
  </table>`

  const objectives = (sem)=>
  sem.sub.objectives?.cur?.length>0?`<p class="s20" style="line-height: 115%;text-align: justify;">
    Course Objectives:
    <span class="p">
      ${sem.sub.objectives?.cur.map(el => el.cur)?.join(" ")}
    </span>
  </p>`:""

  const prerequisites = (sem)=>
  sem.sub.prerequisites?.cur?.length>0?`<p class="s20" style="line-height: 115%;text-align: justify;">
    Course Pre-requisites:
    <span class="p">
      ${sem.sub.prerequisites?.cur?.map(el => el.cur)?.join(", ")}
    </span>
  </p>`:""

  const materials = (sem)=>
  sem.sub.referenceMaterial?.cur?.length>0?`<p class="s20" style="padding-top: 9pt;text-align: left;">
    TEXTBOOKS/REFERENCES:
  </p>
  <ol id="l27">
  ${sem.sub.referenceMaterial?.cur?.map(resource =>
      `<li data-list-text="{1.}">
      <p style="padding-top: 2pt;text-align: left;">
        ${resource.title + (resource.author ? (" by" + resource.author) : "")}
      </p>
    </li>`
    )}
  </ol>`:""
  
  const outcomes = (sem)=>
  sem.sub.outcomes?.cur?.length>0?`<p class="s20" style="line-height: 114%;text-align: justify;">
    Course Outcomes:
  </p>
  <p style="padding-top: 10pt;text-align: justify;">
    The students will learn:
  </p>
  <ul id="l28">
  ${sem.sub.outcomes?.cur?.map(el =>
      `<li data-list-text="●">
      <p style="padding-top: 12pt;text-align: justify;">
        ${el.cur}
      </p>
    </li>`
    )
    }
  </ul>`:""

  return `
<div class="page-margin">
<h4 style="text-align: center;">SEMESTER WISE STRUCTURE</h4>

<p style="padding-top: 12pt;text-indent: 0pt;text-align: left;"><br /></p>
<p style="text-indent: 0pt;text-align: left;"><br /></p>
${Object.keys(semesters).map((semNo) =>
    `
  <h4 style="text-align: center;">SEMESTER – ${semNo}</h4>
  <p style="padding-top: 5pt;text-align: left;"><br /></p>
  ${semesters[semNo].map(sem =>
      `<p class="s14" style="text-align: center;">${(sem.cur?.title) || "-"}</p>

    <table style="border-collapse:collapse;" cellspacing="0">
      <tr style="height:20pt">
        <td
          style="width:225pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s16" style="line-height: 14pt;text-align: left;">
            Course Code
          </p>
        </td>
        <td
          style="width:21pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s16" style="text-indent: 0pt;line-height: 14pt;text-align: center;">:</p>
        </td>
        <td
          style="width:201pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s16" style="line-height: 14pt;text-align: left;">
            ${(sem.cur?.code) || "-"}
          </p>
        </td>
      </tr>
      <tr style="height:21pt">
        <td
          style="width:225pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s16" style="line-height: 14pt;text-align: left;">
            Course Title
          </p>
        </td>
        <td
          style="width:21pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s16" style="text-indent: 0pt;line-height: 14pt;text-align: center;">:</p>
        </td>
        <td
          style="width:201pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s16" style="line-height: 14pt;text-align: left;">
            ${(sem.cur?.title) || "-"}
          </p>
        </td>
      </tr>
      <tr style="height:21pt">
        <td
          style="width:225pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s16" style="padding-left: 5pt;text-indent: 0pt;text-align: left;">
            Number of Credits
          </p>
        </td>
        <td
          style="width:21pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s16" style="text-indent: 0pt;text-align: center;">:</p>
        </td>
        <td
          style="width:201pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s16" style="padding-left: 5pt;text-indent: 0pt;text-align: left;">
            ${sem.cur?.credits + `(L: ${(sem.cur?.l) || "-"}, T: ${sem.cur?.t || "-"}, P: ${sem.cur?.p || "-"})`}
          </p>
        </td>
      </tr>
      <tr style="height:18pt">
        <td
          style="width:225pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s16" style="padding-left: 5pt;text-indent: 0pt;line-height: 14pt;text-align: left;">
            Course Category
          </p>
        </td>
        <td
          style="width:21pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s16" style="text-indent: 0pt;line-height: 14pt;text-align: center;">:</p>
        </td>
        <td
          style="width:201pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s16" style="padding-left: 5pt;text-indent: 0pt;line-height: 14pt;text-align: left;">
            ${(sem.cur?.category) || "-"}
          </p>
        </td>
      </tr>
    </table>

    <p style="padding-top: 9pt;text-align: left;"><br /></p>

    ${objectives(sem)}

    <p style="text-align: left;"><br /></p>
    
    ${prerequisites(sem)}

    <p style="text-indent: 0pt;text-align: left;"><br /></p>
    <p class="s20" style="padding-top: 10pt;text-align: justify;">
      Course Contents:
    </p>
    ${sem.sub.modules?.cur?.map((module, ind) =>
      `<p class="s20" style="padding-top: 11pt;text-align: justify;">
        Module ${ind + 1}: ${module.cur?.title}
      </p>
      <p style="padding-top: 2pt;line-height: 114%;text-align: justify;">
        ${module.cur?.topics}
      </p>
      <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>`
      )
      }
    
    <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
    
    ${materials(sem)}

    <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
    <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>

    ${experiments()}

    ${outcomes(sem)}
    <p class="s38" style="text-align: center;">*****</p>
    <p style="padding-top: 12pt;text-indent: 0pt;text-align: left;"><br /></p>`

    )}
  </div>`
  )}

<p style="text-align: left;"><br /></p>
<p style="text-align: center;">*****</p>
<p style="text-indent: 0pt;text-align: left;"><br /></p>`
}