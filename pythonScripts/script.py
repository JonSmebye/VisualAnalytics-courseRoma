import json

file1 = open("bigMac2020.csv", "r")
file2 = open("data.csv","r")
fileWrite = open("out.csv","a")

prices = dict()

for line in file1:
    land, dollar = line.split(",")
    dollar = dollar.strip("\n")
    prices[land] = []
    prices[land].append(dollar)

for line in file2:
    name, hdi, pop2019 = line.split(",")
    try:
        prices[name].append(hdi)
    except:
        continue
keys = prices.keys()
for key in prices:
    streng = ""
    streng += key
    streng += ","
    streng += prices[key][0]
    streng += ","
    streng += prices[key][1]
    streng += "\n"
    print(streng)
    fileWrite.write(streng)
