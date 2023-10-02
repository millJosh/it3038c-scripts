import random

random_number = random.randint(1, 30)

print("Guess The Number Game!")
print("Guess a number between 1 and 30. Try your best to guess it.")

attempts = 0

while True:
	user_guess = int(input("Enter a guess: "))
	attempts += 1

	if user_guess < random_number:
		print("Too Low, Try again")
	elif user_guess > random_number:
		print("Too High, Try again")
	else:
		print("Good Job, You guessed the number {} in {} attempts.".format(random_number, attempts))
		break
