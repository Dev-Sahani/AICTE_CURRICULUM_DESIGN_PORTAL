module.exports = committeeContent = ({committee})=>(
`<div class="page-break page-margin">
  <p class="s14" style="padding-top: 4pt;padding-left: 4pt;text-indent: 0pt;text-align: center;">
    Committee for Model Curriculum
  </p>
  <table style="border-collapse:collapse; margin-inline:auto;" cellspacing="0">
    <tr style="height:32pt">
      <td
        style="width:117pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p class="s15" style="padding-top: 8pt;padding-left: 17pt;text-indent: 0pt;text-align: left;">
          S.NO.
        </p>
      </td>
      <td
        style="width:117pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p class="s15" style="padding-top: 8pt;padding-left: 17pt;text-indent: 0pt;text-align: left;">
          Member Name
        </p>
      </td>
      <td
        style="width:117pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p class="s15" style="padding-top: 8pt;padding-left: 17pt;text-indent: 0pt;text-align: left;">
          Member Role
        </p>
      </td>

    </tr>
    ${
      committee?.map((el, ind)=>(
        `<tr style="height:27pt">
        <td
          style="width:43pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s16" style="padding-left:5pt;text-indent:0pt;line-height:14pt;text-align:left;">
            ${ind+1}
          </p>
        </td>
        <td
          style="width:117pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s16" style="padding-left:5pt;text-indent:0pt;line-height:14pt;text-align:left;">
            ${el.name}
          </p>
        </td>
        <td
          style="width:322pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s16" style="padding-right:7pt;text-indent:0pt;line-height:14pt;text-align:center;">
            ${el.role}
          </p>
        </td>
        </tr>`
      ))
    }
  </table>
</div>

<div class="page-break page-margin">
  <p class="s18" style="padding-top: 4pt;padding-left: 5pt;text-indent: 0pt;text-align: center;">
    Table of Contents
  </p>
  <table style="border-collapse:collapse; margin-inline:auto;" cellspacing="0">
    <tr style="height:27pt">
      <td
        style="width:46pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p class="s15" style="padding-left: 8pt;text-indent: 0pt;line-height: 14pt;text-align: left;">S. No.</p>
      </td>
      <td
        style="width:198pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p class="s15" style="text-indent: 0pt;line-height: 14pt;text-align: center;">Title</p>
      </td>
      <td
        style="width:102pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p class="s15" style="text-indent: 0pt;line-height: 14pt;text-align: center;">From</p>
      </td>
      <td
        style="width:130pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p class="s15" style="text-indent: 0pt;line-height: 14pt;text-align: center;">To</p>
      </td>
    </tr>
    <tr style="height:27pt">
      <td
        style="width:46pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p class="s16" style="text-indent: 0pt;line-height: 14pt;text-align: center;">1
        </p>
      </td>
      <td
        style="width:198pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p class="s16" style="padding-left: 5pt;text-indent: 0pt;line-height: 14pt;text-align: left;">
          General Course Structure &amp; Theme
        </p>
      </td>
      <td
        style="width:102pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p class="s16" style="text-indent: 0pt;line-height: 14pt;text-align: center;">
          1
        </p>
      </td>
      <td
        style="width:130pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p class="s16" style="text-indent: 0pt;line-height: 14pt;text-align: center;"> 10
        </p>
      </td>
    </tr>
    <tr style="height:27pt">
      <td
        style="width:46pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p class="s16" style="text-indent: 0pt;line-height: 14pt;text-align: center;">
          2
        </p>
      </td>
      <td
        style="width:198pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p class="s16" style="padding-left: 5pt;text-indent: 0pt;line-height: 14pt;text-align: left;">
          Category WISE STRUCTURE
        </p>
      </td>
      <td
        style="width:102pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p class="s16" style="text-indent: 0pt;line-height: 14pt;text-align: center;">
          11
        </p>
      </td>
      <td
        style="width:130pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p class="s16" style="text-indent: 0pt;line-height: 14pt;text-align: center;"> 10
        </p>
      </td>
    </tr>
    <tr style="height:27pt">
      <td
        style="width:46pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p class="s16" style="text-indent: 0pt;line-height: 14pt;text-align: center;">
          3
        </p>
      </td>
      <td
        style="width:198pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p class="s16" style="padding-left: 5pt;text-indent: 0pt;line-height: 14pt;text-align: left;">
          SEMESTER WISE STRUCTURE
        </p>
      </td>
      <td
        style="width:102pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p class="s16" style="text-indent: 0pt;line-height: 14pt;text-align: center;">
          1
        </p>
      </td>
      <td
        style="width:130pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
        <p class="s16" style="text-indent: 0pt;line-height: 14pt;text-align: center;"> 10
        </p>
      </td>
    </tr>
  </table>
</div>`)