class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");

    // theses are the saving section  variables. // 

    this.savingsForm = document.getElementById("savingsForm"); // savings <form id>
    this.savingsButton = document.getElementById("savings-button"); // savings form button to submit 
    this.percent = document.getElementsByClassName("percent"); // saving percentage to calculate 
    this.result = document.getElementById("result");
    this.savingsAmount = document.getElementById("savings-amount"); // savings icon 
     //   //   //  /// /// // // //  

    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }
  //submit budget method 
  submitBudgetForm(){
    const value = this.budgetInput.value;
    if(value === "" || value < 0) {
      this.budgetFeedback.classList.add("showItem");
      this.budgetFeedback.innerHTML = `<p>value cannot be empy or negative</p>`;
      const self = this;
      
      setTimeout(function(){
        self.budgetFeedback.classList.remove("showItem");
      }, 4000);
    }
    else{
      this.budgetAmount.textContent = value;
      this.budgetInput.value = "";
      this.showBalance();
 
    }
  }

  
// submit savings form 

displaySavingsValue() { 
 
  const Savingsbtn = document.querySelector('#savings-button');
  // handle click button
  Savingsbtn.onclick = function () {
      const rbs = document.querySelectorAll('input[name="percent"]');
      let selectedValue;
      for (const rb of rbs) {
          if (rb.checked) {
              selectedValue = rb.value;
              break;
          }
      }// selectedValue is typeof "string" , need to convert to NUMBER  than apply caluclation;   **:) did that already (  const decimalValue  ) 
        // to find percentage of a number , divide the number by 100 .  -- (  const divided  ) 

      const decimalValue = Number(selectedValue); 
      const divided = decimalValue/ 100; 

      //  savings total number under savings ICON -- // 

      //Get whatever the current BALANCE number is and apply percentage selected by user 10,15 or 20%, to return the percentage of the balance . 
      const balance = document.getElementById("balance-amount"); 
      const value = balance.textContent;
      const BNum = Number(value);

      
      
      alert(BNum);
     
      
      alert(divided); // alert percentage selected  , in decimal form 


  };

          
  }



//show Balance 
showBalance(){
  const expense = this.totalExpense();
  const total = parseInt(this.budgetAmount.textContent) - expense;
  this.balanceAmount.textContent = total;
  if(total < 0){
    this.balance.classList.remove('showGreen', 'showBlack');
    this.balance.classList.add('showRed');
  }
  else if(total > 0){
    this.balance.classList.remove('showRed', 'showBlack');
    this.balance.classList.add('showGreen');
  }
  else if(total === 0){
    this.balance.classList.remove('showRed', 'showGreen');
    this.balance.classList.add('showBlack');
  }
} 
// submit expense form // 
submitExpenseForm(){
  const expenseValue = this.expenseInput.value;
  const amountValue = this.amountInput.value;
  if(expenseValue === '' || amountValue === '' || amountValue < 0){
    this.expenseFeedback.classList.add('showItem');
    this.expenseFeedback.innerHTML = `<p>values cannot be negative</p>`
    const self = this;
    setTimeout(function(){
      self.expenseFeedback.classList.remove('showItem');
    }, 4000);
  }
  else{
    let amount = parseInt(amountValue);
    this.expenseInput.value = '';
    this.amountInput.value = '';

    let expense = {
      id: this.itemID,
      title: expenseValue,
      amount: amount,
    };
    this.itemID++;
    this.itemList.push(expense);
    this.addExpense(expense);
    this.showBalance();
    alert("New Expense added successfully!");
    // show balance 
  }
}
// add expense
addExpense(expense){
  const div = document.createElement("div");
  div.classList.add("expense");
  div.innerHTML = `
  <div class="expense-item d-flex justify-content-between align-items-baseline">

         <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
         <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

         <div class="expense-icons list-item">

          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
           <i class="fas fa-trash"></i>
          </a>
         </div>
        </div>

       </div> 
  `;
  this.expenseList.appendChild(div);
}




//total expense
totalExpense(){
  let total = 0;
    if(this.itemList.length > 0){
      total = this.itemList.reduce(function(acc, curr){
        acc += curr.amount;
        return acc;
      },0);
    }
  this.expenseAmount.textContent = total;
    return total;
  }
  // edit expense 
  editExpense(element){
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    //remove from dom 
    this.expenseList.removeChild(parent);
    // from the list 
    let expense = this.itemList.filter(function(item){
      return item.id === id;
    });
    //show value
    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount;
    //remove from the list 
    let tempList = this.itemList.filter(function(item){
      return item.id !==id;
    });
    this.itemList = tempList;
    this.showBalance();
  }
  // delete expense 
  deleteExpense(element){
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    //remove from dom 
    this.expenseList.removeChild(parent);
    // from the list 
    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount;
    //remove from the list 
    let tempList = this.itemList.filter(function(item){
      return item.id !==id;
    });
    this.itemList = tempList;
    this.showBalance();
  }
}
//end class UI

function eventListeners(){

  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');
  const savingsForm = document.getElementById("savingsForm"); 

  // new instance of UI CLASS 
  const ui = new UI();

  // budget form submit 
  budgetForm.addEventListener('submit', function(event){
    event.preventDefault();
    ui.submitBudgetForm();
    
  });

  // saving form submit 
  savingsForm.addEventListener('submit', function(event){
    event.preventDefault();
    ui.displaySavingsValue();
    
  });

  //expense Form Submit
  expenseForm.addEventListener('submit', function(event){
    event.preventDefault();
    ui.submitExpenseForm();
  });

  // expense Form click listener
  expenseList.addEventListener('click', function(event){
    console.log(event.target);
    if(event.target.parentElement.classList.contains('edit-icon')){
     ui.editExpense(event.target.parentElement);
    }
    else if(event.target.parentElement.classList.contains('delete-icon')){
      ui.deleteExpense(event.target.parentElement)
    }
  });
}

document.addEventListener('DOMContentLoaded', function(){
  eventListeners();
});