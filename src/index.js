
//adds a mask to the price input
$('#inputPrice').mask('000.000.000.000.000,00', { reverse: true });

let products = [
    {
        id: 1,
        name: "Computador M1-TX",
        description: "Intel I7, 16GB, SSD 256, HD 1T",
        price: 4900,
        category: 1,
        promotion: true,
        new: true
    },
    {
        id: 2,
        name: "Computador M2-TX",
        description: "Intel I7, 32GB, SSD 512, HD 1T",
        price: 5900,
        category: 2,
        promotion: false,
        new: true
    },
    {
        id: 3,
        name: "Computador M1-T",
        description: "Intel I5, 16GB, HD 1T",
        price: 2900,
        category: 3,
        promotion: false,
        new: false
    }
];

let categories = [
    {
        id: 1,
        name: "Produção Própria"
    },
    {
        id: 2,
        name: "Nacional"
    },
    {
        id: 3,
        name: "Importado"
    }
];



function convertToNumber(priceFormat){
    return priceFormat.replace(/\./g, '').replace(',', '.');
}

//OnLoad
loadProducts();

/*this function shows on the screen all the products stored and
it will be called when the document is loaded*/
function loadProducts() {
    for (let prod of products) {
        addNewRow(prod);
    }
}


//function to save products
function save() {

    //each data input is saved to a proper object attribute
    let product = {
        id: products.length + 1,
        name: document.getElementById("inputName").value,
        description: document.getElementById("inputDescription").value,
        price: convertToNumber(document.getElementById("inputPrice").value),
        category: parseInt(document.getElementById("selectCategory").value),
        promotion: document.getElementById("checkBoxPromotion").checked,
        new: document.getElementById("checkBoxRelease").checked
    }

    //then i just add the object into the table
    addNewRow(product);

    //pushing the data to my storage array
    products.push(product);

    //reseting the form
    document.getElementById("productForm").reset();
}


/* this function will add a new line and its corresponding data
from the products array */
function addNewRow(prod) {

    let table = document.getElementById("productsTable");

    let newRow = table.insertRow();

    //inserts the products's id into the table
    let idNode = document.createTextNode(prod.id);
    newRow.insertCell().appendChild(idNode);

    //inserts name
    let nameNode = document.createTextNode(prod.name);
    newRow.insertCell().appendChild(nameNode);

    //inserts description
    let descriptionNode = document.createTextNode(prod.description);
    let cell = newRow.insertCell();
    cell.className = "d-none d-md-table-cell";
    cell.appendChild(descriptionNode);

    //currency formatter
    let formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    //inserts price
    let priceNode = document.createTextNode(formatter.format(prod.price));
    newRow.insertCell().appendChild(priceNode);


    /* the following code is executed only when the product category matches the category's id
    then I can access the matching category name attribute */
    for (let category of categories) {

        if (prod.category === category.id) {
            let categoryNode = document.createTextNode(category.name);
            newRow.insertCell().appendChild(categoryNode);
        }

    }

    /*let categoryNode = document.createTextNode(categories[prod.id - 1].name);
    newRow.insertCell().appendChild(categoryNode);*/

    let options = "";

    if (prod.promotion) {
        options = '<span class="badge bg-success me-1">P</span>';
    }

    if (prod.new) {
        options += '<span class="badge bg-primary">L</span>';
    }

    cell = newRow.insertCell();
    cell.className = "d-none d-md-table-cell";
    cell.innerHTML = options;
}

