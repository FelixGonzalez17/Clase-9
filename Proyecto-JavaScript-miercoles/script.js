const students = [];
let editIndex = null;

const tableBody = document.querySelector("#studentTable tbody");
const promedios = document.getElementById("average");
const submitButton = document.getElementById("submitButton");

document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = parseFloat(document.getElementById("grade").value);

    if (!name || !lastName || isNaN(grade) || grade < 1 || grade > 7) {
        alert("Error al ingresar los datos");
        return;
    }

    const student = { name, lastName, grade };

    if (editIndex !== null) {
        // Modo edición
        students[editIndex] = student;
        actualizarTabla();
        editIndex = null;
        submitButton.textContent = "Guardar";
    } else {
        // Modo nuevo
        students.push(student);
        addStudentToTable(student, students.length - 1);
    }

    calcularPromedio();
    this.reset();
});

function addStudentToTable(student, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.grade}</td>
        <td> 
            <button class="delete">Eliminar</button>
            <button class="edit">Modificar</button>
        </td>
    `;

    row.querySelector(".delete").addEventListener("click", function () {
        deleteEstudiante(index);
    });

    row.querySelector(".edit").addEventListener("click", function () {
        document.getElementById("name").value = student.name;
        document.getElementById("lastName").value = student.lastName;
        document.getElementById("grade").value = student.grade;

        editIndex = index;
        submitButton.textContent = "Actualizar";
    });

    tableBody.appendChild(row);
}

function deleteEstudiante(index) {
    students.splice(index, 1);
    actualizarTabla();
    calcularPromedio();
}

function calcularPromedio() {
    if (students.length === 0) {
        promedios.textContent = "Promedio General del Curso : N/A";
        return;
    }

    const total = students.reduce((sum, student) => sum + student.grade, 0);
    const promedio = total / students.length;
    promedios.textContent = "Promedio General del Curso : " + promedio.toFixed(2);
}

function actualizarTabla() {
    tableBody.innerHTML = "";
    students.forEach((student, index) => {
        addStudentToTable(student, index);
    });
}