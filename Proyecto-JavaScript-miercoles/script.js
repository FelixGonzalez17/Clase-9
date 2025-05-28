const students=[];

const tableBody=document.querySelector("#studentTable tbody");

document.getElementById("studentForm").addEventListener("submit", function (e){
   e.preventDefault();

 const name=document.getElementById("name").value.trim();
 const lastName=document.getElementById("lastName").value.trim();
 const grade=parseFloat(document.getElementById("grade").value);

 if(!name || !lastName || isNaN(grade) || grade <1 || grade>7){
   alert("Error al ingresar los datos")
   return
 }
   
 const student={name,lastName,grade}
  students.push(student)
  console.log(students)
  addStudentToTable(student)
  calcularPromedio()

  this.reset();
});

function addStudentToTable(student){
  const row=document.createElement("tr");
  row.innerHTML=`
  <td>${student.name}</td>
  <td>${student.lastName}</td>
  <td>${student.grade}</td>
  <td> <button class="delete">Eliminar</button></td>
`;


row.querySelector(".delete").addEventListener("click",function(){
  deleteEstudiante(student,row);
});

tableBody.appendChild(row)
}

function deleteEstudiante(student,row){
    // buscar el estudiante en el array
    const index=students.indexOf(student);
    if(index > 1){
        students.splice(index,1);
        row.remove();
        calcularPromedio();
    }
}

const promedios= document.getElementById("average")

function calcularPromedio(){
    if(students.length===0){
       averageDiv.textContent="Promedio General del Curso : N/A"
       return
     }
     const total=students.reduce((sum,student)=>sum+student.grade,0);
     const prom=total/students.length;
     promedios.textContent="Promedio General del Curso : "+prom.toFixed(2);
}