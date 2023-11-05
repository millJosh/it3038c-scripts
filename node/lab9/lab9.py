import requests

api_url = "http://localhost:3000"

response = requests.get(api_url)

if response.status_code == 200:
    widget = response.json()
    if widget:
        for index, widget in enumerate(widget, start=1):
            widget_name = widget.get("name", "Unknown")
            widget_color = widget.get("color", "Unknown")
            print("Widget{} is {}.".format(index, widget_color))
    else:
        print("No widget data found.")
else:
    print("Failed to retrieve data from the API. Status code: {}".format(response.status_code))

