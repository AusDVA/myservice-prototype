from requests import get
import os 

files = []
error_pages = {}

def showDirectory(rootDir): 
    for lists in os.listdir(rootDir): 
        path = os.path.join(rootDir, lists)
        files.append(path.replace("\\", "/"))
        if os.path.isdir(path): 
            showDirectory(path)
showDirectory("views")

for i in files:
	i = i.replace("views/", "")
	if os.path.isfile("views/" + i):
		if int(get("http://localhost:5000/" + i).status_code) != 200:
			error_pages[i] = get("http://localhost:5000/" + i).status_code

for k, v in error_pages.items():
	print(v, ":", "http://localhost:5000/" + k)

