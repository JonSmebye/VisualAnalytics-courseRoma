dataFile = open('../pca.csv','r')
fileOut = open('../data/test.csv','a')
with open('../bigMacIndexHumanDevIndex.csv') as countryFile:
    for countryData,data in zip(countryFile, dataFile):
        country = countryData.split(',')[0]
        pcaData = data
        fileOut.write(country+', '+pcaData)