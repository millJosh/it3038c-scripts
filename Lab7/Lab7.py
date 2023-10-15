#Anytime you want to use something with Numpy make sure you have 'import numpy as np' it helps you run the code and np always to type numpy just shortened
from numpy import random
import numpy as np 

# With Numpy you can store data for this example we use numbers
store1 = np.array([5, 10, 15])
store2 = np.array([20, 25, 30])
print(store1)
print(store2)

# We can also do the same things with strings, and as you can see you can mostly name any of your arrays anything you want
fruits = np.array(['apple', 'banana', 'cherry'])
print (fruits)

# We can also store different store at the same time
store3 = np.array([[3, 6, 9], [12, 15, 18]])
print(store3)

# With the stores we made before lets try to combine them it's almost like the thing above but it's useful when you already got a lot of data in both so this helps out
combine = np.concatenate((store1, store2))
print(combine)

# Now lets try some math, lets add two sets together
add1 = np.array ([1, 2, 3])
add2 = np.array ([4, 5, 6])
result = add1 + add2
print(result)

# Lets try seeing if we can find the mean and standard deviation of a set of numbers next
data = np.array([10, 20, 30, 40, 50])
mean = np.mean(data)
std_dev = np.std(data)
print(mean)
print(std_dev)

# There are also modifers we can use as well like sorting values randomly
rm = np.array([1, 2 ,3, 4, 5])
random.shuffle(rm)
print(rm)

# Another thing we can do is round
rud = np.around(3.1666, 2)
print(rud)

# Down here I would like for you to do some things on your own try to experiement like doing a random set with strings instead, just have fun! And I hope you enjoyed

