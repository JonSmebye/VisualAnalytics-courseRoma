dataFile = open('../data/pca.csv','r')
fileOut = open('../data/fullDataSet.csv','w')
with open('../data/data2015.csv') as countryFile:
    for countryData,data in zip(countryFile, dataFile):
        country = countryData.split(',')[0]
        countryData = countryData.strip('\n')
        pcaData = data
        fileOut.write(countryData+','+pcaData)