def add_time(start, duration, day = None):
  daysOfTheWeek = {'byName': {'monday': 0, 'tuesday': 1, 'wednesday': 2, 'thursday': 3, 'friday': 4, 'saturday': 5, 'sunday': 6}, 'byNumber': {0: 'Monday', 1: 'Tuesday', 2: 'Wednesday', 3: 'Thursday', 4: 'Friday', 5: 'Saturday', 6: 'Sunday'}}

  start_minutes = int(start.split(':')[0]) * 60 + int(start.split(':')[1].split()[0])
  start_minutes += 720 if start.split()[1] == 'PM' else 0
  duration_minutes = int(duration.split(':')[0]) * 60 + int(duration.split(':')[1])

  end_minutes = start_minutes + duration_minutes

  days_later = end_minutes // 1440

  result_hours = ('12' if end_minutes % 720 // 60 == 0 else str(end_minutes % 720 // 60))
  result_minutes = str(end_minutes % 60).zfill(2)
  result_period = 'AM' if end_minutes % 1440 < 720 else 'PM'
  if day:
    result_day = ', ' + daysOfTheWeek['byNumber'][(daysOfTheWeek['byName'][day.lower()] + days_later) % 7 ]
  else:
    result_day = ''
  days_later = ' (next day)' if days_later == 1 else ' (' + str(days_later) + ' days later)' if days_later > 1 else ''

  return result_hours + ':' + result_minutes + ' ' + result_period + result_day + days_later