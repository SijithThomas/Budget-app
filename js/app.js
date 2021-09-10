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
    const expenseContent=document.querySelector('.expense-content');
    
    let expenseList = [];
    let itemID = 0;

    class UI{
      getData(){
        const budgetSubmit=document.getElementById('budget-submit');
        budgetSubmit.addEventListener('click',(event)=>{
          event.preventDefault();
          let netbudget=budgetInput.value;
          this.processBudget(netbudget);
          this.calculation();
        });
        budgetInput.value='';
        const expenseSubmit=document.getElementById('expense-submit');
        expenseSubmit.addEventListener('click',(event)=>{
          event.preventDefault();
          itemID=Math.floor(Math.random() * 100);
          let expenseDetails={
            id:itemID,
            title:expenseInput.value,
            amount:amountInput.value
          };
          expenseInput.value='';
          amountInput.value='';
          expenseList =[...expenseList,expenseDetails];
          this.displayExpenseDtails(expenseDetails);
          Storage.saveExpense(expenseList);
          this.calculation();
          
        })
      }
      processBudget(netbudget){
        //displaying budget
        ntbudgetAmount .innerText=netbudget;
        // display balance
        // this.displayBalance(netbudget);
        // storing net budget 
        Storage.storeBudget(netbudget);
      }
      displayBalance(totalExpense){
        let netBudget=Storage.getBudget();
        let balance=netBudget-totalExpense;
        expenseAmount.innerText=totalExpense;
        balanceAmount.innerText=balance;

      }
      displayExpenseDtails(expenseDetails){
        let result='';
          const div=document.createElement('div');
          div.classList.add('expense-item');
          result=`<h6 class="expense-title mb-0 text-uppercase list-item">${expenseDetails.title}</h6>
            <h5 class="expense-amount mb-0 list-item">${expenseDetails.amount}</h5>

            <div class="expense-icons list-item">

            <p class="delete-icon" data-id=${expenseDetails.id}>Remove</p>
            </div>`;
          div.innerHTML=result;
          expenseContent.appendChild(div);
      }
      setupApp(){
        let netBudget =Storage.getBudget();
        expenseList=Storage.getExpense();
        this.processBudget(netBudget);  
        this.populateList(expenseList);
        this.calculation();
        this.listModification();
      }
      populateList(expenseList){
        expenseList.forEach(expenseDetails=>this.displayExpenseDtails(expenseDetails));
      }
      calculation(){
        let totalExpense=0;
        expenseList.map(item=>{
          let amount=parseInt(item.amount);
          totalExpense+=amount;
       })
       this.displayBalance(totalExpense);
      }
      listModification(){
       if(expenseList.length!=0){
         // clear list
        const clearList=document.querySelector('.clear-list'); 
        clearList.addEventListener('click',()=>{this.resetList()});

        //Delete option
        expenseContent.addEventListener('click',(event)=>{
          if(event.target.classList.contains('delete-icon')){
          let currenItem=event.target;
          let id=currenItem.dataset.id;
          expenseContent.removeChild(currenItem.parentElement.parentElement);
          this.removeItem(id);
          }
        });
       }
      }
      resetList(){
        let itemId=expenseList.map(item=>item.id);
        itemId.forEach(id=>this.removeItem(id));
        while(expenseContent.children.length >0){
          expenseContent.removeChild(expenseContent.children[0]);
        }
      }
      removeItem(id){
      expenseList=expenseList.filter(item=>item.id != id);
      this.calculation();
      Storage.saveExpense(expenseList);
        
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