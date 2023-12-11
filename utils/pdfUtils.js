
const toTable = (arr) => {
    let table = "";
    for(let i=0; i<arr.length; i++) {
        table.concat("<tr>");
        for(let j=0; j<arr[i].length; j++) {
            if(i===0) {
                table.concat(`<th>${arr[i][j]}</th>`);
            } else {
                table.concat(`<td>${arr[i][j]}</td>`);
            }
        }
        table.concat("</tr>");
    }
    return table;
}

const toIndex = (arr)=>{
    let html = "";
    arr.forEach((item)=>{
        let p = `<p>${item}`;
        while(p.length < 75) p.concat(".");
        p.concat("</p>");
        html.concat(p);
    });
    return html;
}

module.exports = {
    toIndex,
    toTable,

}