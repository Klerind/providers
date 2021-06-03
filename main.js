//global variables
const newClientButton = document.getElementById("new-client");
const tableBody = document.getElementById("tbody");
const addClientForm = document.getElementById("add-client-form");
let tableBodyContent = "";
//gets data with ajax from json/outputs.json file
function getData(data) {
    const tableData = JSON.parse(data.responseText);
    //calls printDataToTable function and passes tableData variable into it
    printDataToTable(tableData);
}
//calls getAjaxRequest function from js/_ajaxFunctions.js file
getAjaxRequest("json/inputs.json",getData);
//prints data from json/inputs.json to table body
function printDataToTable(tableData) {
  for (var i = 0; i < tableData.clients.length; i++) {
    tableBodyContent += "<tr><td>"+tableData.clients[i].name+"</td><td>"+tableData.clients[i].email+"</td><td>"+tableData.clients[i].phone+"</td><td>";
    for (var ii = 0; ii < tableData.clients[i].providers.length; ii++) {
      if (tableData.clients[i].providers[ii].id == 1 ) {
      tableBodyContent +=  tableData.providers[0].name +", ";
    }else if (tableData.clients[i].providers[ii].id == 2) {
      tableBodyContent +=  tableData.providers[1].name +", ";
    }else if (tableData.clients[i].providers[ii].id == 3) {
      tableBodyContent +=  tableData.providers[2].name +", ";
    }else if (tableData.clients[i].providers[ii].id == 4) {
      tableBodyContent +=  tableData.providers[3].name +", ";
    }else if (tableData.clients[i].providers[ii].id == 5) {
      tableBodyContent +=  tableData.providers[4].name +", ";
     }
    }
    tableBodyContent += "</td><td onclick='editRow(this)'>edit</td><td onclick='deleteRow(this)'>delete</td></tr>";
    tableBody.innerHTML = tableBodyContent;
  }
}
//displays new client form when new client button is clicked
newClientButton.addEventListener("click", function() {
  addClientForm.style.display = "block";
});
//deletes table row when delete button is clicked
function deleteRow(event) {
  //gets data from json/inputs.json file
    function getData(data) {
        const deleteClient = JSON.parse(data.responseText);
        sendAjaxRequest("php/_saveClient.php",saveClient);
        deleteClient.clients.splice(event.parentNode.rowIndex - 1,1);
        const saveClient = JSON.stringify(deleteClient);
        //calls saveClientData function and passes saveClient variable into it
        saveClientData(saveClient);
    }
//calls getAjaxRequest function from js/_ajaxFunctions.js file and passes a string url and a function name into it
getAjaxRequest("json/inputs.json",getData);
//sends updete data from the editted row to php/_delete.php file
function saveClientData(saveClient) {
    }
    //reloads page after 3 second
    setTimeout(()=>{
      window.location.reload();
    },300);
}
//edits table row when edit button is clicked
function editRow(event) {
  let rowData = [];
    if (event.parentNode.firstChild.contentEditable == "inherit") {
    for (var i = 0; i < 4; i++) {
      //setAttribute contenteditable from col 1 up to 4
      event.parentNode.children[i].setAttribute("contenteditable","true");
      //setAttribute style cursor pointer from col 1 up to col 4
      event.parentNode.children[i].setAttribute("style","cursor:pointer;");
       }
      //sets edit button to save button
      event.parentNode.children[4].innerText = "save";
      event.parentNode.children[4].style.color = "tomato";
    }else{
     for (var i = 0; i < 4; i++) {
      //setAttribute contenteditable from col 1 up to 4
      event.parentNode.children[i].setAttribute("contenteditable","inherit");
      //setAttribute style cursor pointer from col 1 up to col 4
      event.parentNode.children[i].removeAttribute("style");
      rowData[i] = event.parentNode.children[i].textContent;
    }
    function getData(data) {
      //converts data from json format to javascript object
       let parsedData = JSON.parse(data.responseText);
       //updates rows data
       for (var i = 0; i < rowData.length; i++) {
         //updates rows name
         parsedData.clients[event.parentElement.rowIndex - 1].name = rowData[0];
         //updates rows email
         parsedData.clients[event.parentElement.rowIndex - 1].email = rowData[1];
         //updates rows phone
         parsedData.clients[event.parentElement.rowIndex - 1].phone = rowData[2];
       }
       //converts data from javascript object to json format
       const jsonData = JSON.stringify(parsedData);
       sendAjaxRequest("php/_saveClient.php",jsonData);
       //reloads page after 3 second
       setTimeout(()=>{
         window.location.reload();
       },300);
    }
    //gets data from json/inputs.json file
    getAjaxRequest("json/inputs.json",getData);
    //sets save button to edit button
    event.parentNode.children[4].innerText = "edit";
    event.parentNode.children[4].style.color = "blue";
  }
}
