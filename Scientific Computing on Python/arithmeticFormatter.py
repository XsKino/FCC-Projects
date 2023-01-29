def arithmetic_arranger(problems, showResult = False):
    if len(problems) > 5:
        return "Error: Too many problems."
    if len(problems) < 1:
        return "Error: No problems to solve."

    dict = {'x': [], 'y': [], 'operator': [], 'maxLen': [], 'result': []}

    if len(problems) > 5:
        return "Error: Too many problems."

    for problem in problems:
        try:
            x, operator, y = problem.split()
        except:
            return "Error: Invalid problem format."

        if operator not in ['+', '-']:
            return "Error: Operator must be '+' or '-'."

        if not x.isdigit() or not y.isdigit():
            return "Error: Numbers must only contain digits."

        if len(x) > 4 or len(y) > 4:
            return "Error: Numbers cannot be more than four digits."

        dict['x'].append(x)
        dict['y'].append(y)
        dict['operator'].append(operator)
        dict['maxLen'].append(max(len(x), len(y)) +2)
        dict['result'].append(str(eval(problem )))

    firstRow = ''
    secondRow = '\n'
    thirdRow = '\n'
    fourthRow = '\n'

    for i in range(len(problems)):
        firstRow += f'{dict["x"][i]:>{dict["maxLen"][i]}}    '
        secondRow += f'{dict["operator"][i]} {dict["y"][i]:>{dict["maxLen"][i]-2}}    '
        thirdRow += f'{"-" * dict["maxLen"][i]}    '
        if showResult:
            fourthRow += f'{dict["result"][i]:>{dict["maxLen"][i]}}    '

    arranged_problems = firstRow.rstrip() + secondRow.rstrip() + thirdRow.rstrip()
    if showResult:
        arranged_problems += fourthRow.rstrip()
    return arranged_problems