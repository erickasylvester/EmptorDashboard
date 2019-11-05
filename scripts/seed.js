const csv = require('csv-parser');
const fs = require('fs');
const db = require('../server/db')
const {Country, Population, GDP, Emission, LifeExpectancy, TechExports, Patent} = require('../server/db/models')

const pathToFiles = '/Users/erickabalanzategui/Interviews/EmptorDashboard/scripts'
const populationFile = '/API_SP.POP.TOTL_DS2_en_csv_v2_422125.csv'
const GDPFile = '/API_NY.GDP.MKTP.CD_DS2_en_csv_v2_422026.csv'
const emissionsFile = '/API_EN.ATM.CO2E.PC_DS2_en_csv_v2_422297.csv'
const expectancyFile = '/API_SP.DYN.LE00.IN_DS2_en_csv_v2_422090.csv'
const techExportsFile = '/API_TX.VAL.TECH.MF.ZS_DS2_en_csv_v2_452110.csv'
const patentNonResFile = '/API_IP.PAT.NRES_DS2_en_csv_v2_427489.csv'
const patentResFile = '/API_IP.PAT.RESD_DS2_en_csv_v2_422059.csv'
const INITIAL_DATA_YEAR = 1956;

const countryCache = {}
const countriesOfInterest = ["USA", "MEX", "IND", "NGA", "CHN"];
const POPULATION = "POPULATION"
const GDP_DATA = "GDP_DATA"
const EMISSIONS = "EMISSIONS"
const LIFE_EXPECTANCY = "LIFE_EXPECTANCY"
const TECH_EXPORTS = "TECH_EXPORTS"
const PATENT_NON_RESIDENTS = "PATENT_NON_RESIDENTS"
const PATENT_RESIDENTS = "PATENT_RESIDENTS"

async function loadFile(category, file){
    await fs.createReadStream(pathToFiles + file)
        .pipe(csv({skipLines: 5, headers: false}))
        .on('data', async (row) => {
            if(countriesOfInterest.includes(row[1])){
                if(!countryCache[row[1]]){
                    try{
                        let country = await Country.findOne({where:{name: row[0],
                                                            code: row[1]}})
                        if(!country){
                            country = await Country.create({name: row[0],
                                code: row[1]})
                            console.log("Created country", country.name)

                        }
                        countryCache[row[1]] = country.id;
                    }
                    catch(e){
                        console.log("Error creating country", e)
                    }
                }
                if(category === POPULATION){
                    await loadPopulations(countryCache[row[1]], row);
                }
                else if (category === GDP_DATA){
                    await loadGDP(countryCache[row[1]], row)
                }
                else if(category === EMISSIONS){
                    await loadEmission(countryCache[row[1]], row)
                }
                else if(category === LIFE_EXPECTANCY){
                    await loadLifeExpentancy(countryCache[row[1]], row)
                }
                else if (category === TECH_EXPORTS){
                    await loadTechExport(countryCache[row[1]], row)
                }
                else if (category === PATENT_NON_RESIDENTS){
                    await loadPatents(false, countryCache[row[1]], row)
                }
                else if (category === PATENT_RESIDENTS){
                    await loadPatents(true, countryCache[row[1]], row)
                }
            }
    })
    .on('end', () => {
        console.log('CSV file successfully processed for ', category);
    });
}



async function loadPopulations(countryId, data){
    //loop through all rows that contain population per year
    for(let i = 4; i < 63; i++){
        let year = INITIAL_DATA_YEAR + i;
        try{
            await Population.create({year: year,
                            total: data[i],
                            countryId: countryId})
        }
        catch(e){
            console.log("Error creating population", e)
        }
    }
}

async function loadGDP(countryId, data){
    console.log("Loading GPD", countryId)
    for(let i = 4; i < 63; i++){
        let year = INITIAL_DATA_YEAR + i;
        try{
            await GDP.create({year: year,
                        total: data[i],
                        countryId: countryId})
        }
        catch(e){
            console.log("Error creating GDP", e)
        }
    }
}
async function loadEmission(countryId, data){
    for(let i = 4; i < 63; i++){
        let year = INITIAL_DATA_YEAR + i;
        try{
            await Emission.create({year: year,
                        total: data[i],
                        countryId: countryId})
        }
        catch(e){
            console.log("Error creating emissions", e)
        }
    }
}

async function loadLifeExpentancy(countryId, data){
    for(let i = 4; i < 63; i++){
        let year = INITIAL_DATA_YEAR + i;
        try{
            await LifeExpectancy.create({year: year,
                        total: data[i],
                        countryId: countryId})
        }
        catch(e){
            console.log("Error creating life expectancy", e)
        }
    }
}

async function loadTechExport(countryId, data){
    for(let i = 4; i < 63; i++){
        let year = INITIAL_DATA_YEAR + i;
        try{
            await TechExports.create({year: year,
                        total: data[i],
                        countryId: countryId})
        }
        catch(e){
            console.log("Error creating tech exports", e)
        }
    }
}

async function loadPatents(resident, countryId, data ){
    for(let i = 4; i < 63; i++){
        let year = INITIAL_DATA_YEAR + i;
        try{
            await Patent.create({year: year,
                        total: data[i],
                        resident: resident,
                        countryId: countryId})
        }
        catch(e){
            console.log("Error creating patent", e)
        }
    }
}


async function seed() {
    await db.sync({force: true})
    console.log('db synced!')
    await loadFile(POPULATION, populationFile);
    await loadFile(GDP_DATA, GDPFile);
    await loadFile(EMISSIONS, emissionsFile);
    await loadFile(LIFE_EXPECTANCY, expectancyFile);
    await loadFile(TECH_EXPORTS, techExportsFile);
    await loadFile(PATENT_RESIDENTS, patentResFile);
    await loadFile(PATENT_NON_RESIDENTS, patentNonResFile);

    console.log(`seeded data`)

    console.log(`seeded successfully`)
}
seed()