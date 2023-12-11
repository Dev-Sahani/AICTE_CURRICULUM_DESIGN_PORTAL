const headerTemplate = `
<div style="text-align: center; font-size: 12px; margin-bottom: 10px;">
  Header - <span class="pageNumber"></span>/<span class="totalPages"></span>
</div>`;
const footerTemplate = `
<div style="margin-left: 30px; padding-left:30px; font-size: 12px; margin-top: 10px;">
  <span>---------</span><p style="margin-left: 30px; padding-left: 30px;" class="pageNumber"></p><span>---------</span>
</div>`;

module.exports = {
    headerTemplate,
    footerTemplate,
}