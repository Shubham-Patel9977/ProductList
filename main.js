function AddItems(e){
    let name= document.getElementById("item")
    let desc = document.getElementById("desc")
    let price= document.getElementById("price")
    let qty = document.getElementById("qty");
     e.preventDefault()
    const x= {
        "name": name.value,
        "desc": desc.value,
        "price": price.value,
        "qty": qty.value,

    }
    axios.post("https://crudcrud.com/api/19f00b6087f64dc2b3ba1ab5f2f48329/data",x).then(LoadItems)
    name.value='';
    desc.value="";
    price.value="";
    qty.value="";
}

function getElementById(id){
    return document.getElementById(id);
}

function manageQty(id,operation,qty){
    const span=document.getElementById(id+'qty');
   const count=Number(span.innerText);
   if(operation==='+')
   span.innerText=Math.min(count+1,qty)
   if(operation==='-')
   span.innerText=Math.max(count-1,0)
}

async function buyProduct(id,payload){
    const qty=getElementById(id+"qty");  
     const y={
        ...payload,
        "qty":payload.qty-Number(qty.innerText)
     }
    //const res=(await axios.put(`https://crudcrud.com/api/19f00b6087f64dc2b3ba1ab5f2f48329/data/${id}`,y)).data
    axios.put(`https://crudcrud.com/api/19f00b6087f64dc2b3ba1ab5f2f48329/data/${id}`,y).then(LoadItems)
    
    }
async function LoadItems(){
    const table= document.getElementById("msg");
   
   const data =(await axios.get("https://crudcrud.com/api/19f00b6087f64dc2b3ba1ab5f2f48329/data")).data 
   await createTableHeading()
   const tbody= document.createElement('tbody');
   
  for(x of data){
   tbody.appendChild( createRow(x))
  }
  table.appendChild(tbody)
}

function createRow(x){
    const tr=document.createElement('tr')
    tr.id=x._id;
     tr.innerHTML=`
        <td>${x.name}</td>
        <td>${x.desc}</td>
        <td>&#8377;${x.price}</td>\
        <td>${x.qty}</td>
        <td><button class="border border-0" onClick="javascrip:manageQty('${x._id}','-',${x.qty})"> <span class="bi bi-dash"></span></button>
        <button id="btn" class="btn btn-primary m-1" onClick="javascrip:buyProduct('${x._id}',{'name':'${x.name}','desc':'${x.desc}','price':${x.price},'qty':${x.qty}})">buy <span id="${x._id}qty">0</></button>
        <button class="border border-0" onClick="javascrip:manageQty('${x._id}','+',${x.qty})"><span class="bi bi-plus "></span></button></td> 
     `
   return tr;
     
}

 function createTableHeading(){
    //console.log(data)
    const table= document.getElementById("msg");
     let thead;
     let headrow;
    
    let count = false;
     if(count==false){
        table.innerHTML=""
     thead = document.createElement('thead');
     headrow = document.createElement('tr');
       headrow.innerHTML=` <td>Product </td>
     <td>Desc</td>
     <td>Price</>
     <td>Qty</td>
     <td>Buy</>
     
     `
     
    
     
     thead.appendChild(headrow);
     table.appendChild(thead);
     
     table.appendChild(headrow);
     count =true;
    }
}
 
