LA5
class HashTable {
  constructor(size) {
    this.table = new Array(size);
    this.size = size;
    this.count = 0;
  }

  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash |= 0; 
    }
    return hash % this.size;
  }

  insert(key, value) {
    let index = this.hash(key);
    if (this.table[index] === undefined) {
      this.table[index] = [[key, value]];
    } else {
      this.table[index].push([key, value]);
    }
    this.count++;
  }

  get(key) {
    let index = this.hash(key);
    if (this.table[index] !== undefined) {
      for (let i = 0; i < this.table[index].length; i++) {
        if (this.table[index][i][0] === key) {
          return this.table[index][i][1];
        }
      }
    }
    return undefined;
  }

  remove(key) {
    let index = this.hash(key);
    if (this.table[index] !== undefined) {
      for (let i = 0; i < this.table[index].length; i++) {
        if (this.table[index][i][0] === key) {
          this.table[index].splice(i, 1);
          this.count--; 
          return true;
        }
      }
    }
    return false;
  }

  printTable() {
    console.log("Hash Table:");
    for (let i = 0; i < this.size; i++) {
      if (this.table[i] !== undefined) {
        console.log(Index ${i}: ${this.table[i].map(item => `${item[0]}:${item[1]}).join(", ")}`);
      } else {
        console.log(Index ${i}:);
      }
    }
  }
}

const customerTable = new HashTable(5);

// Function to handle customer service interactions
function serveCustomer() {
  let customerNumber = prompt("Enter the number of the customer to be served:");
  if (customerNumber > customerTable.count || customerNumber <= 0) {
    alert("Invalid customer number. Please enter a valid number.");
    return;
  }
  let servedCustomer = customerTable.get(customerNumber - 1);
  if (servedCustomer !== undefined) {
    alert(Serving customer ${servedCustomer} (Number ${customerNumber}).);
    customerTable.remove(customerNumber - 1);
    customerTable.printTable();
  } else {
    alert(No customer found for number ${customerNumber}.);
  }
}

customerTable.insert("Elaine", "Elaine");
customerTable.insert("Althea", "Althea");
customerTable.insert("Angelo", "Angelo");
customerTable.insert("Lito", "Lito");
customerTable.insert("Engelbert", "Engelbert");

alert("Welcome to the Customer Service Queue!");
while (true) {
  serveCustomer();
  let continueServing = confirm("Do you want to continue serving customers?");
  if (!continueServing) {
    break;
  }
}
alert("Service ended.");