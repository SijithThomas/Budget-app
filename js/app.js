    // variables
    const budgetFeedback = document.querySelector(".budget-feedback");
    const expenseFeedback = document.querySelector(".expense-feedback");
    const budgetForm = document.getElementById("budget-form");
    const budgetInput = document.getElementById("budget-input");
    const ntbudgetAmount = document.getElementById("budget-amount");
    const expenseAmount = document.getElementById("expense-amount");
    const balance = document.getElementById("balance");
    const balanceAmount = document.getElementById("balance-amount");
    const expenseForm = document.getElementById("expense-form");
    const expenseInput = document.getElementById("expense-input");
    const amountInput = document.getElementById("amount-input");
    const expenseDiv = document.getElementById("expense-list");
    let expenseList = [];
    const itemID = 0;

    class UI{
      getData(){
        const budgetSubmit=document.getElementById('budget-submit');
        budgetSubmit.addEventListener('click',(event)=>{
          event.preventDefault();
          let netbudget=budgetInput.value;
          this.processBudget(netbudget);
        });
        const expenseSubmit=document.getElementById('expense-submit');
        expenseSubmit.addEventListener('click',(event)=>{
          event.preventDefault();
          let expenseDetails={
            title:expenseInput.value,
            amount:amountInput.value
          };
          expenseList =[...expenseList,expenseDetails];
          this.displayExpenseDtails(expenseDetails);
          Storage.saveExpense(expenseList);
        })
      }
      processBudget(netbudget){
        //displaying budget
        ntbudgetAmount .innerText=netbudget;
        // display balance
        this.displayBalance(netbudget);
        // storing net budget 
        Storage.storeBudget(netbudget);
      }
      displayBalance(balance){
        balanceAmount.innerText=balance;
      }
      displayExpenseDtails(expenseDetails){
        let result='';
          const div=document.createElement('div');
          div.classList.add('expense');
          result=`<div class="expense-item d-flex justify-content-between align-items-baseline">

            <h6 class="expense-title mb-0 text-uppercase list-item">${expenseDetails.title}</h6>
            <h5 class="expense-amount mb-0 list-item">${expenseDetails.amount}</h5>

            <div class="expense-icons list-item">

            <a href="#" class="edit-icon mx-2">
              <i class="fas fa-edit"></i>
            </a>
            <a href="#" class="delete-icon">
              <i class="fas fa-trash"></i>
            </a>
            </div>
          </div>`;
          div.innerHTML=result;
          expenseDiv.appendChild(div);
      }
      setupApp(){
        let netBudget =Storage.getBudget();
        expenseList=Storage.getExpense();
        this.processBudget(netBudget);  
        this.populateList(expenseList);
      }
      populateList(expenseList){
        expenseList.forEach(expenseDetails=>this.displayExpenseDtails(expenseDetails));
      }
    }
    class Storage{
      static storeBudget(netBudget){
        localStorage.setItem('budget',JSON.stringify(netBudget));
      }
      static getBudget(){
        return JSON.parse(localStorage.getItem('budget'));
      }
      static saveExpense(expenseList){
        localStorage.setItem('expense' , JSON.stringify(expenseList));
      }
      static getExpense(){
      return localStorage.getItem('expense')?JSON.parse(localStorage.getItem('expense')):[];
      }
    }
 document.addEventListener('DOMContentLoaded',()=>{
   const ui = new UI();
   ui.setupApp();
   ui.getData();
 });