from collections import OrderedDict

direction_map = [
    [0, 1],
    [-1, 0],
    [0, -1],
    [1, 0]
]

point_arr = OrderedDict()
point_arr[(0, 0)] = 1

def get_value(point):
    x, y = point
    sum = 0
    for i in range(-1, 2):
        for j in range(-1, 2):
            if not(i == 0 and j == 0) and point_arr.get((x + i, y + j)):
                sum += point_arr[(x + i, y + j)]
    return sum

def walk(dir=direction_map[3], count=0):
    len_arr = len(point_arr)
    last_point = point_arr.items()[len_arr - 1][0]
    last_x, last_y = last_point
    dir_x, dir_y = dir

    point = (last_x + dir_x, last_y + dir_y)
    point_value = get_value(point)
    point_arr[point] = point_value
    count += 1

    x, y = point
    is_edge = abs(x) == abs(y)

    # at edge
    if is_edge:
        if x > 0 and y < 0:
            # right bottom ->
            dir = direction_map[3]
        elif x > 0 and y > 0:
            dir = direction_map[1]
        elif x < 0 and y > 0:
            dir = direction_map[2]
        elif x < 0 and y < 0:
            dir = direction_map[3]
        else:
            dir = direction_map[0]
    # not edge
    else:
        # normal
        if len_arr == 1:
            dir = direction_map[0]
        # lase point is right bottom
        elif last_point[0] > 0 and last_point[0] == -last_point[1]:
            dir = direction_map[0]
      
    
    if point_value > 289326:
        return (point, point_value)
    else:
        print (point, point_value)
        return walk(dir, count)

if __name__ == '__main__':
    print(walk())