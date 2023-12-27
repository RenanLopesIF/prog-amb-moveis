const table = document.querySelector("#table");
const inputName = document.querySelector("#inputName");
const inputAge = document.querySelector("#inputAge");
const buttonAdd = document.querySelector("#buttonAdd");

async function getAllUsers(){
    const {data} = await axios.get("http://localhost:3003/usuarios")
    console.log(data)

    data.forEach(user => {
        generateNewRow(user.nome, user.idade, user.id)
    });

    return data
}

async function deleteUser(userId){
    const res = await axios.delete("http://localhost:3003/deletar-usuario",{
        data: {userId}
    })

    return res
}

async function updateUser(userId, name, age){
    const res = await axios.put("http://localhost:3003/atualizar-usuario",{userId, name, age})

    return res;
}

async function generateNewRow(name, age, userId){
    const row = document.createElement("tr")
    const nameRow = document.createElement("td")
    const ageRow = document.createElement("td")
    const excludeRow = document.createElement("td")

    const ageArea = document.createElement("div")
    const minusButton = document.createElement("div")
    const plusButton = document.createElement("div")
    
    ageArea.textContent = age
    minusButton.textContent = "-"
    plusButton.textContent = "+"

    nameRow.textContent = name
    ageRow.classList.add("td-age")
    ageRow.appendChild(ageArea)
    ageRow.appendChild(minusButton)
    ageRow.appendChild(plusButton)

    excludeRow.textContent = 'X'
    row.appendChild(nameRow)
    row.appendChild(ageRow)
    row.appendChild(excludeRow)

    minusButton.onclick = async () => {
        const newAge= Number(ageArea.textContent)-1
        await updateUser(userId, name,newAge)
        ageArea.textContent = newAge
    }

    plusButton.onclick = async () => {
        const newAge= Number(ageArea.textContent)+1
        await updateUser(userId, name,newAge)
        ageArea.textContent = newAge
    }

    excludeRow.onclick = async () => {
        await deleteUser(userId)
        table.removeChild(row)
    }

    table.appendChild(row)
}



buttonAdd.addEventListener("click", async ev=>{
   const {data} = await axios.post("http://localhost:3003/inserir-usuario",{
    name: inputName.value,
    age: inputAge.value
})


    generateNewRow(inputName.value, inputAge.value, data.insertId);
});

window.onload = () => {
    getAllUsers()
}