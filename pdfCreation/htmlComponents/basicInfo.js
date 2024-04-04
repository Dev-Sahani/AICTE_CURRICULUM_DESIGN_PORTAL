module.exports = basicInfo = ({definitionOfCredits, codesAndDef, rangeOfCredits})=>(
`<div class="page-margin">
<p style="text-indent: 0pt;text-align: left;"><br /></p>
<p class="s19" style="line-height: 114%;text-align: center;">
  GENERAL COURSE STRUCTURE &amp;THEME
</p>
<p style="padding-top: 5pt;"><br /></p>
<p class="s18" style="text-indent: 0pt;text-align: center;">
  GENERAL COURSE STRUCTURE &amp; THEME
</p>
<ol id="l2">
  <li data-list-text="A.">
    <p class="s20" style="padding-top: 9pt;text-align: left;">
      Definition of Credit<span class="p">:</span>
    </p>
    <table style="border-collapse:collapse;" cellspacing="0">
      <tr style="height:14pt">
        <td
          style="width:208pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s28" style="text-indent: 0pt;line-height: 13pt;text-align: center;">
            Definitions
          </p>
        </td>
        <td
          style="width:224pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s28" style="text-indent: 0pt;line-height: 13pt;text-align: center;">
            Credits
          </p>
        </td>
      </tr>
      ${
        definitionOfCredits?.cur?.map(el=>(
          `<tr style="height:14pt">
            <td
              style="width:208pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s21" style="padding-left: 18pt;text-indent: 0pt;line-height: 13pt;text-align: left;">
                ${el.cur?.activity}
              </p>
            </td>
            <td
              style="width:231pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s21" style="padding-left: 77pt;text-indent: 0pt;line-height: 13pt;text-align: left;">
                ${el.cur?.overallCredits} Credit
              </p>
            </td>
          </tr>`
        ))
      }
    </table>
  </li>
  <li data-list-text="B.">
    <p class="s20" style="padding-top: 13pt;text-align: justify;">
      Range of Credits: <span class="p"> ${rangeOfCredits?.cur} </span>
    </p>
  </li>
  <li data-list-text="C.">
    <p class="s20" style="padding-top: 12pt;text-align: left;">
      Course code and definition:
    </p>
    <table style="border-collapse:collapse;" cellspacing="0">
      <tr style="height:14pt">
        <td
          style="width:208pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s28" style="text-indent: 0pt;line-height: 13pt;text-align: center;">
            Course code
          </p>
        </td>
        <td
          style="width:224pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
          <p class="s28" style="text-indent: 0pt;line-height: 13pt;text-align: center;">
            Definitions
          </p>
        </td>
      </tr>
      ${
        codesAndDef?.cur?.map(el=>(
          `<tr style="height:14pt">
            <td
              style="width:208pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s29" style="text-indent: 0pt;line-height: 13pt;text-align: center;">
                ${el.cur?.code}
              </p>
            </td>
            <td
              style="width:224pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
              <p class="s29" style="padding-left: 5pt;text-indent: 0pt;line-height: 13pt;text-align: left;">
                ${el.cur?.definition}
              </p>
            </td>
          </tr>`
        ))
      }
    </table>
  </li>
</ol>
</div>


<p style="padding-top: 6pt;text-indent: 0pt;text-align: left;"><br /></p>`
)