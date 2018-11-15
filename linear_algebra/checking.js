'use strict'
function CheckingAccount (amount) {
  this.balance = amount // property
  this.deposit = deposit // method
  this.withdraw = withdraw // method
  this.toString = toString // method
}
function deposit (amount) {
  this.balance += amount
}
function withdraw (amount) {
  if (amount <= this.balance) {
    this.balance -= amount
  }
  if (amount >= this.balance) {
    console.log('insufficient funds')
  }
}
function toString () {
  return 'Balance: ' + this.balance
}
function makeAccount () {
  var account = new CheckingAccount(1000)
  account.deposit(16500)
  console.log(account)
}
makeAccount()
