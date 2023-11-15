let listApp = []

const inputIpAddress = document.getElementById("inputIpAddress")
const btnGetIp = document.getElementById("btnGetIp")
const ipTable = document.getElementById("ipTable")
const thread = document.getElementsByTagName("thread")

let link = "" 

function inputValue(){
  if (inputIpAddress.value != ""){
    link = `https://ipinfo.io/${inputIpAddress.value}?token=1b7d0ec737ee27`

  fetch(link)
    .then((response) => {
      if (!response.ok) {
        alert("O ip não existe")
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.ip)
      if(data.ip != undefined & data.country != undefined & data.city != undefined){
        const ip = data.ip;
        const city = data.city;
        const country = data.country;
        const org = data.org ? data.org.substr(data.org.indexOf(' ') + 1) : '-';
        if(listApp.some(data => data.ip === inputIpAddress.value)){
          alert("IP já existe. Tente novamente com outro")
        }
        else{
          listApp.push({
            ip: ip,
            city: city,
            country: country,
            org: org,
            close: `<i class="fa fa-times ${listApp.length}" style="font-size: 22px;"></i>`,
          });
        }
      }
      
      inputIpAddress.value = ""

      imprimir(listApp);
    });
  }
}

function imprimir(lista){

  if(!ipTable.querySelector('thread')){
    const model = `<thead>
      <tr>
        <th>IP</th>
        <th>Org</th>
        <th>Country</th>
        <th>City</th>
        <th>Clear</th>
        </tr>
      </thead>
    `;

    ipTable.innerHTML = model
  }

  for(let ips of lista){
    
    const model_table =`
    <tbody id="${lista.length}">
      <tr>
        <td>${ips.ip}</td>
        <td>${ips.org}</td>
        <td>${ips.country}</td>
        <td>${ips.city}</td>
        <td>
          <a href="#">
            <i class="fa fa-times" onclick="remove('${ips.ip}')" style="font-size: 22px;"></i>
          </a>
        </td>
      </tr>
    </tbody>`;

    ipTable.innerHTML += model_table
  }   
}



function remove(data){
  let indice = -1;

  for (let i = 0; i < listApp.length; i++) {
    if (listApp[i].ip === data) {
      indice = i;
  }}

  listApp.splice(indice, 1)

  if(listApp.length === 0){
    ipTable.innerHTML = " "
  }else{
    imprimir(listApp)  
  }
  
}
