module.exports = categories = ({categories})=>(
`<div class="page-margin">
<h4 style="text-align: center;">Category WISE STRUCTURE</h4>
<p style="text-align: left;"><br /></p>
${
    Object.keys(categories).map(cat=>(
        `<p class="s14" style="padding-left: 5pt;text-align: center;">${cat}</p>
        <p style="padding-top: 5pt;text-align: left;"><br /></p>

        <ol id="l5">
        <li data-list-text="(i)">
            <p style="padding-top: 9pt;text-align: left;">
            Number of ${cat} courses: ${categories[cat]?.length}
            </p>
        </li>
        <li data-list-text="(ii)">
            <p style="padding-top: 2pt;padding-bottom: 2pt;text-align: left;">
            Credits: ${categories[cat]?.reduce((sum, el)=>sum + el.cur?.credits, 0)}
            </p>
        </li>
        </ol>
        <table style="border-collapse:collapse;" cellspacing="0">
            <tr style="height:21pt">
                <td
                style="width:40pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s15" style="padding-top: 3pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                    S. No.
                </p>
                </td>
                <td
                style="width:86pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s15" style="padding-top: 3pt;padding-right: 6pt;text-indent: 0pt;text-align: center;">
                    Course Code
                </p>
                </td>
                <td
                style="width:157pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s15" style="padding-top: 3pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                    Course Title
                </p>
                </td>
                <td
                style="width:23pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s15" style="padding-top: 3pt;text-indent: 0pt;text-align: center;">
                    L
                </p>
                </td>
                <td
                style="width:27pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s15" style="padding-top: 3pt;text-indent: 0pt;text-align: center;">
                    T
                </p>
                </td>
                <td
                style="width:36pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s15" style="padding-top: 3pt;text-indent: 0pt;text-align: center;">
                    P
                </p>
                </td>
                <td
                style="width:66pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s15" style="padding-top: 3pt;padding-right: 4pt;text-indent: 0pt;text-align: center;">
                    Semester
                </p>
                </td>
                <td
                style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                <p class="s15" style="padding-top: 3pt;padding-right: 4pt;text-indent: 0pt;text-align: center;">
                    Credits
                </p>
                </td>
            </tr>
        ${
            categories[cat].map((course, ind) =>
                `
                <tr style="height:14pt">
                    <td
                    style="width:40pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s16" style="text-indent: 0pt;line-height: 13pt;text-align: center;">
                        ${ind + 1}
                    </p>
                    </td>
                    <td
                    style="width:86pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s16" style="text-indent: 0pt;line-height: 13pt;text-align: center;">
                        ${course.cur?.code}
                    </p>
                    </td>
                    <td
                    style="width:157pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s16" style="padding-left: 5pt;text-indent: 0pt;line-height: 13pt;text-align: left;">
                        ${course.cur?.title}
                    </p>
                    </td>
                    <td
                    style="width:23pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s16" style="text-indent: 0pt;line-height: 13pt;text-align: center;">
                        ${course.cur?.l}
                    </p>
                    </td>
                    <td
                    style="width:27pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s16" style="text-indent: 0pt;line-height: 13pt;text-align: center;">
                        ${course.cur?.t}
                    </p>
                    </td>
                    <td
                    style="width:36pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s16" style="text-indent: 0pt;line-height: 13pt;text-align: center;">
                        ${course.cur?.p}
                    </p>
                    </td>
                    <td
                    style="width:66pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s16"
                        style="padding-left: 4pt;padding-right: 4pt;text-indent: 0pt;line-height: 13pt;text-align: center;">
                        ${course.cur?.semester}
                    </p>
                    </td>
                    <td
                    style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                    <p class="s16"
                        style="padding-left: 4pt;padding-right: 3pt;text-indent: 0pt;line-height: 13pt;text-align: center;">
                        ${course.cur?.credits}
                    </p>
                    </td>
                </tr>
                `
            )

        }
        </table>

        <p style="text-indent: 0pt;text-align: left;"><br /></p>
        <p style="padding-left: 5pt;text-indent: 0pt;text-align: center;">*******</p>
        <p style="text-indent: 0pt;text-align: left;"><br /></p>`
    ))
}
<p style="text-align: left;"><br /></p>
</div>

<p style="text-align: left;"><br /></p>
<p style="padding-left: 5pt;text-align: center;">*******</p>
<p style="text-align: left;"><br /></p>
`
)