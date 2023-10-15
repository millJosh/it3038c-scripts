from numpy import random
import numpy as np 

store1 = np.array([5, 10, 15])
store2 = np.array([20, 25, 30])
print(store1)
print(store2)

fruits = np.array(['apple', 'banana', 'cherry'])
print (fruits)

store3 = np.array([[3, 6, 9], [12, 15, 18]])
print(store3)

combine = np.concatenate((store1, store2))
print(combine)

add1 = np.array ([1, 2, 3])
add2 = np.array ([4, 5, 6])
result = add1 + add2
print(result)

data = np.array([10, 20, 30, 40, 50])
print(data) 

mean = np.mean(data)
std_dev = np.std(data)
print(mean)
print(std_dev)

rm = np.array([1, 2 ,3, 4, 5])
random.shuffle(rm)
print(rm)

rud = np.around(3.1666, 2)
print(rud)

