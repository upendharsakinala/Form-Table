let data=[]
let edit=-1
let name=""
let age=""
let email=""
let password=""
let gender=""
let subscribe=""
let submit=document.getElementById('submit-btn')
let reset=document.getElementById('reset-btn')
reset.addEventListener('click',function(){
  document.getElementById('myform').reset()   
})
function form_details(){
    name=document.getElementById('name').value
    age=document.getElementById('age').value
    email=document.getElementById('email').value
    password=document.getElementById('password').value
    gender="";
    if(document.getElementsByName('sex')[0].checked){
        gender="Male"
    }if(document.getElementsByName('sex')[1].checked){
        gender="Female"
    }
    subscribe=document.getElementById("newsletter").checked;
    if(subscribe==false){
        subscribe="No"
    }else{
        subscribe="Yes"
    }
   
}
function getUserData(e){
    e.preventDefault()
    form_details()
    let form_obj={'Name':name,'Age':age,'Email':email,'Password':password,'Gender':gender,'Subscribe':subscribe}
    if(edit!=-1){ 
    console.log(data);
    data.splice(edit,1,form_obj)
    edit=-1
    }else{
        data.push(form_obj)
    }
    showTable(data)
    document.getElementById('myform').reset()
}

submit.addEventListener('click',getUserData)


function showTable(data){
let table=document.getElementById('mytable')
table.innerHTML=""
 firstRow(table,"Name","Age","Email","Gender","Subscribe to Newsletter","Edit","Delete")
data.forEach(function(element,index){
    row=document.createElement('tr')
    let name=element['Name']
    let age=element['Age']
    let email=element['Email']
    let gender=element['Gender']
    let subscribe=element['Subscribe']
    let edit_btn=document.createElement('button')
    edit_btn.innerText='Edit'
    edit_btn.setAttribute('id',index)
  
    let delete_btn=document.createElement('button')
    delete_btn.setAttribute('id',index)
    delete_btn.innerText='delete'
    let entry=[name,age,email,gender,subscribe,edit_btn,delete_btn]
    /*For coloumns below */
    entry.forEach(function(item,index){
        let col=document.createElement('td')
        col.style.textAlign="center"
        if(index===5||index===6){
            col.appendChild(item)    
        }else{
            col.innerHTML=item
        }
            row.appendChild(col)
        })

  table.appendChild(row) 
  /*   Delete Event Listener  */
delete_btn.addEventListener('click',function(){
 let row=delete_btn.parentNode.parentNode;

 data.splice(delete_btn.id,1)
row.remove()
console.log(`${delete_btn.id}`);
console.log(data);
})

edit_btn.addEventListener('click',function(){
    let row=edit_btn.parentNode.parentNode;
    let myform=document.getElementById('myform')
    document.getElementById('name').value=row.cells[0].innerHTML
    document.getElementById('age').value=row.cells[1].innerHTML
    document.getElementById('email').value=row.cells[2].innerHTML

    if(row.cells[3].innerHTML==="male"){
        document.getElementsByName('sex')[0].checked=true
    }if(row.cells[3].innerHTML==="female"){
        document.getElementsByName('sex')[1].checked=true
    }if(row.cells[4].innerHTML==="Yes"){
        document.getElementById('newsletter').checked=true
    }if(row.cells[4].innerHTML==="No"){
        document.getElementById('newsletter').checked=false
    }
    edit=edit_btn.id
})
})
}

function firstRow(table,Name,Age,Email,Gender,Subscribe_to_NewsLetter,Edit_data,Delete_data){
    let row=[Name,Age,Email,Gender,Subscribe_to_NewsLetter,Edit_data,Delete_data]
    let tr=document.createElement('tr')
    row.forEach(function(ele,index){
        let col=document.createElement('th')
        col.style.width="400px"
        col.innerHTML=ele
        tr.appendChild(col)
    })
    table.appendChild(tr)
}
