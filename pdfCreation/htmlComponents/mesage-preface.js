module.exports = messagePreface = ({message, preface}) =>(
`<div class="page-break page-margin">
  <p class="s11" style="padding-top: 4pt;text-indent: 0pt;text-align: center;">
    MESSAGE
  </p>
  <p style="padding-top: 5pt;text-align: left;"><br /></p>
  <p class="s12 " style="text-indent: 0pt;text-align: justify;">
    ${message?.cur}
  </p>
</div>
<div class="page-break page-margin">
  <p class="s11" style="padding-top: 4pt;padding-left: 4pt;text-indent: 0pt;text-align: center;">PREFACE</p>
  <p style="padding-top: 5pt;text-align: left;"><br /></p>
  <p class="s12" style="text-indent: 0pt;text-align: justify;">
    ${preface?.cur}
  </p>
</div>`)