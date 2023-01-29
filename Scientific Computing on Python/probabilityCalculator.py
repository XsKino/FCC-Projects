import copy
import random

class Hat:

  def __init__(self, **balls):
    self.balls = balls
    self.contents = []
    for key, value in balls.items():
      for i in range(value):
        self.contents.append(key)

  def draw(self, num):
    if num >= len(self.contents):
      return self.contents
    else:
      balls_drawn = []
      for i in range(num):
        ball = random.choice(self.contents)
        balls_drawn.append(ball)
        self.contents.remove(ball)
      return balls_drawn

def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
  M = 0
  N = num_experiments
  for i in range(N):
    hat_copy = copy.deepcopy(hat)
    balls_drawn = hat_copy.draw(num_balls_drawn)
    for key, value in expected_balls.items():
      if balls_drawn.count(key) < value:
        M += 1
        break
  return (N - M) / N