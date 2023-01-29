class Category:
  def __init__(self, categoryName):
    self.categoryName = categoryName
    self.ledger = []

  def __str__(self):
    title = self.categoryName.center(30, "*") + "\n"
    items = ""
    for i in self.ledger:
      items += i["description"][:23].ljust(23) + str("{:.2f}".format(i["amount"])).rjust(7) + "\n"
    total = "Total: " + str(self.get_balance())
    return title + items + total

  def get_balance(self):
    balance = 0
    for i in self.ledger:
      balance += i["amount"]
    return balance

  def check_funds(self, amount):
    if self.get_balance() >= amount:
      return True
    return False

  def deposit(self, amount, description=""):
    self.ledger.append({"amount": amount, "description": description})

  def withdraw(self, amount, description=""):
    if self.check_funds(amount):
      self.ledger.append({"amount": -amount, "description": description})
      return True
    return False

  def transfer(self, amount, category):
    if self.check_funds(amount):
      self.withdraw(amount, "Transfer to " + category.categoryName)
      category.deposit(amount, "Transfer from " + self.categoryName)
      return True
    return False

def create_spend_chart(categories):
  totalSpent = 0
  spentByCategory = []
  for i in categories:
    spent = 0
    for j in i.ledger:
      if j["amount"] < 0:
        spent -= j["amount"]
    spentByCategory.append(spent)
    totalSpent += spent

  percentByCategory = []
  for i in spentByCategory:
    percentByCategory.append(i/totalSpent * 100)

  graph = "Percentage spent by category\n"
  for i in percentByCategory:
    graph += str(i) + '  '
  graph += '\n'
  for i in range(100, -10, -10):
    graph += str(i).rjust(3) + "| "
    for j in percentByCategory:
      if j >= i:
        graph += "o  "
      else:
        graph += "   "
    graph += "\n"
  graph += "    " + "-" * (len(categories) * 3 + 1) + "\n"

  names = []
  for i in categories:
    names.append(i.categoryName)

  maxLength = 0
  for i in names:
    if len(i) > maxLength:
      maxLength = len(i)

  for i in range(maxLength):
    graph += "     "
    for j in names:
      if len(j) > i:
        graph += j[i] + "  "
      else:
        graph += "   "
    if i < maxLength - 1:
      graph += "\n"

  return graph
