function firstUpper(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function html(inner) {
   let html = "";
   html +=  "<!doctype html>\n" +
            "<html lang=\"en\">";

   html += inner;

   html += "</html>";
   return html;
}

function head(title) {
    let head = "<head>\n" +
        "    <!-- Required meta tags -->\n" +
        "    <meta charset=\"utf-8\">\n" +
        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n" +
        "\n" +
        "    <!-- Bootstrap CSS -->\n" +
        "    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css\" integrity=\"sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm\" crossorigin=\"anonymous\">\n"
    head += "<title>" + title + "</title>";
    head += "</head>";
    return head;
}

function body(inner) {
    let body = "<body>";

    body += inner;

    body += "    <!-- Optional JavaScript -->\n" +
        "    <!-- jQuery first, then Popper.js, then Bootstrap JS -->\n" +
        "    <script src=\"https://code.jquery.com/jquery-3.2.1.slim.min.js\" integrity=\"sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN\" crossorigin=\"anonymous\"></script>\n" +
        "    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js\" integrity=\"sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q\" crossorigin=\"anonymous\"></script>\n" +
        "    <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js\" integrity=\"sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl\" crossorigin=\"anonymous\"></script>\n" +
        "  </body>";
    return body;
}

function homeView(data) {

    let view = "";
    let content = "<div class='container'>";
    let count = 0;
    for (let i = 0; i < data.devices.length; i++) {
    //for (let i = 0; i < 9; i++) {
        if (count === 0) {
            content += "<div class='row'>";
        }
        content += "" +
            "<div class='col border text-center'>" +
            "   <h3>" + data.devices[i].deviceName + "</h3>" +
            "   <img src='" + data.devices[i].deviceImg + "' alt='Device Image'>" +
            "   <p>Device Status: " + firstUpper(data.devices[i].deviceStatus) + "</p>" +
            "</div>";
        count++;
        if(count === 3) {
            content += "</div>";
            count = 0;
        }
    }
    content += "</div>";
    view += html(head("VeSync App") + body(content));
    return view;

}

module.exports.body = body;
module.exports.homeView = homeView;
module.exports.head = head;
module.exports.html = html;