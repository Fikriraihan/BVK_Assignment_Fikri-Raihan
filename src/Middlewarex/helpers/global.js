export function formatDate(d) {
  var date = new Date(d);

  if (isNaN(date.getTime())) {
    return d;
  } else {
    var month = [];
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    let day = date.getDate().toString();

    if (day < "10") {
      day = "0" + day;
    }

    return day + " " + month[date.getMonth()] + " " + date.getFullYear();
  }
}

export function inputValidation(text, type) {
  var msg = "",
    inc = 0;
  if (text.length == 0 && type == "required") {
    msg = "is a required field";
  }
  return msg;
}

export function convertBytesToSize(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}
// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
export function convertArrayOfObjectsToCSV(array, data) {
  let result;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(data[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
export function downloadCSV(array) {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = "export.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
}

export const Export = ({ onExport }) => <button onClick={(e) => onExport(e.target.value)}>Export</button>;

export function getYoutubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}
